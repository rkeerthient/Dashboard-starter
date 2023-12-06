import * as React from "react";
import { useEffect, useState } from "react";
import { Root } from "../../types/fieldSchema";
import DateField from "./FieldComponents.tsx/DateField";
import PicklistField from "./FieldComponents.tsx/PicklistField";
import TextField from "./FieldComponents.tsx/TextField";
import MultiPicklistField from "./FieldComponents.tsx/MultiPicklistField";
import StructTypeField from "../StructTypeField";
import Slider from "./FieldComponents.tsx/Slider";
import TextBoxList from "./ListsUI/TextboxList";
import ImageField from "./FieldComponents.tsx/ImageField";
import RichTextField from "./FieldComponents.tsx/RichTextField";

interface UIPickerProps {
  subItemField: string;
  initialValue?: string;
  isSlider?: boolean;
  minText?: string;
  maxText?: string;
}

const UIPicker = ({
  subItemField,
  initialValue,
  isSlider = false,
  minText,
  maxText,
}: UIPickerProps) => {
  const [mainFieldSchema, setMainFieldSchema] = useState<Root | undefined>();
  const [subFieldSchema, setSubFieldSchema] = useState<Root | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getFieldConfig = async (fieldId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/fields/${fieldId}/getFields`);

        if (!isMounted) {
          return;
        }

        const mainJson: Root = await response.json();
        setMainFieldSchema(mainJson);

        if (
          mainJson.response.type.listType &&
          mainJson.response.type.listType.typeId.includes("c_")
        ) {
          const listTypeResponse = await fetch(
            `/api/fields/${mainJson.response.type.listType.typeId}/getFieldTypes`
          );
          if (!isMounted) {
            return;
          }
          const subJson: Root = await listTypeResponse.json();
          setSubFieldSchema(subJson);
        }
      } catch (error) {
        console.error(
          `Failed to fetch field configuration for ${fieldId}:`,
          error
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getFieldConfig(subItemField);

    return () => {
      isMounted = false;
    };
  }, [subItemField]);

  return (
    <>
      {isLoading && (
        <div className="px-4 py-3 ">
          <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      )}
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
                        textValue: true,
                      },
                      {
                        displayName: "No",
                        textValue: false,
                      },
                    ]}
                  />
                );
              case "string":
                return (
                  <TextField
                    initialValue={initialValue}
                    fieldId={mainFieldSchema.response.$id}
                  />
                );
              case "date":
                return (
                  <DateField
                    initialValue={initialValue}
                    fieldId={mainFieldSchema.response.$id}
                  />
                );
              case "decimal":
                return isSlider ? (
                  <Slider
                    fieldId={mainFieldSchema.response.$id}
                    value={initialValue}
                    highLabel={maxText}
                    lowLabel={minText}
                  />
                ) : (
                  <TextField
                    initialValue={initialValue}
                    fieldId={mainFieldSchema.response.$id}
                  />
                );
              case "richTextV2":
                return (
                  <RichTextField
                    fieldId={mainFieldSchema.response.$id}
                    initialValue={JSON.stringify(initialValue)}
                  />
                );
              case "richText":
                return (
                  <RichTextField
                    fieldId={mainFieldSchema.response.$id}
                    initialValue={initialValue}
                  />
                );
              case "image":
                return (
                  <ImageField
                    initialValue={initialValue}
                    fieldId={mainFieldSchema.response.$id}
                  />
                );
              case "list":
                return mainFieldSchema.response.type.listType.typeId ===
                  "option" ? (
                  <MultiPicklistField
                    initialValue={initialValue}
                    options={
                      mainFieldSchema.response.type.listType.type.optionType
                        .option
                    }
                    fieldId={mainFieldSchema.response.$id}
                  />
                ) : mainFieldSchema.response.type.listType.typeId ===
                  "string" ? (
                  <TextBoxList
                    fieldId={mainFieldSchema.response.$id}
                    initialValue={initialValue}
                  />
                ) : mainFieldSchema.response.type.listType.typeId ===
                  "image" ? (
                  <ImageField
                    initialValue={initialValue}
                    fieldId={mainFieldSchema.response.$id}
                  />
                ) : (
                  subFieldSchema &&
                  subFieldSchema.response.type.structType && (
                    <StructTypeField
                      initialValue={initialValue}
                      fieldId={mainFieldSchema.response.$id}
                      structType={subFieldSchema.response.type.structType}
                    />
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
