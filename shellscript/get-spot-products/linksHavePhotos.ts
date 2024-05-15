import fs from "fs";
import { join } from "path";
import { readFile } from "fs/promises";

const productsWithoutPhotos: string[] = []


async function productsToJsonArray() {
  const allProducts = JSON.parse(await readFile(join(__dirname, 'spot-products-all.json'), 'utf-8'))

  let semFoto = 0
  let count = 0

  for (const product of allProducts) {
    const response = await fetch(`https://www.spotgifts.com.br/fotos/produtos/${product.sku}_set.jpg`)

    if (!response.ok) {
      semFoto = semFoto + 1
      console.log(semFoto)
      console.log(product.sku)
      productsWithoutPhotos.push(product.sku)
    }
    count++
    // console.log(count)
  }

  console.log(productsWithoutPhotos)
}
productsToJsonArray()
