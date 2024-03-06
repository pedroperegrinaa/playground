import { JSDOM } from "jsdom";

export function refineDownloadImages(html: any) {
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
