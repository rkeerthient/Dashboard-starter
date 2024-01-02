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
  document?: any;
};

const PageLayout = ({ _site, children, document }: Props) => {
  const runtime = getRuntime();
  const { setUserRole, setData } = useMyContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = isLocal()
    ? "2676513"
    : runtime.name === "browser" && window?.YEXT_AUTH?.visitor?.externalId
    ? window.YEXT_AUTH.visitor.externalId
    : "";

  useEffect(() => {
    setIsLoading(true);
    if (document) {
      const {
        name,
        mainPhone,
        emails,
        c_template,
        c_color,
        c_fonts,
        c_preferredFirstName,
        c_jobTitle,
        c_clientFocuses,
        c_aboutAdvisorShortDescription,
        c_expertiseCommentsRTv2,
        c_hobbiesAndInterests,
        c_teamNameAndSite,
        c_languagesV2,
        c_educationDisplay,
        c_heroBanner,
        c_associatedBlogs,
        photoGallery,
        hours,
        address,
        geocodedCoordinate,
      } = document;

      setData((prevData) => ({
        ...prevData,
        ...(name && { name }),
        ...(mainPhone && { mainPhone }),
        ...(emails && { emails }),
        ...(c_template && { c_template }),
        ...(c_color && { c_color }),
        ...(c_fonts && { c_fonts }),
        ...(c_preferredFirstName && { c_preferredFirstName }),
        ...(c_jobTitle && { c_jobTitle }),
        ...(c_clientFocuses && { c_clientFocuses }),
        ...(c_aboutAdvisorShortDescription && {
          c_aboutAdvisorShortDescription,
        }),
        ...(photoGallery && { photoGallery }),
        ...(c_expertiseCommentsRTv2 && { c_expertiseCommentsRTv2 }),
        ...(c_hobbiesAndInterests && { c_hobbiesAndInterests }),
        ...(c_teamNameAndSite && { c_teamNameAndSite }),
        ...(c_languagesV2 && { c_languagesV2 }),
        ...(c_educationDisplay && { c_educationDisplay }),
        ...(c_heroBanner && { c_heroBanner }),
        ...(c_associatedBlogs && { c_associatedBlogs }),
        ...(hours && { hours }),
        ...(address && { address }),
        ...(geocodedCoordinate && { geocodedCoordinate }),
      }));
    }
    setIsLoading(false);
  }, [document]);

  useEffect(() => {
    setIsLoading(true);
    const getUserRole = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/users/${userId}`);
          const userResp = await response.json();
          const userString: UserProfile = await userResp.response;
          setUserRole(await userString.acl[0].roleId);
        }
      } catch (error: any) {
        console.log(`Error fetching user data: ${JSON.stringify(error)}`);
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
