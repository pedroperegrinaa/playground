import { JSDOM } from "jsdom";

export function refineColors(html: any) {
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
