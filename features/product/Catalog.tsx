import React from 'react'
import ProductCard from './ProductCard'
import { db } from '@/prisma/db'
import Filter from '../filters/Filter'
// import {setTimeout as wait} from 'node:timers/promises' // искуственная задержка, только на сервере

export default async function Catalog({
  searchParams,
}: {
  searchParams?: {
    manufacturer?: string;
  };
}) {
  const catalog =
    searchParams?.manufacturer && searchParams?.manufacturer !== "0"
    ? await db.product.findMany({
        where: {
          manufacturerId: parseInt(
            searchParams.manufacturer
          ),
        },
      })
    : await db.product.findMany();
    // await wait(2000) 
    return (
      <div>
        <div className='flex justify-start mt-10 ml-20 mb-6'>
          <Filter />
        </div>
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
