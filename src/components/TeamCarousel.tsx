import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/sites-components";

const TeamCarousel = (props: any) => {
  const { data } = props;
  console.log(JSON.stringify(data));

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: props.slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data &&
        data.map((item: any, index: any) => (
          <div key={index} className="p-4 border flex flex-row">
            <Image image={item}></Image>
          </div>
        ))}
    </Slider>
  );
};

export default TeamCarousel;
