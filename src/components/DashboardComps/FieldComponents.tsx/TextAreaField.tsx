import { useState, ChangeEvent } from "react";
import * as React from "react";
interface TextAreaProps {
  initialValue?: string;
  fieldId: string;
}

const TextArea = ({ initialValue, fieldId }: TextAreaProps) => {
  const [textValue, setTextValue] = useState<string>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = textValue !== initialValue;

  const handleClick = () => {
    setIsEditable(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };
  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: textValue,
        })
      );
      const response = await fetch(
        `/api/fields/4635269/putFields?body=${requestBody}`
      );
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }
    setIsEditable(false);
  };
  const handleCancel = () => {
    setIsEditable(false);
  };
  return (
    <div
      className={`w-full px-4 py-3 ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <>
          <textarea
            className="border w-full p-1"
            type="text"
            value={textValue || ""}
            onChange={handleChange}
            readOnly={!isEditable}
          />
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {textValue || "Click to add"}
        </div>
      )}
      {isEditable && (
        <div className="flex w-full gap-2 text-xs pt-2 font-bold">
          <button
            onClick={handleSave}
            disabled={!isContentEdited}
            className={`w-fit flex justify-center h-8 py-1 font-normal px-4 rounded-s text-xs border items-center ${
              !isContentEdited
                ? `border-fieldAndBorderBGGrayColor bg-disabled text-disabledColor pointer-events-none`
                : `border-fieldAndBorderBGGrayColor bg-active text-white`
            }`}
          >
            Save for 1 Profile
          </button>
          <button onClick={handleCancel} className={`text-xs text-linkColor`}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TextArea;