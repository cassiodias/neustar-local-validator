#!/usr/bin/env bash

NEUSTAR_VALIDATOR_HOME="${HOME}/neustar-local-validator"
LINE=$(printf '=%.0s' {1..80});
[[ -d "${NEUSTAR_VALIDATOR_HOME}" ]] && OP_PREFIX="Upgrad" || OP_PREFIX="Install"

echo -e "${LINE}\n > ${OP_PREFIX}ing neustar-local-validator\n${LINE}"

mkdir -p "${NEUSTAR_VALIDATOR_HOME}" && cd "${NEUSTAR_VALIDATOR_HOME}"
curl -L http://static.wpm.neustar.biz/tools/local-validator.tar.gz | tar -xzf -
latest_name="$(ls -dtr local-validator-* | tail -1)"
ln -Fs "${latest_name}" current

echo -e "${LINE}\n > ${OP_PREFIX}ed neustar-local-validator ${latest_name}\n${LINE}"
