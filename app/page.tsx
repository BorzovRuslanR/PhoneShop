
import SimpleSlider from "@/features/carousel/SimpleSlider";
import Catalog from "@/features/product/Catalog";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    manufacturer?: string;
  };
}) {
  const imageUrls = [
    "/banner1.png",
    "/banner2.webp",
    "/banner3.webp",
    "/banner4.png",
    "/banner5.png",
    "/banner6.png",
  ];

  return (
    <>
      <SimpleSlider imageUrls={imageUrls}/>
      <Suspense fallback='Loading...'>
        <Catalog searchParams={searchParams} />
      </Suspense>
    </>
  );
}
