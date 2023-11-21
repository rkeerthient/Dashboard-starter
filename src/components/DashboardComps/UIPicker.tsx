import * as React from "react";
import { useEffect, useState } from "react";
import { Root } from "../../types/fieldSchema";
import DateField from "./FieldComponents.tsx/DateField";
import PicklistField from "./FieldComponents.tsx/PicklistField";
import TextField from "./FieldComponents.tsx/TextField";
import MultiPicklistField from "./FieldComponents.tsx/MultiPicklistField";
import StructTypeField from "./FieldComponents.tsx/StructTypeField";
import Slider from "./FieldComponents.tsx/Slider";
import TextBoxContainer from "./FieldComponents.tsx/TextBoxContainer";

interface UIPickerProps {
  subItemField: string;
  initialValue?: string;
}

const UIPicker = ({ subItemField, initialValue }: UIPickerProps) => {
  const [mainFieldSchema, setMainFieldSchema] = useState<Root | undefined>();
  const [subFieldSchema, setSubFieldSchema] = useState<Root | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFieldConfig = async (fieldId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/fields/${fieldId}/getFields`);
        const mainJson: Root = await response.json();
        setMainFieldSchema(mainJson);

        if (
          mainJson.response.type.listType &&
          mainJson.response.type.listType.typeId.includes("c_")
        ) {
          const listTypeResponse = await fetch(
            `/api/fields/${mainJson.response.type.listType.typeId}/getFieldTypes`
          );
          const subJson: Root = await listTypeResponse.json();
          setSubFieldSchema(subJson);
        }
      } catch (error) {
        console.error(
          `Failed to fetch field configuration for ${fieldId}:`,
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    getFieldConfig(subItemField);
  }, [subItemField]);

  return (
    <>
      {isLoading && <div className="px-4 py-3 ">Loading...</div>}
      {!isLoading && mainFieldSchema && (
        <div className=" w-full px-4 py-3">
          {(() => {
            switch (mainFieldSchema.response.typeId) {
              case "option":
                return (
                  <PicklistField
                    fieldId={mainFieldSchema.response.$id}
                    initialValue={initialValue}
                    options={mainFieldSchema.response.type.optionType.option}
                  />
                );
              case "boolean":
                return (
                  <PicklistField
                    fieldId={mainFieldSchema.response.$id}
                    initialValue={initialValue}
                    options={[
                      {
                        displayName: "Yes",
                        textValue: "Yes",
                      },
                      {
                        displayName: "No",
                        textValue: "No",
                      },
                    ]}
                  />
                );
              case "string":
                return <TextField initialValue={initialValue} fieldId={""} />;
              case "date":
                return <DateField initialValue={initialValue} />;
              case "slider":
                return <Slider />;
              case "list":
                return mainFieldSchema.response.type.listType.typeId ===
                  "option" ? (
                  <MultiPicklistField
                    initialValue={initialValue}
                    options={
                      mainFieldSchema.response.type.listType.type.optionType
                        .option
                    }
                    fieldId={""}
                  />
                ) : (
                  subFieldSchema.response.type.structType && (
                    <TextBoxContainer
                      properties={
                        subFieldSchema.response.type.structType.property
                      }
                    ></TextBoxContainer>
                    // <StructTypeField
                    //   initialValue={initialValue}
                    //   fieldId={subFieldSchema.response.type.structType}
                    // />
                  )
                );
              default:
                return null;
            }
          })()}
        </div>
      )}
    </>
  );
};

export default UIPicker;
