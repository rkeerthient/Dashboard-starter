import * as React from "react";
import { Image } from "@yext/sites-components";
const Footer = ({ _site }: any) => {
  return (
    <Image image={_site.c_deskFooter} className="w-full !max-w-none"></Image>
  );
};

export default Footer;
