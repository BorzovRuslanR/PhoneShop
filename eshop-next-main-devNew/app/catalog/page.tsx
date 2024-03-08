import Catalog from "@/features/product/Catalog";
import { Suspense } from "react";


export default function CatalogPage() {

  return  <Suspense fallback='Loading...'>
      <Catalog/>
    </Suspense>
}
