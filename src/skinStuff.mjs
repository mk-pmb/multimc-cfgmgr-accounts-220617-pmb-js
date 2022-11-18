// -*- coding: utf-8, tab-width: 2 -*-

import noFs from 'nofs';
import absdir from 'absdir';

const pathInRepo = absdir(import.meta, '..');

const pngMagicBytesBase64 = 'iVBORw0K'; // === btoa('\x89' + 'PNG' + '\r\n')


function verifyBase64Png(x) {
  if (x.startsWith(pngMagicBytesBase64)) { return x; }
  const errMsg = ('The first 6 bytes of a PNG image,'
    + ' when viewed in base64 encoding, must be ' + pngMagicBytesBase64);
  throw new Error(errMsg);
}


function translateMagicFilePath(x) {
  const s = String(x || '');
  if (!s) { return x; }
  const [p, r] = s.split(/^(\w+):\/{2}/).slice(1);
  if (!p) { return x; }
  if (p === 'file') { return r; }
  if (p === 'ex') { return pathInRepo('img/example_skins.' + r + '.png'); }
  return x;
}


async function readAndEncode(path) {
  const pngFileName = translateMagicFilePath(path);
  const pngBuf = await noFs.readFile(pngFileName);
  const base64 = verifyBase64Png(pngBuf.toString('base64'));
  return { base64, bufLen: pngBuf.length };
}


async function loadSkin(state) {
  const png = await readAndEncode(state.nextArg());
  const { skin } = state.acc.profile;
  skin.data = png.base64;

  // skin.url = 'data:image/png;base64,' + png.base64;
  // ^-- Doesn't make it work ingame either.

  return png.bufLen;
}


async function saveSkin(state) {
  const pngFileName = state.nextArg();
  const pngBase64 = verifyBase64Png(state.acc.profile.skin.data);
  const pngBuf = Buffer.from(pngBase64, 'base64');
  await noFs.writeFile(pngFileName, pngBuf);
  return pngBuf.length;
}



const EX = {
  pngMagicBytesBase64,
  readAndEncode,
  tasks: {
    loadSkin,
    saveSkin,
  },
};


export default EX;
