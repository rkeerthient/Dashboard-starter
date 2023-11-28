import * as React from "react";
import { useState } from "react";
import TextBoxContainer from "./DashboardComps/FieldComponents.tsx/TextBoxContainer";
import CustomEditor from "./DashboardComps/LexicalRichText/CustomEditor";

interface StructTypeFieldProps {
  initialValue?: Root[] | undefined;
  fieldId: string[] | string;
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
  initialValue,
  fieldId,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

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
        <div>
          <TextBoxContainer
            properties={fieldId}
            initialValue={initialValue}
          ></TextBoxContainer>
        </div>
      ) : initialValue ? (
        initialValue.map((subItem: any, subIndex: any) => (
          <div
            key={subIndex}
            className="border-l pl-4 flex flex-col  gap-2 hover:cursor-pointer"
            onClick={handleClick}
          >
            {fieldId.property.map((item: any, index: any) => {
              return (
                <div key={index} className="flex flex-col text-[#374151]">
                  <div className="font-bold ">{item.displayName}</div>
                  <div>
                    {item.name === "answer" ? (
                      <CustomEditor serializedAST={subItem[item.name]} />
                    ) : (
                      subItem[item.name]
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))
      ) : (
        <div>Click me</div>
      )}
    </div>
  );
};

export default StructTypeField;
