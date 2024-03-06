export function refineJSON(html: any, products: any) {
  const regex =
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*arrItems\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const matches = html.match(regex);

  if (matches) {
    for (const match of matches) {
      const regexArrItems = /var\s+arrItems\s*=\s*(\[.*?\]);/s;
      const matchArrItems = match.match(regexArrItems);
      if (matchArrItems) {
        const arrItemsString = matchArrItems[1];
        const arrItems = JSON.parse(arrItemsString);
        products.push(arrItems[0]);
      } else {
        console.log("Não foi possível encontrar o array 'arrItems'.");
      }
    }
    return products;
  } else {
    console.log("Nenhuma correspondência encontrada.");
  }
}
