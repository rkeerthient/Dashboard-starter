import {
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import * as React from "react";
import {
  C_educationDisplay,
  C_teamNameAndSite,
  ComplexImage,
  Hours,
} from "../../types/financial_professionals";

interface MyContextData {
  name: string;
  mainPhone: string;
  emails: string;
  c_template: string;
  c_color: string;
  c_fonts: string;
  photoGallery: ComplexImage[];
  c_preferredFirstName: string;
  c_jobTitle: string;
  c_clientFocuses: string[];
  c_aboutAdvisorShortDescription: string;
  c_expertiseCommentsRTv2: string;
  c_hobbiesAndInterests: string[];
  c_teamNameAndSite: C_teamNameAndSite[];
  c_languagesV2: string[];
  c_educationDisplay: C_educationDisplay[];
  c_heroBanner: string;
  c_associatedBlogs: any[];
  hours: Hours;
}

interface MyContext {
  userRole: string;
  setUserRole: Dispatch<SetStateAction<string>>;
  data: MyContextData;
  setData: Dispatch<SetStateAction<MyContextData>>;
}

const MyContext = createContext<MyContext | undefined>(undefined);

export const useMyContext = (): MyContext => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [userRole, setUserRole] = useState<string>("");
  const [data, setData] = useState<MyContextData>({
    name: "",
    mainPhone: "",
    emails: "",
    c_template: "",
    c_color: "",
    c_fonts: "",
    c_preferredFirstName: "",
    c_jobTitle: "",
    c_clientFocuses: [],
    c_aboutAdvisorShortDescription: "",
    c_expertiseCommentsRTv2: "",
    c_hobbiesAndInterests: [],
    c_teamNameAndSite: [],
    c_languagesV2: [],
    c_educationDisplay: [],
    c_heroBanner: "",
    c_associatedBlogs: [],
    photoGallery: [],
    hours: {},
  });

  return (
    <MyContext.Provider
      value={{
        userRole,
        setUserRole,
        data,
        setData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
