'use client';

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



interface Props {
  imageUrls: string[];
}

class MultipleItems extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }


  render() {
    const { imageUrls } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      speed: 4000,
      slidesToShow: 3,
      slidesToScroll: 3,
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: "linear",
      accessibility: true,
      arrows: true,
    };

    return (
      <div className="w-auto h-auto mx-auto mt-6">
      <Slider {...settings} className="p-2 overflow-hidden">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="px-2 mt-20 relative">
            <div className="w-full h-0 pb-[90%] relative">
              <Image
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
    );
  }
}

export default MultipleItems;
