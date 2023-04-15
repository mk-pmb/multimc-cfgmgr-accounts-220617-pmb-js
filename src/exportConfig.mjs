// -*- coding: utf-8, tab-width: 2 -*-

import promisedFs from 'fs/promises';
import sortedJson from 'safe-sortedjson';


function mapAccs(state, iter) {
  return Array.from(state.accByName.entries()).map(([k, v]) => iter(v, k));
}


const EX = async function exportConfig(state) {
  const destFileName = state.nextArg();
  const { curUser } = state;
  const accounts = mapAccs(state, function reintegrate(accDetails, accName) {
    const acc = {
      ...accDetails,
      active: (accName === curUser),
      profile: {
        ...accDetails.profile,
        name: accName,
      },
    };
    return acc;
  });
  const cfgData = { ...state.junk, accounts };
  const cfgText = sortedJson(cfgData) + '\n';
  await promisedFs.writeFile(destFileName, cfgText, { encoding: 'UTF-8' });
  return cfgText.length;
};


export default EX;
