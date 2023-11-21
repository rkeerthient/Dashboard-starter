import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFieldProps {
  initialValue?: string | undefined; // Update the type to allow undefined
}

const DateField = ({ initialValue = undefined }: DateFieldProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialValue ? new Date(initialValue) : undefined
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const isContentEdited = selectedDate !== initialValue;

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
    <div
      className={`w-full px-4 py-3 ${
        isEditMode ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditMode ? (
        <>
          <DatePicker
            className="border w-full p-1"
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
          />
          <div className="flex w-full gap-2 text-xs pt-2 font-bold">
            <button
              onClick={handleSave}
              className={`w-fit flex justify-center h-8 py-1 font-normal px-4 rounded-s text-xs border items-center ${
                isContentEdited
                  ? `border-fieldAndBorderBGGrayColor bg-active text-white`
                  : `pointer-events-none bg-disabled text-disabledColor `
              }`}
            >
              Save for 1 Profile
            </button>
            <button onClick={handleCancel} className={`text-xs text-linkColor`}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {selectedDate || `Click me!`}
        </div>
      )}
    </div>
  );
};

export default DateField;
