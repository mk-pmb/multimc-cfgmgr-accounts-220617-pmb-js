#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-
REPODIR="$(readlink -m -- "$BASH_SOURCE"/../..)"
exec nodemjs "$REPODIR/src/cli.mjs" "$@"; exit $?
