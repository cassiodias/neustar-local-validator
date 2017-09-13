#!/usr/bin/env bash

mkdir $HOME/neustar-local-validator && cd "$_"

wget http://static.wpm.neustar.biz/tools/local-validator.zip
unzip local-validator.zip

latest_name="$(ls -d local-validator-*)"
ln -s ${PWD}/${latest_name}/bin/validator /usr/local/bin/validator
rm -rf local-validator.zip

validator -?