import { Image } from "@yext/react-components";
import * as React from "react";
export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name: string;
  address?: Address;
  openTime?: string;
  children?: React.ReactNode;
  bannerImg: string;
  mainPhone: string;
  title: string;
  headshot: any;
  showPopUp: (value: boolean) => void;
};

const Banner = (props: Banner) => {
  const { name, children, bannerImg, mainPhone, headshot, title, showPopUp } =
    props;

  return (
    <>
      <div className="relative h-auto">
        {bannerImg && (
          <div
            className="bg-cover bg-center "
            style={{
              backgroundImage: `url("${bannerImg.url}")`,
              height: "500px",
            }}
          ></div>
        )}
        <div className="h-full w-full absolute top-0 left-0 z-2">
          <div className=" w-full absolute  text-[#003168] flex items-center justify-center flex-col h-full ">
            <div className="relative text-center w-full">
              <div className="absolute top-1/2 left-[20%] -translate-y-1/2 -translate-x-[20%]">
                <div className="font-medium">
                  <div className="flex gap-6">
                    <div>
                      {headshot && (
                        <Image
                          className="inline-block !w-32 rounded-full"
                          image={headshot}
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3 font-semibold !text-xl text-left">
                      <div>{name}</div>
                      <div>{title}</div>
                      <div>
                        {mainPhone &&
                          mainPhone
                            .replace("+1", "")
                            .replace(/\D+/g, "")
                            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                      </div>{" "}
                      <div
                        onClick={(e) => showPopUp(true)}
                        className="w-fit hover:cursor-pointer text-center px-6 py-2 border-[#002750] border text-[#002750] bg-white text-sm"
                      >
                        Contact Us
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Banner;
