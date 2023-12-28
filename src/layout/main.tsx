import { TemplateRenderProps } from "@yext/pages/*";
import * as React from "react";
import { TemplateDataProvider } from "../common/useTemplateData";
import { MyContextProvider } from "../components/Context/MyContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreviewComp from "../components/DashboardComps/PreviewComp";

declare global {
  interface Window {
    YEXT_AUTH: { visitor: { externalId: string } };
  }
}

interface MainProps {
  data?: TemplateRenderProps<any>;
  children?: React.ReactNode;
}

const Main = (props: MainProps) => {
  return (
    <MyContextProvider>
      <MainInternal {...props} />
    </MyContextProvider>
  );
};

const MainInternal = (props: MainProps) => {
  const { children } = props;
  return (
    <TemplateDataProvider value={props.data}>{children}</TemplateDataProvider>
  );
};

export { Main };
