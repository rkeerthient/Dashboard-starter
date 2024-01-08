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
  Address,
  C_awardsDashboard,
  C_designations,
  C_educationDisplay,
  ComplexImage,
  Coordinate,
  Hours,
} from "../../types/financial_professionals";
import { UserProfile } from "../../types/user_profile";

interface MyContextData {
  name: {
    value: string;
    isEdited: boolean;
  };
  mainPhone: {
    value: string;
    isEdited: boolean;
  };
  emails: {
    value: string;
    isEdited: boolean;
  };
  c_template: {
    value: string;
    isEdited: boolean;
  };
  c_color: {
    value: string;
    isEdited: boolean;
  };
  c_fonts: {
    value: string;
    isEdited: boolean;
  };
  photoGallery: {
    value: ComplexImage[];
    isEdited: boolean;
  };
  c_preferredFirstName: {
    value: string;
    isEdited: boolean;
  };
  c_jobTitle: {
    value: string;
    isEdited: boolean;
  };
  c_clientFocuses: {
    value: string[];
    isEdited: boolean;
  };
  c_aboutAdvisorShortDescription: {
    value: string;
    isEdited: boolean;
  };
  c_expertiseCommentsRTv2: {
    value: string;
    isEdited: boolean;
  };
  c_hobbiesAndInterests: {
    value: string[];
    isEdited: boolean;
  };
  c_teamDescriptionRTv2: {
    value: any;
    isEdited: boolean;
  };
  c_languagesV2: {
    value: string[];
    isEdited: boolean;
  };
  c_educationDisplay: {
    value: C_educationDisplay[];
    isEdited: boolean;
  };
  c_heroBanner: {
    value: string;
    isEdited: boolean;
  };
  c_associatedBlogs: {
    value: any[];
    isEdited: boolean;
  };
  hours: {
    value: Hours;
    isEdited: boolean;
  };
  address: {
    value: Address;
    isEdited: boolean;
  };
  geocodedCoordinate: {
    value: Coordinate;
    isEdited: boolean;
  };
  _site: {
    value: any;
    isEdited: boolean;
  };
  c_designations: {
    value: C_designations[];
    isEdited: boolean;
  };
  c_organizationsDisplay: {
    value: string[];
    isEdited: boolean;
  };
  c_awardsDashboard: {
    value: C_awardsDashboard[];
    isEdited: boolean;
  };
  c_teamName: {
    value: string;
    isEdited: boolean;
  };
  c_teamMembers: {
    value: any[];
    isEdited: boolean;
  };
  c_serviceAreas: {
    value: any[];
    isEdited: boolean;
  };
}

type DataKeys = keyof MyContextData;

interface MyContext {
  userRole: UserProfile;
  setUserRole: Dispatch<SetStateAction<UserProfile>>;
  data: MyContextData;
  setData: <K extends keyof MyContextData>(
    key: K,
    value:
      | string
      | ComplexImage[]
      | any
      | Hours
      | Address
      | Coordinate
      | C_educationDisplay[]
      | C_designations[]
      | C_awardsDashboard[]
      | boolean,
    isEdited?: boolean
  ) => void;
}

const MyContext = createContext<MyContext | undefined>(undefined);

export const useMyContext = (): MyContext => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

const generateInitialState = (): MyContextData => {
  const initialState: MyContextData = {
    name: {
      value: "",
      isEdited: false,
    },
    mainPhone: {
      value: "",
      isEdited: false,
    },
    emails: {
      value: "",
      isEdited: false,
    },
    c_template: {
      value: "",
      isEdited: false,
    },
    c_color: {
      value: "",
      isEdited: false,
    },
    c_fonts: {
      value: "",
      isEdited: false,
    },
    photoGallery: {
      value: [],
      isEdited: false,
    },
    c_preferredFirstName: {
      value: "",
      isEdited: false,
    },
    c_jobTitle: {
      value: "",
      isEdited: false,
    },
    c_clientFocuses: {
      value: [],
      isEdited: false,
    },
    c_aboutAdvisorShortDescription: {
      value: "",
      isEdited: false,
    },
    c_expertiseCommentsRTv2: {
      value: "",
      isEdited: false,
    },
    c_hobbiesAndInterests: {
      value: [],
      isEdited: false,
    },
    c_teamDescriptionRTv2: {
      value: undefined,
      isEdited: false,
    },
    c_languagesV2: {
      value: [],
      isEdited: false,
    },
    c_educationDisplay: {
      value: [],
      isEdited: false,
    },
    c_heroBanner: {
      value: "",
      isEdited: false,
    },
    c_associatedBlogs: {
      value: [],
      isEdited: false,
    },
    hours: {
      value: {},
      isEdited: false,
    },
    address: {
      value: {},
      isEdited: false,
    },
    geocodedCoordinate: {
      value: {},
      isEdited: false,
    },
    _site: {
      value: {},
      isEdited: false,
    },
    c_designations: {
      value: [],
      isEdited: false,
    },
    c_organizationsDisplay: {
      value: [],
      isEdited: false,
    },
    c_awardsDashboard: {
      value: [],
      isEdited: false,
    },
    c_teamName: {
      value: "",
      isEdited: false,
    },
    c_teamMembers: {
      value: [],
      isEdited: false,
    },
    c_serviceAreas: {
      value: [],
      isEdited: false,
    },
  };

  return initialState;
};

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserProfile>({} as UserProfile);
  const [data, setData] = useState<MyContextData>(generateInitialState);
  const updateData = <K extends DataKeys>(
    key: K,
    value: any,
    isEdited: boolean = false
  ) => {
    setData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        value,
        isEdited,
      },
    }));
  };
  return (
    <MyContext.Provider
      value={{
        userRole,
        setUserRole,
        data,
        setData: updateData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
