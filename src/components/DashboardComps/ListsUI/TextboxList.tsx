// TextBoxList.tsx
import { TrashIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMyContext } from "../../Context/MyContext";

interface TextFieldProps {
  initialValue?: string[] | undefined;
  fieldId: string;
}

const TextBoxList = ({ initialValue, fieldId }: TextFieldProps) => {
  const [textboxes, setTextboxes] = useState<string[] | undefined>(
    initialValue
  );
  const [isEditable, setIsEditable] = useState(false);
  const [isContentEdited, setIsContentEdited] = useState(false);
  const { userRole } = useMyContext();
  useEffect(() => {
    setIsContentEdited(!arraysAreEqual(textboxes || [], initialValue || []));
  }, [textboxes, initialValue]);

  const arraysAreEqual = (array1: any[], array2: any[]) => {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  };
  const handleTextBoxChange = (index: number, value: string) => {
    setTextboxes((prevTextboxes) => {
      const newTextboxes = [...(prevTextboxes || [])];
      newTextboxes[index] = value;
      return newTextboxes;
    });
  };

  const handleAddTextBox = () => {
    setTextboxes((prevTextboxes) => [...(prevTextboxes || []), ""]);
  };

  const handleRemoveTextBox = (index: number) => {
    setTextboxes((prevTextboxes) => {
      const newTextboxes = [...(prevTextboxes || [])];
      newTextboxes.splice(index, 1);
      return newTextboxes;
    });
  };

  const handleClick = () => {
    setIsEditable(true);

    if (!initialValue) {
      setTextboxes([""]);
    }
  };

  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: textboxes,
        })
      );
      const response = await fetch(
        `/api/putFields/${`4635269`}?body=${requestBody}&userRole=${userRole}`
      );

      const mainJson = await response.json();
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
      className={`w-full px-4 py-3 text-[#374151] ${
        isEditable ? "bg-containerBG" : "bg-transparent"
      }`}
    >
      {isEditable ? (
        <div className="flex gap-2 flex-col">
          {textboxes &&
            textboxes.map((textbox, index) => (
              <div key={index} className="flex gap-2">
                <input
                  className="border w-full p-1"
                  type="text"
                  value={textbox}
                  onChange={(e) => handleTextBoxChange(index, e.target.value)}
                />
                <TrashIcon
                  className="w-4 h-4 hover:cursor-pointer"
                  onClick={() => handleRemoveTextBox(index)}
                >
                  Remove
                </TrashIcon>
              </div>
            ))}
          <button onClick={handleAddTextBox} className="text-linkColor mr-auto">
            + Add an item
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="hover:cursor-pointer hover:bg-containerBG  flex flex-col "
        >
          {textboxes &&
            textboxes.map((item: any, index: any) => (
              <div key={index} className="flex flex-col text-[#374151]">
                <div>{item}</div>
              </div>
            ))}
          {(!initialValue || initialValue.length === 0) && "Click to add"}
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

export default TextBoxList;
