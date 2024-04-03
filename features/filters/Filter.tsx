'use client';

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterManufacturer from './FilterManufacturer';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filter() {

    const router = useRouter();
    const [manufacturer, setManufacturer] = useState('0');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="submit">Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <FilterManufacturer 
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
           />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => {
              if (manufacturer === '0') return router.push(window.location.pathname);
              if(manufacturer) router.push(window.location.pathname + `?manufacturer=${manufacturer}`)
            }}>Apply</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button onClick={() => {
              router.push(window.location.pathname)
              setManufacturer('') 
            }}>Reset</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}


// onClick={() => {
//   const searchParams = []
//   if (manufacturer)
//     searchParams.push(`manufacturer=${manufacturer}`)                
//   if (manufacturer === "0")
//     return router.push(
//       window.location.pathname
//     );
//   if (manufacturer)
//     router.push(
//       window.location.pathname +
//         `?${searchParams.join("&")}`
//     );
// }}
