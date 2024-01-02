import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Actions from "../common/Actions";

interface DateFieldProps {
  initialValue: string | undefined;
  fieldId: string;
}

const DateField = ({ initialValue = undefined, fieldId }: DateFieldProps) => {
  const [value, setValue] = useState<Date | null>(
    initialValue ? new Date(initialValue) : null
  );
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = value?.toISOString() !== initialValue;

  const handleClick = () => {
    setIsEditable(true);
  };

  return (
    <div
      className={`w-full px-4 py-3 ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <>
          <DatePicker
            className="border w-full p-1"
            selected={value}
            onChange={(date: Date) => setValue(date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
          />
          <Actions
            initialValue={initialValue}
            isContentEdited={isContentEdited}
            setIsEditable={(e) => setIsEditable(e)}
            setValue={(e) => setValue(e)}
            saveBody={{
              [fieldId]: formatDateTime(value!),
            }}
          ></Actions>
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {value ? value.toLocaleDateString("en-GB") : "Click to add"}
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
