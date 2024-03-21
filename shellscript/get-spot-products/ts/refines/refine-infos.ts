import { JSDOM } from "jsdom";

export function refineInfos(html: any) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const caracteristicas = document.querySelectorAll(
    ".conteudo .caracteristica",
  );
  const infos: string[] = [];

  caracteristicas.forEach((caracteristica) => {
    const tituloElement = caracteristica.querySelector(".titulo");
    const titulo = tituloElement?.textContent?.trim() || "";

    const descElement = caracteristica.querySelector(".desc");
    const desc = descElement?.textContent?.trim() || "";

    const info = `${titulo} ${desc}`;

    info !== " " ? infos.push(info) : null;
    
  });

  return infos;
}
