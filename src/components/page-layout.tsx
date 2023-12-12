import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { isLocal } from "../utils/isLocal";
import { useMyContext } from "./Context/MyContext";
import { getRuntime } from "@yext/pages/util";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  const runtime = getRuntime();
  const userRole = isLocal()
    ? "2676513"
    : runtime.name === "browser" && window?.YEXT_AUTH?.visitor?.externalId
    ? window.YEXT_AUTH.visitor.externalId
    : "";
  const { setUserRole } = useMyContext();

  React.useEffect(() => {
    setUserRole(userRole);
  }, [userRole]);
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      {children}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
