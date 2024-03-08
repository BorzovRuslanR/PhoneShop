'use client';

import { Button } from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Cart, cartSchema } from './cart-schema';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';


export default function CartPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast()
  const { data: cart, isLoading, isError } = useQuery<Cart | undefined>({
    queryKey: ['cart'],
    queryFn: () => {
      return fetch('/api/cart').then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      }).then(data => {
        return cartSchema.parse(data);
      }).catch(error => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        return undefined;
      })
    }
  });

  const handleDeleteCart = async () => {
    try {
      const response = await fetch('/api/cartDeleteFull', {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete cart');
      }
  
      const data = await response.json();
  
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Success',
        description: 'Cart cleared',
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    );
  }

  if (!cart) {
    return <div>Load error</div>;
  }

  const totalItems = cart.cart.length;

  let totalQuantity = 0;

  cart.cart.forEach((cartItem) => {
    cartItem.ProductCart.forEach((productCartItem) => {
      totalQuantity += productCartItem.quantity;
    });
  });

  let totalCost = 0;

  cart.cart.forEach((cartItem) => {
    cartItem.ProductCart.forEach((productCartItem) => {
      const { price } = productCartItem.Product;
      const quantity = productCartItem.quantity;
      totalCost += price * quantity;
    });
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!cart) return <div>Load error</div>;

  const formattedCart = cart.cart.map(cartItem => {
    return {
      productId: cartItem.ProductCart[0].productId,
      productName: cartItem.ProductCart[0].Product.name,
      productDesc: cartItem.ProductCart[0].Product.desc,
      productPrice: cartItem.ProductCart[0].Product.price,
      quantity: cartItem.ProductCart[0].quantity,
      productImg: cartItem.ProductCart[0].Product.img
    }
  })


  return (
    <div className="container mx-auto py-8">
      <div className='flex justify-between items-center p-4'>
        <h2 className="text-2xl font-bold mb-4">Cart</h2>

        <div className='flex items-center'>
        <p className="font-bold text-gray-600 text-2xl m-2">
            Total quantity: <span className="font-bold">{totalQuantity}</span>
        </p>
        <p className="font-bold text-gray-600 text-2xl m-2">
            Total items: <span className="font-bold">{totalItems}</span>
        </p>
          <Button size={'default'} variant={'destructive'} onClick={handleDeleteCart}>Clear cart</Button>
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
          <p className="text-gray-500 p-4">${cartItem.productPrice}</p>
          <p className="text-gray-500 p-4">{cartItem.quantity}</p>
          <Button size={'icon'} variant={'destructive'} onClick={() => {
            fetch('/api/cart', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                productId: cartItem.productId
              })
            }).then((res) => {
              if (!res.ok) throw new Error('Network response was not ok')
              queryClient.invalidateQueries({queryKey: ['cart']})
              toast({
                title: 'Success',
                description: 'Item removed from cart',
              })
            })
          }}>
            <Trash2 />
          </Button>
        </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4 items-center">
        <span className="font-bold text-gray-600 text-2xl mr-2">
          Total: <span className="font-bold">{totalCost} $</span>
        </span>
        <Button size={'lg'} variant={'submit'}>
          Заказать
        </Button>
      </div>
    </div>
  );
}
