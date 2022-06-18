// -*- coding: utf-8, tab-width: 2 -*-

import nodeCrypto from 'crypto';

function hash(x) {
  return nodeCrypto.createHash('sha1').update(x).digest('hex');
}


function uuid(x) {
  const h = hash(x);
  function r(m, i) { return m && h.substr(i, 1); }
  return uuid.pattern.replace(/x/g, r);
}
uuid.pattern = 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'; /*
  UUID version 5 is purpose-made for generating deterministic UUIDs,
  but Minecraft uses version 4 (random-based). However, we can easily
  disguise our deterministic hash as random data.
  For the digit that contains the variant, version 4 allows any of
  [89ab]. For simplicity, we just use a fixed digit.
*/


const EX = function makeStubAccount(name) {
  const skin = {
    id: uuid('skin:' + name),
    variant: 'SLIM',
    data: 'iVBORw0K',
  };
  skin.url = 'http://example.net/' + skin.id + '.png';
  const acc = {
    type: 'MSA',
    profile: {
      name,
      id: hash('profile:' + name).slice(0, 32),
      cape: null,
      capes: [],
      skin,
    },
    msa: { exp: 2e9, refresh_token: 'M.$$', token: 'Ew==' },
  };
  return acc;
};


export default EX;
