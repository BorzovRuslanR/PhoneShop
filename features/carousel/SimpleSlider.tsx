'use client';

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
    imageUrls: string[];
  }
  
  class SimpleSlider extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
      this.state = {};
    }
    render() {
        const { imageUrls } = this.props;
    
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 6000,
            cssEase: "linear"
          };


  return (
    <div className="flex items-center justify-center top-10">
      <Slider {...settings} className="w-[380px] sm:w-[420px] md:w-[700px] lg:w-[1200px] xl:[1400px]">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="w-full">
            <div className="relative h-64 sm:h-96">
              <Image
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="contain"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
}

export default SimpleSlider;