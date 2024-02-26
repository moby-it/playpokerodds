#!/bin/bash
URL=${1:-http://localhost:7071}/api/calcOdds

# wrk $URL -t6 -c12 -d60 -s ./calc.lua
wrk $URL -t4 -c4 -d30 -s ./calc.lua
