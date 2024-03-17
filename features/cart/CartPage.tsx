'use client';

import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2, Wallet } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

import {
  useAddToCart,
  useGetCart,
  useRemoveFromCart,
  useUpdateCart,
} from "./use-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import ClearDialog from '../clearDialog/ClearDialog';


export default function CartPage() {
  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { cart, isLoading, isError } = useGetCart();
  const router = useRouter();
  const queryClient = useQueryClient();

  if (isLoading) 
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl mt-2">Cart</h2>
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!cart) return <div>Load error</div>;

  const formattedCart = cart.map((cartItem) => {
    return {
      productId: cartItem.productId,
      productName: cartItem.Product.name,
      productDesc: cartItem.Product.desc,
      productPrice: cartItem.Product.price,
      quantity: cartItem.quantity,
      productImg: cartItem.Product.img,
    };
  });

  if (formattedCart.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <h2 className='m-4'>Cart is empty</h2>
        <Button
          className='m-4'
          onClick={() => {
            router.push("/");
          }}
        >
          Start shopping
        </Button>
      </div>
    );
  }

  let total = 0;

  formattedCart.forEach(cartItem => {
    const itemTotal = cartItem.productPrice * cartItem.quantity;
    total += itemTotal;
  });


  return (
    <div className="container mx-auto py-8">
      <div className='flex justify-between items-center p-4'>
        <h2 className="text-2xl font-bold mb-4">Cart</h2>

        <div className='flex items-center'>
        
        <ClearDialog
          dialogDescription="cart"
          onClear={() => {
            removeFromCart({});
          }}
        ><Button 
            size={'default'} 
            variant={'destructive'} 
            >Clear cart</Button>
        </ClearDialog>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {formattedCart.map(cartItem => (
          <li
          key={cartItem.productId}
          className="bg-white p-4 shadow rounded-lg flex items-center"
        >
          <div className="mr-4">
            <Image
              src={cartItem.productImg}
              alt={cartItem.productName}
              width={400}
              height={600}
              className="w-32 h-32 object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{cartItem.productName}</h3>
            <p className="text-gray-500">{cartItem.productDesc}</p>
          </div>
          <p className="text-gray-500 p-4">${cartItem.productPrice * cartItem.quantity}</p>
          <div className="flex items-center gap-2">
              <Button
                className="w-8 h-8"
                onClick={() => {
                  addToCart({
                    productId: cartItem.productId,
                    quantity: 1,
                  });
                }}
              >
                +
              </Button>
              <p className="text-gray-500">{cartItem.quantity}</p>
              <Button
                className="w-8 h-8"
                onClick={() => {
                  updateCart({
                    productId: cartItem.productId,
                    quantity: cartItem.quantity - 1,
                  });
                }}
              >
                -
              </Button>
          <Button
            variant={"destructive"}
            className="flex items-center gap-2"
            size={"icon"}
            onClick={() => {
                removeFromCart({
                  productId: cartItem.productId,
                });
              }}
          >
            <Trash2 />
          </Button>
        
        </div>
        </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4 items-center">
        <span className="font-bold text-gray-600 text-2xl mr-2">
          Total: <span className="font-bold">{total} $</span>
        </span>
        <Button size={'lg'} variant={'submit'} onClick={() => {
            router.push("/orders");
          }}>
          Buy
          <Wallet />
        </Button>
      </div>
    </div>
  );
}

