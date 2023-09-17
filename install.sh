#!/bin/bash

token=$(cat npm_token)

n=${#token}

if ! command -v bun &> /dev/null
then
    echo "bun could not be found"
    exit 1
fi

echo "reading github token..."
if [ "$n" -eq "0" ]; then
  echo "Failed to read github token.Create a file named npm_token and paste inside the give github token";
  exit 1;
fi

replace_token() {
  sed -i "s/{NPM_TOKEN}/$token/" bunfig.toml && bun install && sed -i "s/$token/{NPM_TOKEN}/" bunfig.toml
}

copy_bunfig(){
  cp bunfig.toml src/ui/
  cp bunfig.toml src/calc-odds-api
  cp bunfig.toml src/web-api
}

copy_bunfig

cd src/calc-odds-api
replace_token

cd ../ui
replace_token

cd ../web-api
replace_token

cd ../core
bun install
