import React from 'react'
import ProductCard from './ProductCard'
import { db } from '@/prisma/db'
// import {setTimeout as wait} from 'node:timers/promises' // искуственная задержка, только на сервере

export default async function Catalog() {
    const catalog = await db.product.findMany()
    // await wait(2000)
    return (
      <div>
        <div className='grid gap-4 mt-8 md:m-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 '>
          {
            catalog.map(product => {
              return <ProductCard product={product} key={product.id}/>
            })
          }
        </div>
      </div>
    )
}
