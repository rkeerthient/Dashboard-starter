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
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {selectedDate || `Click to add`}
        </div>
      )}
    </div>
  );
};

export default DateField;
