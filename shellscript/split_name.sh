#!/bin/bash

Files=$(ls)

for file in ${Files[@]}; do
    echo ${file::-4}
    mv $file ${file::-4}
done
    # mv total_populacao_$file.xls $file.xls
