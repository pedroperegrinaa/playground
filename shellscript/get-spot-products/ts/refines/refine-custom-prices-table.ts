import { JSDOM } from "jsdom";
import { opts } from "../get-spot-products";

export async function refineCustomPricesTable(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  var personalizeDiv = document.querySelector(".personalize-container");

  interface OwlSlide {
    titulo: string;
    localizacao: string;
    area: string;
  }

  interface CustomPricesTable {
    title: string;
    tables: {
      title: string;
      titleArea: string;
      titleSubArea: string;
      quantity: string[];
      headers: string[];
      columns: string[][];
    }[];
  };

  const dataAttributes: { [key: string]: string } = {};

  if (personalizeDiv !== null) {
    for (const attribute of personalizeDiv.attributes) {
      if (attribute.name.startsWith('data-')) {
        dataAttributes[attribute.name] = attribute.value;
      }
    }
  }
  let url = 'https://www.spotgifts.com.br/pt/produto/ajax/carregaPersonalizacoes.php?';
  for (const [name, value] of Object.entries(dataAttributes)) {
    url += `${name.substr(5)}=${encodeURIComponent(value)}&`;
  }
  url = url.slice(0, -1);

  const res = fetch(url, opts).then((response) => {
    if (!response.ok) {
      throw new Error("Erro ao obter os dados da API");
    }
    return response.text();
  }
  ).then((data) => {
    const dom = new JSDOM(data);
    const document = dom.window.document;

    const owl = document.querySelectorAll(".slide");

    let owlSlides: OwlSlide[] = [];

    owl.forEach((owl, index) => {
      const titulo = owl.querySelector(".titulo")
      const localizacao = owl.querySelector(".localizacao")
      const area = owl.querySelector(".area")

      owlSlides.push({
        titulo: titulo?.textContent?.trim().replace(/\s+/g, ' ') || "",
        localizacao: localizacao?.textContent?.trim().replace(/\s+/g, ' ') || "",
        area: area?.textContent?.trim().replace(/\s+/g, ' ') || ""
      });
    });

    const tables = document.querySelectorAll(".price-table-container");

    const allTables = document.querySelectorAll(".multi-tabela-cor-tamanho-wrapper");

    const customPricesTable: CustomPricesTable[] = [];

    allTables.forEach((fullTable, index) => {
      const title = fullTable.querySelectorAll(".titulo");
      const titles: string[] = [];
      const titleArea = fullTable.querySelectorAll(".titulo-area");
      const titlesArea: string[] = [];
      const titleSubArea = fullTable.querySelectorAll(".sub-titulo");
      const titlesSubArea: string[] = [];

      title.forEach((title, index) => {
        if (titles[index] === undefined) {
          titles[index] = title.textContent?.trim().replace(/\s+/g, ' ') as string;
        }
      });

      titleArea.forEach((title, index) => {
        if (titlesArea[index] === undefined) {
          titlesArea[index] = title.textContent?.trim().replace(/\s+/g, ' ') as string;
        }
      });

      titleSubArea.forEach((title, index) => {
        if (titlesSubArea[index] === undefined) {
          titlesSubArea[index] = title.textContent?.trim().replace(/\s+/g, ' ') as string;
        }
      });

      if (titles.length === 0) {
        return customPricesTable.push(
          {
            title: "Tabela indisponivel. Verificar manualmente.",
            tables: [
              {
                title: "Tabela indisponivel. Verificar manualmente.",
                titleArea: "Tabela indisponivel. Verificar manualmente.",
                titleSubArea: "Tabela indisponivel. Verificar manualmente.",
                quantity: [],
                headers: [],
                columns: []
              }
            ]
          }
        )
      }

      // console.warn("\n titles", titles);
      // console.warn("titles", titles[index], index);
      // console.log(url)

      const newTable: CustomPricesTable = {
        title: title[0].textContent?.trim().replace(/\s+/g, ' ') as string,
        tables: [
          {
            title: titles[index],
            titleArea: titlesArea[index],
            titleSubArea: titlesSubArea[index],
            quantity: [],
            headers: [],
            columns: []
          }
        ]
      };

      customPricesTable.push(newTable);

      const tables = fullTable.querySelectorAll(".tabela-cor-tamanho");

      tables.forEach((table, index2) => {

        const headers = table.querySelectorAll("thead tr th");
        const rows = table.querySelectorAll("tbody tr");

        let headersNames: any = []

        headers?.forEach((head, i) => {
          headersNames.push(head.textContent?.trim().replace(/\s+/g, ' '));
        });

        headersNames = headersNames.splice(1, headersNames.length);

        if (!customPricesTable[index].tables[index2]) {
          customPricesTable[index].tables[index2] = {
            title: titles[index2],
            titleArea: titlesArea[index2],
            titleSubArea: titlesSubArea[index2],
            headers: [],
            quantity: [],
            columns: []
          };
        }

        customPricesTable[index].tables[index2].headers = headersNames
        const customPrice: string[][] = [];

        rows?.forEach((row, j) => {
          const columns = row.querySelectorAll("td");
          columns.forEach((column, k) => {
            if (k === 0) {
              customPricesTable[index].tables[index2].quantity.push(column.textContent?.replace(".", "") as string);
            }
            else {
              if (!customPrice[k]) {
                customPrice[k] = [];
              }

              let price = column.textContent?.replace("R$", "").replace(",", "").slice(0, -1);

              if (price?.startsWith("0")) {
                price = price.slice(1);
              }

              customPrice[k].push(price as string);
            }
          })
        });

        customPricesTable[index].tables[index2].columns = customPrice.filter(Boolean);
        // console.log("customPricesTable", customPricesTable[0].tables);

        return customPricesTable;
      });
    });

    // console.log(customPricesTable[0].tables)

    const newCustomPricesTable = customPricesTable.map((table) => {
      return {
        title: table.title,
        tables: table.tables.map((table) => {
          return {
            title: table.title,
            titleArea: table.titleArea,
            titleSubArea: table.titleSubArea,
            quantity: table.quantity,
            headers: table.headers,
            columns: table.columns
          }
        })
      }
    }
    );

    return { owlSlides, newCustomPricesTable };
  })
  // console.log(res);

  return res
}
