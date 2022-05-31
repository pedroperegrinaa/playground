#!/bin/bash

echo "Digite algo para que eu guarde"
read ALGO

touch ~/projetos/playground/shellscript/teste.txt 

echo "Vou salvar $ALGO em teste.txt"
echo "$ALGO" >> ~/projetos/playground/shellscript/teste.txt
echo "Salvei po"
exit
