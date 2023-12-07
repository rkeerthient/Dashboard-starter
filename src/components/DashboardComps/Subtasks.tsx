import * as React from "react";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import MarkdownView from "react-showdown";
import UIPicker from "./UIPicker";
import { Root } from "../../types/fieldSchema";

const Subtasks = ({ subItem, document }: any) => {
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [isList, setIsList] = useState(false);
  const [type, setType] = useState("");

  const getFieldConfig = async (fieldId: string) => {
    try {
      const response = await fetch(`/api/fields/${fieldId}/getFields`);
      let json: Root = await response.json();
      json.response.typeId === "list" && setIsList(true);

      if (
        json.response.type.listType &&
        json.response.type.listType.typeId.includes("c_") &&
        response.ok
      ) {
        const listTypeResponse = await fetch(
          `/api/fields/${json.response.type.listType.typeId}/getFieldTypes`
        );

        if (listTypeResponse.ok) {
          json = await listTypeResponse.json();
        } else {
          console.error(
            `Failed to fetch list type for field ${fieldId}: ${listTypeResponse.status}`
          );
        }
      }
      setData(json);
      setIsLoading(false);
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${fieldId}:`,
        error
      );
      setIsLoading(false);
    }
  };

  return (
    <div>
      {subItem.newSectionHeading && (
        <div className="bg-[#3a4856] text-sm p-3 font-semibold text-white">
          {subItem.newSectionHeading}
        </div>
      )}
      {subItem.question && (
        <MarkdownView
          className="text-headerBG font-semibold p-3 border-b"
          markdown={subItem.question}
          options={{ tables: true, emoji: true }}
        />
      )}
      <div className="flex flex-row justify-between items-center">
        <div className="font-semibold text-[#5a6370] w-1/4">
          <div className="flex flex-col gap-1">
            <div className="flex  gap-2 items-center relative">
              {subItem.description && (
                <>
                  <HiOutlineInformationCircle
                    className="h-4 w-4"
                    onMouseLeave={() => setShowTooltip(false)}
                    onMouseEnter={() => setShowTooltip(true)}
                  />
                  {showTooltip && (
                    <div
                      className={`absolute z-20 left-5 text-xs w-4/5 bg-bgTooltip text-white p-3`}
                    >
                      {subItem.description}
                    </div>
                  )}
                </>
              )}
              <div>{subItem.name}</div>
            </div>
            <div className="text-xs text-[#c6ccd1]">{subItem.field}</div>
          </div>
        </div>

        <div className={`w-3/4 flex justify-between`}>
          {isLoading ? (
            <div
              className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          ) : (
            <UIPicker
              minText={subItem.sliderLowText}
              maxText={subItem.sliderHighText}
              isSlider={subItem.slider}
              subItemField={subItem.field}
              initialValue={document[subItem.field]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Subtasks;
