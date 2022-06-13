#!/bin/bash

echo "iniciando download"

Estados=('acre'
'alagoas'
'amapa'
'amazonas'
'bahia'
'ceara'
'distrito_federal'
'espirito_santo'
'goias'
'maranhao'
'mato_grosso_do_sul'
'mato_grosso'
'minas_gerais'
'para'
'paraiba'
'parana'
'pernambuco'
'piaui'
'rio_de_janeiro'
'rio_grande_do_norte'
'rio_grande_do_sul'
'rondonia'
'roraima'
'santa_catarina'
'sao_paulo'
'sergipe'
'tocantins')

for estado in "${Estados[@]}"; do
    echo $estado
    wget -c -P ~/powerbi/total_domicilios/downloads https://ftp.ibge.gov.br/Censos/Censo_Demografico_2010/resultados/total_domicilios_$estado.zip

    unzip ./downloads/total_domicilios_$estado -d ./upziped
done

