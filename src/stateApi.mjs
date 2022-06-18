// -*- coding: utf-8, tab-width: 2 -*-

function assignToSelf(...upd) { return Object.assign(this, ...upd); }


const EX = {

  update: assignToSelf,
  nextArg() { return this.todo.shift(); },

  mustFindUser(name) {
    const found = this.accByName.get(name);
    if (found) { return found; }
    throw new Error('Found no user named ' + name);
  },

};


export default EX;
