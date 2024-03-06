import { JSDOM } from "jsdom";

export function refineDescription(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const description = document.querySelector(".texto");

  if (description) {
    return description.textContent?.trim();
  } else {
    console.log("Descrição não encontrada.");
  }
}
