
<!--#echo json="package.json" key="name" underline="=" -->
multimc-cfgmgr-accounts-220617-pmb
==================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
A temporary stopgap for MultiMC account config until they implement
Offline/LAN accounts (issue 4784).
<!--/#echo -->



Usage
-----

Don't. Instead, upvote
[the actual solution](https://github.com/MultiMC/Launcher/issues/4784).

…

Really. Please take a minute to vote thumbs up on it.

…

You did? Ok then.

1.  Configure your MSA account in MultiMC and make sure it works
    in single player for the instance you want to play.
    This example assumes your MSA username is `Notch`.
1.  Quit MultiMC.
1.  Wait a few seconds until MultiMC has properly shut down and saved
    its `accounts.json`.
1.  Backup your `accounts.json`.
    This example assumes your backup copy is `accounts.knownGood.json`.
1.  `./bin/cli.sh accounts.knownGood.json user Notch saveSkin notch.png`
1.  Think of a cool username for playing on a LAN.
    This example uses `Alan`.
    (Because that's "a LAN" username. Yeah I'm so very creative.)
1.  Make a skin for Alan in the same format that `notch.png` is
    (probably 64×64 pixels non-interlaced 8-bit RGBA PNG)
    and save it as `alan.png`.
    * You can also find some example skins in Minecraft's `client.jar`,
      sub path `assets/minecraft/textures/entity/`,
      like `alex.png` and `steve.png`.
1.  `./bin/cli.sh accounts.knownGood.json
    stubUser Alan
    loadSkin alan.png
    activate
    exportConfig accounts.json`
1.  Start MultiMC. The user selection menu should show "Alan".


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
