import { useState, ChangeEvent } from "react";
import * as React from "react";
import Actions from "../common/Actions";
interface ColorPickerFieldProps {
  initialValue?: string;
  fieldId: string;
}

const ColorPickerField = ({ initialValue, fieldId }: ColorPickerFieldProps) => {
  const [value, setValue] = useState<any>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = value !== initialValue;
  const handleClick = () => {
    setIsEditable(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
            type="color"
            value={value || ""}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {value || "Click to add"}
        </div>
      )}
      {isEditable && (
        <Actions
          initialValue={initialValue}
          isContentEdited={isContentEdited}
          setIsEditable={(e) => setIsEditable(e)}
          setValue={(e) => setValue(e)}
          saveBody={{ [fieldId as string]: value }}
        />
      )}
    </div>
  );
};

export default ColorPickerField;
