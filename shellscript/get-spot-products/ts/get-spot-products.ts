import fs from "fs";
import urls from "./links/spot-products-all-links.ts";

import {
  refineJSON,
  refinePricesTable,
  refineDescription,
  refineInfos,
  refineDownloadImages,
  refineColors,
  progressBar,
  refineCustomPricesTable,
} from "./refines/index.ts";

export const opts = {
  headers: {
    cookie:
      "_ga_P6EHZG9H8E=GS1.1.1709785827.47.1.1709785962.60.0.0;_hjSession_3563339=eyJpZCI6Ijc0YTBhZDUyLWQ3OWMtNDBjZS1hYWYxLWNhMjkxMzkzMTI5NCIsImMiOjE3MDk3ODU4MjU1ODYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjEsImZzIjowLCJzcCI6MX0=;_hjSessionUser_3563339=eyJpZCI6ImJiYTQ4MzU3LThjMTUtNTFlOS05ODhiLTUwZGMxYTcwZDNjNCIsImNyZWF0ZWQiOjE3MDc1OTE2Mjc2MzUsImV4aXN0aW5nIjp0cnVlfQ==;_ga=GA1.3.1773937727.1707591627;_gid=GA1.3.142940610.1709562067;PHPSESSID=s60k7g931c3t934iqkbh8v93ll;cookiePolicy=1",
},
};

main();

async function main() {
  const totalRequests = urls.length;
  let completedRequests = 0;

  progressBar.start(totalRequests, completedRequests);

  const results = [];

  for (const url of urls) {
    const response = await useURLs(url);
    completedRequests++;
    progressBar.update(completedRequests);
    results.push(response);
  }

  progressBar.stop();

  console.log("\nTodas as requisições foram concluídas.");
  // console.log(results);
  salvarJSONComoArquivo(results, "./exports/spot-products-all");
}

function salvarJSONComoArquivo(jsonObjeto: any, nomeArquivo: string) {
  fs.writeFileSync(nomeArquivo + ".json", JSON.stringify(jsonObjeto));
}

async function useURLs(url: string) {
  return fetch(url, opts)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter os dados da API");
      }
      return response.text();
    })
    .then(async (data) => {
      const products: any = [];
      let allProducts: any = [];
      const html = data;
      allProducts = refineJSON(html, products);
      const allPrices = refinePricesTable(html);
      allProducts[0].prices = allPrices;
      const description = refineDescription(html);
      allProducts[0].description = description;
      const infos = refineInfos(html);
      allProducts[0].infos = infos;
      const downloadImages = refineDownloadImages(html);
      allProducts[0].downloadImages = downloadImages;
      const colors = refineColors(html);
      const {owlSlides: cardCustoms, newCustomPricesTable: tableCustoms} = await refineCustomPricesTable(html);

      allProducts[0].customPricesTable = {cardCustoms: cardCustoms, tables: tableCustoms};

      allProducts[0].variants = [];

      allProducts[0].sku = allProducts[0].item_id;

      colors.forEach((color: any) => {
        const colorValue = color.colorValue;
        const skuVariant = allProducts[0].sku + "_" + colorValue;
        allProducts[0].variants.push({
          sku: skuVariant,
          colorName: color.colorName,
          colorHexValue: color.colorHexValue,
          colorValue: color.colorValue,
        });
      });

      delete allProducts[0].item_id;
      delete allProducts[0].coupon;
      delete allProducts[0].discount;
      delete allProducts[0].index;
      delete allProducts[0].item_category3;
      delete allProducts[0].item_category4;
      delete allProducts[0].item_category5;
      delete allProducts[0].item_list_id;
      delete allProducts[0].item_list_name;
      delete allProducts[0].item_variant;
      delete allProducts[0].location_id;
      delete allProducts[0].quantity;
      delete allProducts[0].item_brand;

      allProducts[0].price = String(allProducts[0].price)
        .replace(".", "")
        .slice(0, -1);

      allProducts[0].basePrice = allProducts[0].price;
      delete allProducts[0].price;

      allProducts[0].itemName = allProducts[0].item_name;
      delete allProducts[0].item_name;

      allProducts[0].itemCategory = allProducts[0].item_category;
      delete allProducts[0].item_category;

      allProducts[0].itemCategory2 = allProducts[0].item_category2;
      delete allProducts[0].item_category2;

      console.log(allProducts[0]);
      return allProducts[0];
    })
    .catch((error) => {
      console.error("Ocorreu um erro:", error);
    });
}
