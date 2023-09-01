#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-
MC_USER="${1:-Monika}"
nodemjs cli.mjs empty: \
  stubUser "$MC_USER" \
  loadSkin ex://cc0/noseguy.rgba \
  activate \
  exportConfig just_"${MC_USER,,}".json
