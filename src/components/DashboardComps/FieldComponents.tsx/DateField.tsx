import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMyContext } from "../../Context/MyContext";

interface DateFieldProps {
  initialValue: string | undefined;
  fieldId: string;
}

const DateField = ({ initialValue = undefined, fieldId }: DateFieldProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialValue ? new Date(initialValue) : null
  );
  const { userRole } = useMyContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const isContentEdited = selectedDate?.toISOString() !== initialValue;

  const handleClick = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId]: formatDateTime(selectedDate!),
        })
      );
      const response = await fetch(
        `/api/putFields/${`4635269`}?body=${requestBody}&userRole=${userRole}`
      );
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }
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
          {selectedDate
            ? selectedDate.toLocaleDateString("en-GB")
            : "Click to add"}
        </div>
      )}
    </div>
  );
};

export default DateField;

export function formatDateTime(dateString?: Date) {
  var formattedDate = "";
  if (dateString != null) {
    var date = dateString;

    var year = date.getFullYear();

    var numMonth = date.getMonth() + 1;
    var month = String(numMonth);
    if (numMonth < 10) month = "0" + month;

    var numDay = date.getDate();
    var day = String(numDay);
    if (numDay < 10) day = "0" + day;

    var numHour = date.getHours();
    var hour = String(numHour);
    if (numHour < 10) hour = "0" + hour;

    var numMins = date.getMinutes();
    var minutes = String(numMins);
    if (numMins < 10) minutes = "0" + minutes;

    formattedDate = year + "-" + month + "-" + day;
  }

  return formattedDate;
}
