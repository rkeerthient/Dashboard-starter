import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { isLocal } from "../utils/isLocal";
import { getRuntime } from "@yext/pages/util";
import { useEffect, useState } from "react";
import { useMyContext } from "./Context/MyContext";
import { UserProfile } from "../types/user_profile";
import { io } from "socket.io-client";
const socket = io("http://localhost:5175");
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
    setIsLoading(true);
    const getUserRole = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userResp = await response.json();
        const userString: UserProfile = await userResp.response;
        setUserRole(await userString.acl[0].roleId);
      } catch (error: any) {
        console.log(`Error fetching user data: ${JSON.stringify(error)}`);
      } finally {
        setIsLoading(false);
      }
    };

    getUserRole();
  }, [userId]);

  const sendMessage = () => {
    socket.emit("send_message", { message: "hello world!" });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data);
    });
  }, [socket]);
  return (
    <div className="min-h-screen">
      <button onClick={sendMessage}>Send Message</button>
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
