import { JSDOM } from "jsdom";


export function refinePricesTable(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const pricesTable = document.querySelector(".tabela-precos");

  if (pricesTable) {
    const headers = [...pricesTable.querySelectorAll("thead th")].map((th) => {
      const thText = th.textContent?.trim().replace(".", "");
      if (thText !== "Quantidade") {
        return thText;
      }
    });

    const rows = [...pricesTable.querySelectorAll("tbody tr")].map((row) => {
      const cells = [...row.querySelectorAll("td")].map((td) =>
        td.textContent?.trim().replace(" R$", "").replace(",", "").slice(0, -1),
      );

      return cells.slice(1);
    });

    const valores = {
      quantity: headers.slice(1),
      price: rows[0],
    }

    return valores;
  } else {
    console.log("Tabela de preços não encontrada.");
  }
}
