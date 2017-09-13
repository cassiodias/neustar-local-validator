#!/usr/bin/env bash

INSTALLATION_DIR=$HOME"/neustar-local-validator"

function install(){
    wget http://static.wpm.neustar.biz/tools/local-validator.zip
    unzip local-validator.zip
    latest_name="$(ls -d local-validator-*)"
    ln -s ${PWD}/${latest_name}/bin/validator /usr/local/bin/validator
    rm -rf local-validator.zip
    echo "============================================="
    echo " > Installed Neustar "${latest_name}
    echo "============================================="
}

if [ ! -d "$INSTALLATION_DIR" ]; then
    echo "======================================"
    echo " > Installing neustar-local-validator"
    echo "======================================"
    mkdir ${INSTALLATION_DIR} && cd "$_"
    install
else
    echo "======================================"
    echo " > Upgrading neustar-local-validator"
    echo "======================================"
    cd ${INSTALLATION_DIR}
    latest_name="$(ls -d local-validator-*)"
    rm -rf ${latest_name}
    rm -rf /usr/local/bin/validator
    install
fi