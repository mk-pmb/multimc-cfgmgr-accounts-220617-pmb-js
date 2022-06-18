// -*- coding: utf-8, tab-width: 2 -*-

function jsonDeepCopy(x) { return JSON.parse(JSON.stringify(x) || 'null'); }


const EX = function copyUser(state, refine) {
  const name = state.nextArg();
  let acc = jsonDeepCopy(state.acc);
  if (!acc) { throw new Error('No data'); }
  if (refine) { acc = refine(acc, name); }
  state.update({ acc, curUser: name });
  state.accByName.set(name, acc);
  return name;
};


export default EX;
