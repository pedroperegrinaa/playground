import { JSDOM } from "jsdom";

export function refinePricesTable(html: any) {
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

    delete rows[0].Quantidade;

    function extrairValor(objeto: any) {
      let chaves = Object.keys(objeto);
      const valores = chaves.map((chave) => {
        return objeto[chave].replace(" R$", "").replace(",", "").slice(0, -1);
      });

      chaves = chaves.map((chave) => {
        return chave.replace(".", "");
      });

      const resultado: { [key: string]: string } = {};

      chaves.forEach((chave, index) => {
        resultado[chave] = valores[index];
      });

      return resultado;
    }
    const valores = extrairValor(rows[0]);

    return valores;
  } else {
    console.log("Tabela de preços não encontrada.");
  }
}
