import * as React from "react";
import { useState } from "react";
import TextBoxContainer from "./DashboardComps/FieldComponents.tsx/TextBoxContainer";
import LexicalMarkdownEditor from "./DashboardComps/LexicalRichText/LexicalMarkdownEditor";

interface StructTypeFieldProps {
  initialValue?: Root[] | undefined;
  structType: string[] | string;
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

const StructTypeField = ({
  initialValue,
  fieldId,
  structType,
}: StructTypeFieldProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [initValues, setInitValues] = useState(initialValue);

  const booleanData = [
    {
      displayName: "Yes",
      textValue: true,
    },
    {
      displayName: "No",
      textValue: false,
    },
  ];
  const handleClick = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };
  const handleCancel = () => {
    setIsEditMode(false);
  };
  const handleStructChange = (val: any) => {
    setInitValues(val);
  };
  const handleEdit = (val: any) => {
    setIsEditMode(val);
  };
  return (
    <div className="flex flex-col gap-3">
      {isEditMode ? (
        <TextBoxContainer
          fieldId={fieldId}
          properties={structType.property}
          initialValue={initialValue}
          setInitialValues={handleStructChange}
          editMode={handleEdit}
        />
      ) : (
        <div
          className=" flex flex-col gap-2 hover:cursor-pointer"
          onClick={handleClick}
        >
          {initValues ? (
            initValues.map((subItem: any, subIndex: any) => (
              <div
                key={subIndex}
                className="flex flex-col text-[#374151] border-l pl-4"
              >
                {structType.property.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <div className="font-bold">{item.displayName}</div>
                      <div>
                        {item.typeId === "richText" ? (
                          <LexicalMarkdownEditor
                            serializedAST={subItem[item.name]}
                          />
                        ) : item.typeId === "boolean" ? (
                          booleanData.find(
                            (option) => option.textValue === subItem[item.name]
                          )?.displayName
                        ) : item.typeId === "list" ? (
                          subItem[item.name].map((item: string) => (
                            <div>{item}</div>
                          ))
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
            <div>Click to add</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StructTypeField;
