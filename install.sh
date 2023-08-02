#!/bin/bash

# remember to have a valid npm_token file in your project root directory

replace_token() {
  sed -i "s/\${NPM_TOKEN}/$(cat ../../npm_token)/" .npmrc && npm ci && sed -i "s/$(cat ../../npm_token)/\${NPM_TOKEN}/" .npmrc 
}
cd src/calc-odds-api
replace_token

cd ../ui
replace_token

cd ../web-api
replace_token

cd ../core
npm ci