import * as React from "react";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import MarkdownView from "react-showdown";

const Subtasks = ({ subItem }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { question, field, name, description, newSectionHeading } = subItem;

  return (
    <div>
      {newSectionHeading && (
        <div className="bg-[#3a4856] text-sm p-3 font-semibold text-white">
          {newSectionHeading}
        </div>
      )}
      {question && (
        <MarkdownView
          className="text-headerBG font-semibold p-3 border-b"
          markdown={question}
          options={{ tables: true, emoji: true }}
        />
      )}
      <div className="grid grid-cols-2 justify-between p-3 items-center  border-b">
        <div className="font-semibold text-[#5a6370]">
          <div className="flex  gap-2 items-center relative">
            {description && (
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
                    {description}
                  </div>
                )}
              </>
            )}
            <div>{name}</div>
          </div>
        </div>
        <div>{field}</div>
      </div>
    </div>
  );
};

export default Subtasks;
