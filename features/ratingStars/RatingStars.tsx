"use client";

import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAddToRating } from "./use-rating";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

export default function RatingStars({ product }: Props) {
  const [rating, setRating] = useState<number | null>(product.ratingAverage);
  const [hover, setHover] = useState<number | null>(null);
  const { mutate: addToRating } = useAddToRating();
  const queryClient = useQueryClient();

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              className="hidden"
            />
            <FaStar
              onClick={() => {
                console.log("Onclick");
                addToRating({
                  rating: currentRating,
                  productId: product.id,
                })
              }}
              className={`cursor-pointer text-gray-400 ${getStarSize()}`}
              color={
                currentRating <=
                (hover !== null ? hover : rating !== null ? rating : 0)
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );

  function getStarSize() {
    return "text-[20px] sm:text-[15px] md:text-[20px] lg:text-[20px] xl:text-[28px]";
  }
}
