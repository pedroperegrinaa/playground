import fs from "fs";
import { join } from "path";
import { readFile } from "fs/promises";


async function productsToJsonArray() {
  const allProducts = JSON.parse(await readFile(join(__dirname, 'ts', 'exports', 'spot-products-all.json'), 'utf-8'));
  const productsImages: string[] = []

  for (const product of allProducts) {
    productsImages.push(product.downloadImages)
  }

  fs.writeFileSync("ïmages.json", JSON.stringify(productsImages));

  return productsImages
}

const productsImages = await productsToJsonArray()

console.log(productsImages)