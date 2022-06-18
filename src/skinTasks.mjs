// -*- coding: utf-8, tab-width: 2 -*-

import noFs from 'nofs';

const pngMagicBytesBase64 = 'iVBORw0K';

function verifyBase64Png(x) {
  if (x.startsWith(pngMagicBytesBase64)) { return x; }
  const errMsg = ('The first 6 bytes of a PNG image,'
    + ' when viewed in base64 encoding, must be ' + pngMagicBytesBase64);
  throw new Error(errMsg);
}


async function loadSkin(state) {
  const pngFileName = state.nextArg();
  const pngBuf = await noFs.readFile(pngFileName);
  const pngBase64 = verifyBase64Png(pngBuf.toString('base64'));
  const { skin } = state.acc.profile;
  skin.data = pngBase64;

  // skin.url = 'data:image/png;base64,' + pngBase64;
  // ^-- Doesn't make it work ingame either.

  return pngBuf.length;
}



async function saveSkin(state) {
  const pngFileName = state.nextArg();
  const pngBase64 = verifyBase64Png(state.acc.profile.skin.data);
  const pngBuf = Buffer.from(pngBase64, 'base64');
  await noFs.writeFile(pngFileName, pngBuf);
  return pngBuf.length;
}



const EX = {
  loadSkin,
  saveSkin,
};


export default EX;
