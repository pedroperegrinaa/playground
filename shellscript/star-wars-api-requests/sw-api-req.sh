#!/bin/bash

CONTADOR=0

for i in {1..100}; do
    echo "Welcome $i"

    curl https://www.swapi.tech/api/starships/$i | jq

done


# curl https://www.swapi.tech/api/starships/9 | jq


