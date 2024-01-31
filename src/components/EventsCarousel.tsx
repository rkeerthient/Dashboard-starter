import { Image } from "@yext/react-components";
import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const EventsCarousel = (props: any) => {
  const { data } = props;
 
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
          <div key={index} className=" border flex flex-row">
            <div className="  flex-col flex justify-between leading-6 font-normal">
              <Image image={item.photoGallery[0]}></Image>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default EventsCarousel;
