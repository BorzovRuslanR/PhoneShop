'use client';

import React from 'react'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function RatingStars(props: { rating: number, productId: number }) {
  const { rating: initialRating, productId } = props; 
  const [rating, setRating] = useState<number | null>(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  function updateRating(newRating: number) { 
    fetch('/api/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: newRating,
        productId: productId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRating(newRating);
        } else {
          console.error('Failed to update product rating:', data.error);
        }
      })
      .catch((error) => {
        console.error('Failed to update product rating:', error);
      });
  }


  return (
    <div className='flex'>
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
            return (
              <label key={index}>
                <input 
                  type="radio" 
                  name="rating"
                  value={currentRating}
                  className="hidden"
                  onClick={() => updateRating(currentRating)}
                />
                <FaStar
                  className={`cursor-pointer text-gray-400 ${getStarSize()}`}
                  color={(currentRating <= (hover !== null ? hover : (rating !== null ? rating : 0))) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(currentRating) }
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
        })}
        
    </div>
  );

  function getStarSize() {
    return 'text-[20px] sm:text-[15px] md:text-[20px] lg:text-[20px] xl:text-[28px]';
  }    

}
