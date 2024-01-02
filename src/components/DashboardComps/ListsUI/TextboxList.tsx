import { TrashIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Actions from "../common/Actions";

interface TextFieldProps {
  initialValue?: string[] | undefined;
  fieldId: string;
}

const TextBoxList = ({ initialValue, fieldId }: TextFieldProps) => {
  const [value, setValue] = useState<string[] | undefined>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const [isContentEdited, setIsContentEdited] = useState(false);
  useEffect(() => {
    setIsContentEdited(!arraysAreEqual(value || [], initialValue || []));
  }, [value, initialValue]);

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
    setValue((prevTextboxes) => {
      const newTextboxes = [...(prevTextboxes || [])];
      newTextboxes[index] = value;
      return newTextboxes;
    });
  };

  const handleAddTextBox = () => {
    setValue((prevTextboxes) => [...(prevTextboxes || []), ""]);
  };

  const handleRemoveTextBox = (index: number) => {
    setValue((prevTextboxes) => {
      const newTextboxes = [...(prevTextboxes || [])];
      newTextboxes.splice(index, 1);
      return newTextboxes;
    });
  };

  const handleClick = () => {
    setIsEditable(true);
    if (!initialValue) {
      setValue([""]);
    }
  };

  return (
    <div
      className={`w-full px-4 py-3 text-[#374151] ${
        isEditable ? "bg-containerBG" : "bg-transparent"
      }`}
    >
      {isEditable ? (
        <div className="flex gap-2 flex-col">
          {value &&
            value.map((textbox, index) => (
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
          {value &&
            value.map((item: any, index: any) => (
              <div key={index} className="flex flex-col text-[#374151]">
                <div>{item}</div>
              </div>
            ))}
          {(!initialValue || initialValue.length === 0) && "Click to add"}
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

export default TextBoxList;
