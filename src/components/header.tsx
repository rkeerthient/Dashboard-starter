import * as React from "react";
import Cta from "../components/cta";
import { Image } from "@yext/sites-components";
type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = ({ _site }: any) => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <>
      <div className="">
        <nav className=" flex items-center justify-between">
          {/* <img
            src="https://cdn.fs.brandfolder.com/cache=expiry:604800/deY3VGFpSjC761Abjbfc"
            width="50"
            height="50"
          ></img> */}
          {/* <div className="text-2xl font-semibold">Turtlehead Tacos</div>
          <div className="flex gap-x-10 text-lg font-semibold">{linkDoms}</div>
          <div className="space-x-5">
            <Cta buttonText="Order Pickup" url="#" style="primary-cta"></Cta>
            <Cta
              buttonText="Order Delivery"
              url="#"
              style="secondary-cta"
            ></Cta> */}
          {/* </div> */}
          {_site.c_deskHeader && (
            <Image image={_site.c_deskHeader} className="w-full"></Image>
          )}{" "}
        </nav>
      </div>
    </>
  );
};

export default Header;
