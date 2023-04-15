/* -*- tab-width: 2 -*- */
'use strict';

require('p-fatal');

const browserify = require('browserify');
const brCfg = {
  node: true,
  sourceType: 'module',
  'extensions': [
    '.mjs',
    '.jsm',
    '.js',
  ],
  'debug': true,
  'plugins': [
    'esmify',
  ],
  'transform': [
    [require.resolve('babelify'),
      { 'presets': [require.resolve('@babel/preset-env')] }],
    [require.resolve('envify'), { '_': 'purge' }],
    [require.resolve('brfs')],
  ],
  'entries': [require.resolve('../src/cli.mjs')],
};

browserify(brCfg).bundle(function cb(err, buf) {
  if (!err) { return console.info('Success:', buf); }
  const msg = String(err);
  const abbreviate = (
    msg.startsWith('SyntaxError: Unexpected token (')
    || msg.startsWith("Error: Can't walk dependency graph: ")
  );
  console.error(abbreviate ? msg : err);
  process.exit(5);
});
