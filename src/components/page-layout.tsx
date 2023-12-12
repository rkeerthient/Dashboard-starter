import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { isLocal } from "../utils/isLocal";
import { getRuntime } from "@yext/pages/util";
import { useEffect } from "react";
import { useMyContext } from "./Context/MyContext";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  const runtime = getRuntime();
  const { setUserRole } = useMyContext();

  const userId = isLocal()
    ? "2676513"
    : runtime.name === "browser" && window?.YEXT_AUTH?.visitor?.externalId
    ? window.YEXT_AUTH.visitor.externalId
    : "";
  console.log(userId);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        console.log(JSON.stringify(await response));
      } catch (error) {
        console.error(
          `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
          error
        );
      }
    };

    !isLocal() && getUserRole();
  }, [userId]);

  // useEffect(() => {
  //   setUserRole(userRole);
  // }, [userRole]);
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      {children}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
