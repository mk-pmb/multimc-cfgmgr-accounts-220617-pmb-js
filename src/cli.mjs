// -*- coding: utf-8, tab-width: 2 -*-

import 'exit-code';
import 'p-fatal';
import 'usnam-pmb';

import readDataFile from 'read-data-file';

import knownTasks from './knownTasks.mjs';
import stateApi from './stateApi.mjs';


async function nextTodo(state) {
  const task = state.nextArg();
  if (task === undefined) { return; }
  try {
    const taskImpl = knownTasks[task];
    let res = await taskImpl(state);
    res = (res ? JSON.stringify(res, null, 2) : String(res));
    res = res.replace(/\n\s*/g, ' ');
    console.info('+OK', task, res);
    return nextTodo(state);
  } catch (err) {
    console.error('-ERR', task, err);
    process.exitCode = 2;
  }
};


function paseAccountsConfig(data) {
  const { accounts, ...junk } = data;
  if (!Array.isArray(accounts)) {
    throw new Error('Original config seems to not include an accounts list.');
  }
  const accByName = new Map();
  const report = {
    accByName,
    activeUser: null,
    junk,
  };
  accounts.forEach(function found(acc) {
    const { name } = acc.profile;
    if (accByName.has(name)) {
      throw new Error('Duplicate account name: ' + name);
    }
    if (acc.active) { report.activeUser = name; }
    delete acc.active;
    delete acc.profile.name;
    accByName.set(name, acc);
  });
  return report;
}


async function inputFileMagic(s) {
  if (!s) { throw new Error('No source file spec given!'); }
  if (s.startsWith('file:')) { return readDataFile(s.slice(5)); }
  if (s.startsWith('json:')) { return JSON.parse(s.slice(5)); }
  if (s === 'empty:') { return { formatVersion: 3, accounts: [] }; }
  return readDataFile(s);
}


async function cliMain() {
  const [srcFile, ...todo] = process.argv.slice(2);
  const state = {
    srcFile,
    todo,
    ...paseAccountsConfig(await inputFileMagic(srcFile)),
    ...stateApi,
  };
  await nextTodo(state);
}


cliMain();
