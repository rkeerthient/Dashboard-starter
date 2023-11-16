import * as React from "react";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import MarkdownView from "react-showdown";
import { FiEdit } from "react-icons/fi";
import UIPicker from "./UIPicker";
import { Root } from "../../types/fieldSchema";
import { EnumData } from "../EnumData";
import Slider from "./FieldsUI/Slider";

const Subtasks = ({ subItem, document }: any) => {
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const getFieldConfig = async (fieldId: string) => {
    try {
      const response = await fetch(`/api/fields/${fieldId}/getFields`);
      let json: Root = await response.json();

      if (
        json.response.type.listType &&
        json.response.type.listType.typeId.includes("c_") &&
        response.ok
      ) {
        const listTypeResponse = await fetch(
          `/api/fields/${json.response.type.listType.typeId}/getFields`
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

  const handleMouseOver = () => {
    if (!isEditing) {
      setIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
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
      <div className="flex flex-row justify-between p-3 items-center  border-b">
        <div className="font-semibold text-[#5a6370] w-1/4">
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
        </div>

        <div
          className={`w-3/4 flex justify-between px-4 py-3 ${
            isHover || isEditing ? "bg-containerBG" : "bg-white"
          } ${isEditing ? "cursor-default" : "cursor-pointer"}`}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {!isEditing ? (
            <>
              {subItem.slider ? (
                <div className="w-full">
                  <Slider
                    value={parseInt(document[subItem.field]) || 0}
                    highLabel={subItem.sliderHighText}
                    lowLabel={subItem.sliderLowText}
                  />
                </div>
              ) : (
                <div
                  className="w-full flex justify-between"
                  onClick={() => {
                    getFieldConfig(subItem.field),
                      setIsLoading(true),
                      setIsEditing(true);
                  }}
                >
                  <div>
                    {(document[subItem.field] &&
                    Array.isArray(document[subItem.field])
                      ? document[subItem.field].map(
                          (item: string, index: number) =>
                            item.includes("_") &&
                            item === item.toUpperCase() ? (
                              <div key={index}>{EnumData[item]}</div>
                            ) : (
                              <div key={index}>{item}</div>
                            )
                        )
                      : document[subItem.field]) || `Click me!`}
                  </div>
                  <FiEdit
                    className={`h-4 w-4 ${isHover ? `visible` : `invisible`}`}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                <UIPicker
                  fieldSchema={data}
                  initialValue={document[subItem.field]}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subtasks;
