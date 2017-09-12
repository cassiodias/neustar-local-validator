#!/usr/bin/env bash

wget http://static.wpm.neustar.biz/tools/local-validator.zip
unzip local-validator.zip
latest_name="$(ls -d local-validator-*)"
ln -s ${PWD}/${latest_name}/bin/validator /usr/local/bin/validator
rm -rf ./local-validator.zip
validator -?