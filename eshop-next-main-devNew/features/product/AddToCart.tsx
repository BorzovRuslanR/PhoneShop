'use client';

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client';
import React, { useState } from 'react'
// import addToCartAction from './addToCartAction';
import { BarChartHorizontal, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
    product: Product
}

export default function AddToCart({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: quantity,
      }),
    });
  };

  return (
    <>
      <div className='flex justify-between gap-2 xl:gap-8 lg:gap-8 sm:gap-6 md:gap-4'>
        <div className='flex gap-[4px] lg:ml-4'>
          <Button className='dark:hover:bg-cyan-300 hover:bg-cyan-300' variant="outline" size={'icon'}>
            <Heart />
          </Button>
          <Button className='dark:hover:bg-cyan-300 hover:bg-cyan-300' variant="outline" size={'icon'}>
            <BarChartHorizontal />
          </Button>
        </div>
        <div>
          <Input type="number" value={quantity} onChange={handleQuantityChange} min={1} />
        </div>
        <div className='flex gap-2'>
          <Button variant={'submit'} size={'lg'} onClick={handleAddToCart}>
            Buy
          </Button>
        </div>
      </div>
    </>
  );
}