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
          {_site.c_deskHeader && (
            <Image image={_site.c_deskHeader} className="w-full"></Image>
          )}{" "}
        </nav>
      </div>
    </>
  );
};

export default Header;
