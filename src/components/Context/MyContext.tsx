import {
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import * as React from "react";

interface PropertyData {
  isSuggestion: boolean;
  value: any;
}

interface MyContextData {
  [key: string]: PropertyData;
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
  const [data, setData] = useState<MyContextData>({});

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
