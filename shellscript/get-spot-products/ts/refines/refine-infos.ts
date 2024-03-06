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

    if (info !== " ") {
      infos.push(info);
    } else {
      console.log("Característica não encontrada.");
    }
  });

  return infos;
}
