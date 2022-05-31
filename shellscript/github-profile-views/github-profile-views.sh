#!/bin/bash

re="s/[^0-9]//g"
user="pedroperegrinaa"

views=$(curl -s https://komarev.com/ghpvc/\?username\=$user\&style\=for-the-badge\&color\=32325D | grep "<title>" | sed $re)

echo "`date +%d/%m/%Y" - "%H:%M:%S` | $views views"
teste="`date +%d/%m/%Y" - "%H:%M:%S` | $views views"

# echo $(echo teste $teste | egrep '[|][  ][0,9]{2,5}')
echo "Endereço 10.1.1.1 obtido"  | egrep --color '(\s|^)(([0-9]|[1-9][0-9]|1[0-9]{,2}|2[0-4][0-9]|25[0-5])[.]){3}([0-9]|[1-9][0-9]|1[0-9]{,2}|2[0-4][0-9]|25[0-5])(\s|$)'

echo "`date +%d/%m/%Y" - "%H:%M:%S` | $views views" | egrep --color '[|][  ][0-9]{2,5}'

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

