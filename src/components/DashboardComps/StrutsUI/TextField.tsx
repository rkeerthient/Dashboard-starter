import { useState, useEffect, ChangeEvent } from "react";
import * as React from "react";
interface TextFieldProps {
  initialValue?: string | undefined;
  fieldId: string;
}

const TextField = ({ initialValue, fieldId }: TextFieldProps) => {
  const [textValue, setTextValue] = useState<string | undefined>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = textValue !== initialValue;

  const handleClick = () => {
    setIsEditable(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <div
      className={`w-full px-4 py-3 ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <>
          <input
            className="border w-full p-1"
            type="text"
            value={textValue || ""}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {textValue} Click to add
        </div>
      )}
    </div>
  );
};

export default TextField;
