'use client';

import { Button } from '@/components/ui/button';
import { signIn, useSession, signOut } from 'next-auth/react';
import { ThemeToggler } from '@/components/ThemeToggler';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Cart, cartSchema } from '../cart/cart-schema';



export default function AppBarAuth() {
  const session = useSession();
  const router = useRouter();
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

  

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (cart) {
      const totalItems = cart.cart.length;
      setCartItemCount(totalItems);
    }
  }, [cart]);
  

  

  if (session.data?.user) {
    return (
      <div className='flex gap-4'>
        <div className="relative">
          <Button size={'icon'} onClick={() => {
            router.push('/cart');
          }}>
            <ShoppingCart />
          </Button>
          {cartItemCount > 0 && (
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemCount}
            </div>
          )}
        </div>
        <ThemeToggler />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session.data.user.image ?? undefined} alt={session.data.user.name ?? undefined} />
              <AvatarFallback>
                {session.data.user.email ? session.data.user.email.slice(0, 2).toUpperCase() : 'GO'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/profile'}>Profile</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/cart'}>Cart</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/orders'}>Orders</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/favorites'}>Favorites</Link></DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className='flex gap-4'>
      <ThemeToggler />
      <Button onClick={() => signIn()}>Login</Button>
      <Button onClick={() => signIn()}>Sing Up</Button>
    </div>
  );
}
