// Definindo a URL da API

import progress from "cli-progress";
import colors from "colors";
import fs from "fs";
import urls from "./spot-products-all-links.ts";
import { JSDOM } from "jsdom";

const progressBar = new progress.SingleBar({
  barCompleteChar: "#",
  barIncompleteChar: ".",
  fps: 5,
  stream: process.stdout,
  barsize: 30,
  etaAsynchronousUpdate: true,
  autopadding: true,
  progressCalculationRelative: true,
  format:
    "Downloading " +
    colors.green("{bar}") +
    " {percentage}% " +
    colors.green("{value}/{total}") +
    " {duration}s",
});

const opts = {
  headers: {
    cookie:
      " _ga=GA1.3.1773937727.1707591627; _ga_P6EHZG9H8E=GS1.1.1707681340.9.1.1707681411.50.0.0; _gid=GA1.3.364467819.1707591628; _hjSessionUser_3563339=eyJpZCI6ImJiYTQ4MzU3LThjMTUtNTFlOS05ODhiLTUwZGMxYTcwZDNjNCIsImNyZWF0ZWQiOjE3MDc1OTE2Mjc2MzUsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_3563339=eyJpZCI6IjZlN2EwOWY1LTljZDYtNDdhYy1iM2FmLWQ4ODVjNTRmNzVjOCIsImMiOjE3MDc2ODEzOTQwMDIsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _gat_UA-91734355-4=1; PHPSESSID=ovnmqkrtp2b46i7tvrlrj21gdp",
  },
};

main();

async function main() {
  const totalRequests = urls.length;
  let completedRequests = 0;

  progressBar.start(totalRequests, completedRequests);

  const promises = urls.map(async (url) => {
    const response = await useURLs(url);
    completedRequests++;
    progressBar.update(completedRequests);
    return response;
  });

  const results = await Promise.all(promises);
  progressBar.stop();

  console.log("\nTodas as requisições foram concluídas.");
  console.log(results);
  salvarJSONComoArquivo(results, "spot-products-all-2");
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
    .then((data) => {
      const products: any = [];
      let allProducts: any = [];
      const html = data;
      allProducts = refineJSON(html, products);
      const allPrices = refinePricesTable(html);
      allProducts[0].precos = allPrices?.[0];
      const description = refineDescription(html);
      allProducts[0].descricao = description;
      const infos = refineInfos(html);
      allProducts[0].infos = infos;
      const downloadImages = refineDownloadImages(html);
      allProducts[0].download_images = downloadImages;
      const colors = refineColors(html);

      allProducts[0].variants = {};

      allProducts[0].sku = allProducts[0].item_id;

      colors.forEach((color: any) => {
        const colorValue = color.colorValue;
        const skuVariant = allProducts[0].sku + "_" + colorValue;
        allProducts[0].variants[skuVariant] = {
          SKU: skuVariant,
          colorName: color.colorName,
          colorHexValue: color.colorHexValue,
          colorValue: color.colorValue,
        };
      });

      console.log(allProducts[0]);
      return allProducts[0];
    })
    .catch((error) => {
      console.error("Ocorreu um erro:", error);
    });
}

function refineColors(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const colorsElements = document.querySelectorAll(".color");
  let colors: any = [];

  colorsElements.forEach((colorElement) => {
    const colorName = colorElement.getAttribute("title");
    let colorHex = colorElement.querySelector("span")?.getAttribute("style");

    const startIndex = colorHex?.indexOf("#");
    const colorHexValue = colorHex?.substring(
      startIndex as number,
      (startIndex as number) + 7,
    );

    let colorValue = colorElement?.textContent?.trim();

    colors.push({ colorName, colorHexValue, colorValue });
  });
  return colors;
}

function refineDownloadImages(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const link = document.querySelector(
    '.extra a[href^="/pt/produto/ajax/downloadImagensProduto.php"]',
  );
  if (link) {
    const href = link.getAttribute("href");
    return href;
  } else {
    console.error("Link não encontrado.");
  }
}

function refineInfos(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const caracteristicas = document.querySelectorAll(
    ".conteudo .caracteristica",
  );
  const infos: { [key: string]: string } = {};

  caracteristicas.forEach((caracteristica) => {
    const tituloElement = caracteristica.querySelector(".titulo");
    const titulo = tituloElement?.textContent?.trim() || "";

    const descElement = caracteristica.querySelector(".desc");
    const desc = descElement?.textContent?.trim() || "";

    desc.length > 0 ? (infos[titulo] = desc) : null;
  });
  return infos;
}

function refineDescription(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const description = document.querySelector(".texto");
  if (description) {
    return description.textContent?.trim();
  } else {
    console.log("Descrição não encontrada.");
  }
}

function refinePricesTable(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const pricesTable = document.querySelector(".tabela-precos");
  if (pricesTable) {
    const headers = [...pricesTable.querySelectorAll("thead th")].map((th) => {
      if (th.textContent !== "Quantidade") {
        return th.textContent?.trim();
      }
    });
    const rows = [...pricesTable.querySelectorAll("tbody tr")].map((row) => {
      const cells = [...row.querySelectorAll("td")].map((td) =>
        td.textContent?.trim(),
      );
      return Object.fromEntries(
        headers.map((header, index) => [header, cells[index]]),
      );
    });
    // const json = JSON.stringify(rows);
    return rows;
  } else {
    console.log("Tabela de preços não encontrada.");
  }
}

function refineJSON(html: any, products: any) {
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
