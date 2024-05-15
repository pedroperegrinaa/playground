const readXlsxFile = require('read-excel-file/node')

import { readFile } from 'fs/promises';
import { join } from 'path';

const filePath = './catalogo-new.xlsx'

interface IVariant {
  sku: string
  colorName: string
  colorHexValue: string
}

interface ICustomType {
  titulo: string;
}

interface IPrice {
  quantity: string[]
  price: string[]
  percentage: string[]
}

interface IProduct {
  category: string
  itemName: string
  description: string
  sku: string
  variants?: IVariant[]
  customTypes?: {
    titulo: string
  }[]
  prices?: IPrice
  affiliation: string
}

let products: IProduct[] = []

const sheetData = await readXlsxFile(filePath).then((rows: any) => {
  return rows
})

let variants: IVariant[][] = []
let customTypes: ICustomType[][] = [];
let prices: IPrice[] = [];

let actualItem = 0

sheetData.forEach((row: any, index: number) => {
  if (index === 0) return

  if (row[0]) {
    products.push(
      {
        category: row[0],
        itemName: row[1],
        description: row[2],
        sku: row[3],
        affiliation: row[11],
      }
    )
    actualItem++
  }

  if (row[4]) {
    // console.log(row[4])
    if (!variants[actualItem]) {
      variants[actualItem] = []
    }

    variants[actualItem].push(
      {
        sku: row[4],
        colorName: row[5],
        colorHexValue: row[6],
      }
    )
  }

  if (row[7]) {
    if (!customTypes[actualItem]) {
      customTypes[actualItem] = []
    }

    customTypes[actualItem].push(
      {
        titulo: row[7],
      }
    )
  }

  if (row[8]) {
    if (!prices[actualItem]) {
      prices[actualItem] = {
        quantity: [],
        price: [],
        percentage: [],
      }
    }

    prices[actualItem].quantity.push(row[8].toString())
    prices[actualItem].price.push((row[9] * 100).toString())
    prices[actualItem].percentage.push(row[10].toString())
  }

})

// console.log(prices)

variants.map((variant: IVariant[], index) => {
  if (index === 0) return
  products[index - 1].variants = variant
})

customTypes.map((customType: ICustomType[], index) => {
  if (index === 0) return
  products[index - 1].customTypes = customType
}) 

prices.map((price: IPrice, index) => {
  if (index === 0) return
  products[index - 1].prices = price
})

// customTypes.map((customType: ICustomType, index) => {
//   if (index === 0) return
//   products[index - 1].customTypes = customType
// })


// console.log(JSON.stringify(products, null, 2))

async function postAllProducts() {

  for (const product of products) {

    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    console.log(data);
  }
}

postAllProducts()





































// sheetData.forEach((row: any, index: number) => {
//   if (index === 0) return

//   if (row[0]) {
//     products.push(
//       {
//         category: row[0],
//         itemName: row[1],
//         description: row[2],
//         sku: row[3],
//         // variants: [
//         //   {
//         //     sku: row[4],
//         //     colorName: row[5],
//         //     colorHexValue: row[6],
//         //   },
//         // ],
//         // customTypes: [
//         //   {
//         //     titulo: row[7],
//         //   },
//         // ],
//         // prices: {
//         //   quantity: row[8],
//         //   price: row[9]
//         // },
//         // percentage: row[10],
//         affiliation: row[11],
//       }
//     )

//     actualItem = index
//   }

//   console.log(row)
//   console.log('index', index, 'lastItem', lastItem, 'actualItem', actualItem)

//   if (index !== lastItem) {
//     if (row[4]) {
//       if (!skuVariants[actualSku]) {
//         skuVariants[actualSku] = []
//       }
//       skuVariants[actualSku].push(row[4])
//     }

//     console.log(skuVariants)

//     lastItem = index
//     if (index === actualItem && index !== 1) {
//       actualSku = actualSku + 1
//     }
//   }
// })



















