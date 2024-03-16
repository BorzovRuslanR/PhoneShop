'use client';

import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2, Wallet } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useGetFavorites, useRemoveFromFavorites } from './use-favorites';
import ClearDialog from '../clearDialog/ClearDialog';



export default function FavoritesPage() {
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();
  const { favorites, isLoading, isError } = useGetFavorites();
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
  if (!favorites) return <div>Load error</div>;

  const formattedFavorite = favorites.map((cartItem) => {
    return {
      productId: cartItem.productId,
      productName: cartItem.Product.name,
      productDesc: cartItem.Product.desc,
      productPrice: cartItem.Product.price,
      productImg: cartItem.Product.img,
    };
  });
  

  return (
    <div className="container mx-auto py-8">
      <div className='flex justify-between items-center p-4'>
        <h2 className="text-2xl font-bold mb-4">Favorites</h2>

        <div className='flex items-center'>
        
        <ClearDialog
          dialogDescription="favorites"
          onClear={() => {
            removeFromFavorites({});
          }}
        ><Button 
            size={'default'} 
            variant={'destructive'} 
            >Clear</Button>
        </ClearDialog>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {formattedFavorite.map(cartItem => (
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
          <div className="flex items-center gap-2">
          <Button
            variant={"destructive"}
            className="flex items-center gap-2"
            size={"icon"}
            onClick={() => {
                removeFromFavorites({
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
    </div>
  );
}

