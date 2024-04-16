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
    <Card className="dark:hover:bg-slate-300 hover:bg-slate-300 transition-transform hover:-translate-y-1 relative py-24" key={product.id}>
              <CardHeader className='absolute top-0'>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.desc}</CardDescription>
              </CardHeader>
              {/* <CardContent className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>  */}
              <CardContent className='flex flex-col justify-center'> 
                <div className='relative h-60 lg:h-72'>
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className='object-contain'
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                   />
                </div>
              </CardContent>
                <CardContent className='flex justify-between items-center gap-2 lg:gap-10 md:gap-6'>
                  <CardContent className='text-black font-bold border border-red-500 rounded inline-block p-2 m-2 lg:m-6 dark:text-white text-nowrap'>{product.price} $</CardContent>
                  <CardContent className='flex justify-end items-center'>
                  <div className="flex flex-col items-center mt-6">
                    <RatingStars product={product} />
                    <span className="text-xs text-slate-600 mt-2">{product.ratingAverage}</span>
                  </div>
                  </CardContent>
                </CardContent>
              <CardFooter className="flex justify-between absolute bottom-0">
                <AddToCart product={product} />
              </CardFooter>
            </Card>
  )
}