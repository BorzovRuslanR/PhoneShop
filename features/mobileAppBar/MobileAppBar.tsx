'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import AppBarAuth from '@/features/user/AppBarAuth'
import { LayoutDashboard, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuIcon } from "lucide-react"


export default function MobileAppBar() {
  return (
    <header className='flex gap-4 justify-between items-center h-16 py-2 shadow-md
     shadow-slate-600 dark:shadow-slate-100 px-10 w-full bg-slate-100 z-[40] border-b border-border fixed bottom-0 left-0 right-0 overflow-hidden max-h-full'>
        <div className='flex justify-between items-center container'>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
                <MenuIcon className='bg-slate-300'/>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>
                    <Link href={'/'}>
                      <div className='flex justify-center items-center'>
                        <Image
                          src={'/logo2.png'}
                          alt="Logo" width={100}
                          height={100}
                          style={{ color: 'inherit' }}
                        />
                      </div>
                    </Link>
                  </DrawerTitle>
                  <DrawerDescription><p className='flex justify-center items-center'>Next generation telephone shop</p></DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 mb-10">
                  <nav>
                    <ul className="flex flex-col gap-3 justify-center items-center">
                      <li className="bg-white text-sky-400 border border-sky-400 hover:text-white hover:bg-sky-400 hover:border-sky-400 font-bold py-2 px-4 rounded w-32 flex items-center justify-center">
                        <DrawerClose asChild>
                          <Link href="/" className="">Main page</Link>
                        </DrawerClose>
                      </li>
                      <li className="bg-white text-sky-400 border border-sky-400 hover:text-white hover:bg-sky-400 hover:border-sky-400 font-bold py-2 px-4 rounded w-32 flex items-center justify-center">
                        <DrawerClose asChild>
                          <Link href={'/contact'}>Contact</Link>
                        </DrawerClose>
                      </li>
                      <li className="bg-white text-sky-400 border border-sky-400 hover:text-white hover:bg-sky-400 hover:border-sky-400 font-bold py-2 px-4 rounded w-32 flex items-center justify-center">
                        <DrawerClose asChild>
                          <Link href={'/catalog'}>Catalog</Link>
                        </DrawerClose>
                      </li>
                    </ul>
                  </nav>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <AppBarAuth />
      </header>
  )
}
