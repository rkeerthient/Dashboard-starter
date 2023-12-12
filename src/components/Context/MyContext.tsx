import { createContext, useContext, useState } from "react";
import * as React from "react";

interface MyContext {
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
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
  children: React.ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [userRole, setUserRole] = useState<string>("");

  return (
    <MyContext.Provider
      value={{
        userRole,
        setUserRole,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
