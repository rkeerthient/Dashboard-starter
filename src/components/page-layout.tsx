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
  console.log("entered" + JSON.stringify(window?.YEXT_AUTH));

  const userId = isLocal()
    ? "2676513"
    : runtime.name === "browser" && window?.YEXT_AUTH?.visitor?.externalId
    ? window.YEXT_AUTH.visitor.externalId
    : "";

  useEffect(() => {
    const getUserRole = async () => {
      console.log(userId);
      try {
        const response = await fetch(`/api/users/${userId}`);
        console.log(JSON.stringify(await response.json()));
      } catch (error) {
        console.error(
          `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
          error
        );
      }
    };

    getUserRole();
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
