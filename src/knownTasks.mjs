// -*- coding: utf-8, tab-width: 2 -*-

import copyUser from './copyUser.mjs';
import exportConfig from './exportConfig.mjs';
import makeStubAccount from './makeStubAccount.mjs';
import skinStuff from './skinStuff.mjs';


const knownTasks = {

  dumpState(state) { console.debug(state); },
  names(state) { return Array.from(state.accByName.keys()); },

  user(state) {
    const name = state.nextArg();
    const acc = state.mustFindUser(name);
    state.update({ acc, curUser: name });
    return acc && name;
  },

  activate(state) {
    const activeUser = (state.curUser || null);
    state.update({ activeUser });
    return activeUser;
  },

  copy(state) { return copyUser(state); },

  stubUser(state) {
    const name = state.nextArg();
    const acc = makeStubAccount(name);
    state.accByName.set(name, acc);
    state.update({ acc, curUser: name });
    return acc.profile.id;
  },

  ...skinStuff.tasks,

  exportConfig,

};


export default knownTasks;
