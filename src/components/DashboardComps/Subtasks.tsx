import * as React from "react";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import MarkdownView from "react-showdown";
import UIPicker from "./UIPicker";

const Subtasks = ({ subItem, document }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(JSON.stringify(subItem));

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
              <div>
                {subItem.name}{" "}
                {subItem.readonly && (
                  <span className="text-xs">(readonly fields)</span>
                )}
              </div>
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
              readonly={subItem.readonly}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Subtasks;
