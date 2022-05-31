#!/bin/bash

re="s/[^0-9]//g"
user="pedroperegrinaa"

views=$(curl -s https://komarev.com/ghpvc/\?username\=$user\&style\=for-the-badge\&color\=32325D | grep "<title>" | sed $re)

echo $views

views_old=$(awk 'END{print}' views.txt | sed $re)

echo "antigo: ${views_old}"
echo "novo: ${views}"

if [ $views -gt $views_old ];
    then

    echo "atualizando..."
    echo "$views" >> views.txt
    echo "atualizado!";

    else
    echo "tudo atualizado!";
fi

