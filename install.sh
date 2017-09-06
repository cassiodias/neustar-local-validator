#!/usr/bin/env bash

unzip ./local-validator-4.34.17.zip
cd /usr/local/bin/
ln -s ./local-validator-4.34.17/bin/validator validator

echo "DONE"

validator -?