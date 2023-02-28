
Example Skins
=============

License: CC-0 (i.e., do what you want.)


ImageMagick cheat sheet
-----------------------

* Some buggy image editors might choke on meta data in the textures from
  `client.jar`.
  Conversion to Portable Pixmap format will remove that meta data and
  keep just the pixels:
  `convert skin.png -background fuchsia -flatten ppm:skin.flat.ppm`
* To it back to 32-bit RGBA:
  `convert skin.flat.ppm -transparent fuchsia png32:skin.png`
* Note to self: On machines that have `multimedia-util-pmb`,
  just use `pngalpha2ppm`.


