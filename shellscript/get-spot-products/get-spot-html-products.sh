#!/bin/bash

arquivo_links="spot-products-lite-links.txt"
saida_json="output-html.json"

if [ ! -f "$arquivo_links" ]; then
  echo "Arquivo de links não encontrado: $arquivo_links"
  exit 1
fi

while IFS= read -r link; do
  conteudo_temp=$(curl -s "$link")
  curl -s $link |
    sed -n '/<div class="texto">/,/<\/div>/p' |
    sed -E 's/<[^>]*>//g; s/&nbsp;/ /g; s/&eacute;/é/g; s/&agrave;/à/g; s/&ccedil;/ç/g; s/<br ?\/?>/ /g' |
    sed -n '/^ /,$p' >> "$saida_json"

#   curl $link | awk '/<script>/{p=1;print;next} /<\/script>/{p=0} p' | sed -n 's/.*{\(.*\)}.*/\1/p' | sed 's/ ecommerce: null//g' | sed 's/^/{/; s/$/}/' >>"$saida_json"
done <"$arquivo_links"

