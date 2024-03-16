'use client';

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client';
import React, { useState } from 'react'
// import addToCartAction from './addToCartAction';
import { BarChartHorizontal, Heart } from 'lucide-react';
import { useAddToCart, useGetCart, useUpdateCart } from '../cart/use-cart';
import { Skeleton } from '@/components/ui/skeleton';
import { useAddToFavorites, useGetFavorites, useRemoveFromFavorites } from '../favorites/use-favorites';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
};

export default function AddToCart({ product }: Props) {
  const { cart, isLoading } = useGetCart()
  const productInCart = cart?.find(cartItem => cartItem.productId === product.id)
  const { mutate: addToCart } = useAddToCart()
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: AddToFavorites } = useAddToFavorites();
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();
  const { favorites, isLoading: favoritesLoading } = useGetFavorites();
  if (isLoading) return <Skeleton className='h-8 w-full' />
 const isFavorite = !!favorites?.find(item => item.Product.id === product.id)
  return (
    <>
      <div className='flex justify-between gap-2 xl:gap-8 lg:gap-8 sm:gap-6 md:gap-4'>
        <div className='flex gap-[4px] lg:ml-4'>
          <Button
            className='dark:hover:bg-cyan-300 hover:bg-cyan-300'
            variant="outline"
            size={'icon'} 
            onClick={() => {
              if (isFavorite) removeFromFavorites({productId: product.id})
              else AddToFavorites({ productId: product.id });
            }}
            >
            <Heart className={cn({
              'text-red-500' : isFavorite
            })}/>
          </Button>
          <Button className='dark:hover:bg-cyan-300 hover:bg-cyan-300' variant="outline" size={'icon'}>
            <BarChartHorizontal />
          </Button>
        </div>
        {productInCart ? (
        <div className="flex items-center gap-2">
          <Button
            className="w-8 h-8"
            onClick={() => {
              addToCart({
                productId: productInCart.productId,
                quantity: 1,
              });
            }}
          >
            +
          </Button>
          <p>{productInCart.quantity}</p>
          <Button 
            className="w-8 h-8" 
            onClick={() => {
              updateCart({
                productId: productInCart.productId,
                quantity: productInCart.quantity - 1,
              });
            }}
          >-</Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 ml-20">
            <Button
              size={'lg'}
              variant={'submit'}
              onClick={() => {
                addToCart({
                  productId: product.id,
                  quantity: 1,
                });
              }}
            >
              Buy
            </Button>
          </div>
      )}
      </div>
    </>
  );
}