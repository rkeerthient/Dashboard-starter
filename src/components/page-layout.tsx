import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { isLocal } from "../utils/isLocal";
import { getRuntime } from "@yext/pages/util";
import { useEffect, useState } from "react";
import { useMyContext } from "./Context/MyContext";
import { UserProfile } from "../types/user_profile";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  const runtime = getRuntime();
  const { setUserRole } = useMyContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = isLocal()
    ? "2676513"
    : runtime.name === "browser" && window?.YEXT_AUTH?.visitor?.externalId
    ? window.YEXT_AUTH.visitor.externalId
    : "";

  useEffect(() => {
    const getUserRole = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userResp: UserProfile = await response.json();
        console.log(JSON.stringify(userResp));

        try {
          if (
            userResp.acl &&
            userResp.acl.length > 0 &&
            userResp.acl[0].roleId
          ) {
            setUserRole(userResp.acl[0].roleId);
          } else {
            console.error("User data is incomplete or roleId is missing");
          }
        } catch (error) {
          console.error(`Error processing user data: ${JSON.stringify(error)}`);
        }
      } catch (error) {
        console.error(`Error fetching user data: ${JSON.stringify(error)}`);
      } finally {
        setIsLoading(false);
      }
    };

    getUserRole();
  }, [userId]);

  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      {isLoading ? (
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      ) : (
        children
      )}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
