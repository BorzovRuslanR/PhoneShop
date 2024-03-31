import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { Product } from '@prisma/client'
import AddToCart from './AddToCart'
import RatingStars from '../ratingStars/RatingStars'

type Props = {
  product: Product
}

export default function ProductCard({product}: Props) {
  return (
    <Card className="dark:hover:bg-slate-300 hover:bg-slate-300 transition-transform hover:-translate-y-1" key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='relative h-60 lg:h-72'>
                  <Image
                   src={product.img}
                   alt={product.name}
                  //  width={400}
                  //  height={500}
                  fill
                  className='object-contain'
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                   />
                </div>
              </CardContent>
                <CardContent className='flex justify-between items-center gap-2 lg:gap-10 md:gap-6'>
                  <CardContent className='text-black font-bold border border-red-500 rounded inline-block p-2 m-2 lg:m-6 dark:text-white text-nowrap'>{product.price} $</CardContent>
                  <CardContent className='flex justify-end items-center'><RatingStars product={product} /></CardContent>
                </CardContent>
              <CardFooter className="flex justify-between">
                <AddToCart product={product} />
              </CardFooter>
            </Card>
  )
}