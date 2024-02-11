#!/bin/bash

arquivo_links="spot-products-all-links.txt"
saida_json="output.json"

if [ ! -f "$arquivo_links" ]; then
    echo "Arquivo de links não encontrado: $arquivo_links"
    exit 1
fi

while IFS= read -r link; do
    conteudo_temp=$(curl -s "$link")
    curl $link | awk '/<script>/{p=1;print;next} /<\/script>/{p=0} p' | sed -n 's/.*{\(.*\)}.*/\1/p' | sed 's/ ecommerce: null//g' | sed 's/^/{/; s/$/}/' >> "$saida_json"
done < "$arquivo_links"
