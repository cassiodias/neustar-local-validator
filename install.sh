#!/usr/bin/env bash

unzip ./local-validator-4.34.17.zip
ln -s ${PWD}/local-validator-4.34.17/bin/validator /usr/local/bin/validator

validator -?