import * as React from "react";
import { useState } from "react";

interface StructTypeFieldProps {
  initialValue?: Root[] | undefined;
  fieldId: string;
}

export interface Root {
  property: Property[];
}

export interface Property {
  name: string;
  displayName: string;
  isRequired: boolean;
  typeId: string;
  type: Type;
}

export interface Type {
  stringType?: StringType;
  dateType?: DateType;
}

export interface StringType {
  stereotype: string;
  maxLength: number;
}

export interface DateType {}

const StructTypeField: React.FC<StructTypeFieldProps> = ({
  initialValue = undefined,
  fieldId,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  console.log(JSON.stringify(initialValue));
  console.log(JSON.stringify(fieldId));

  const handleClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };
  const handleCancel = () => {
    setIsEditMode(false);
  };
  return (
    <div className="flex flex-col gap-3">
      {isEditMode ? (
        <div>Edit Mode</div>
      ) : (
        initialValue &&
        initialValue.map((subItem: any, subIndex: any) => (
          <div
            key={subIndex}
            className="border-l pl-4 flex flex-col  gap-2 hover:cursor-pointer"
            onClick={handleClick}
          >
            {fieldId.property.map((item: any, index: any) => (
              <div key={index} className="flex flex-col text-[#374151]">
                <div className="font-bold ">{item.displayName}</div>
                <div>{subItem[item.name]}</div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default StructTypeField;
