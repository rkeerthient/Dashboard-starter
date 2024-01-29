import * as React from "react";
import { Image } from "@yext/sites-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

// Adjusted ClientStories component
export default function ClientStories(inpData: any) {
  let data = inpData.inpData;
  let clData = data.c_associatedClientStories;
  let title = inpData.title;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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
    <div className="!bg-[#025cae] !text-white">
      <div className="mx-auto px-8 py-16 pt-10">
        <div className="mx-auto text-center">
          <h2 className="text-3xl tracking-tight">
            {inpData.title || `Testimonials`}
          </h2>
          <p className="mt-2 text-lg  ">
            We have worked with thousands of amazing people
          </p>
        </div>
        <Slider {...settings}>
          {clData &&
            clData.map((testimonial: any, index: any) => (
              <div
                key={index}
                className="testimonial-card shadow-lg w-full mt-4"
              >
                <figure className="h-full rounded-2xl bg-gray-50 p-8 text-sm leading-6 flex flex-col shadow-md ">
                  <blockquote className="text-gray-900 h-48">
                    <p className="font-bold mb-2">{`“${testimonial.title}”`}</p>
                    <p>{`“${testimonial.description}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    {testimonial.photoGallery && (
                      <Image
                        className="h-10 !w-10 rounded-full bg-gray-50"
                        image={testimonial.photoGallery[0]}
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}
