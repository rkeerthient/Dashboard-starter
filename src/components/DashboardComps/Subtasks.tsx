import * as React from "react";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import MarkdownView from "react-showdown";

const Subtasks = ({ subItem, document }: any) => {
  const getFieldConfig = async (fieldId: string) => {
    const response = await fetch(`/api/fields/${fieldId}/getFields`);
    const json = await response.json();
    console.log(json);
  };

  const [showTooltip, setShowTooltip] = useState(false);

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
      <div className="grid grid-cols-2 justify-between p-3 items-center  border-b">
        <div className="font-semibold text-[#5a6370]">
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
          onClick={() => getFieldConfig(subItem.field)}
          className="border hover:cursor-pointer"
        >
          {document[subItem.field] || `Click me!`}
        </div>
      </div>
    </div>
  );
};

export default Subtasks;
