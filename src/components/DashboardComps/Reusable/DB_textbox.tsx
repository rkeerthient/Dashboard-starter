import { PencilIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
interface textboxProps {
  initialValue: string;
  onSave: (value: string) => void;
}

const DB_textbox = ({ initialValue, onSave }: textboxProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const [editedValue, setEditedValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocussed, setIsFocussed] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showTexbox, setShowTextbox] = useState(false);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
    setShowEditIcon(false);
  };

  const handleSave = () => {
    onSave(editedValue);
    setIsEditing(false);
    setIsFocussed(false);
  };

  const handleCancel = () => {
    setEditedValue(initialValue);
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={`   w-full flex gap-2 px-4 py-3 items-center hover:cursor-pointer hover:bg-containerBG ${
        isFocussed && "bg-containerBG"
      }`}
      onMouseEnter={() => setShowEditIcon(true)}
      onClick={() => setShowTextbox(true)}
      onMouseLeave={() => {
        setShowEditIcon(false);
        setShowEditIcon(false);
      }}
    >
      {showTexbox ? (
        <div className="flex flex-col gap-2 w-full">
          <input
            onFocus={() => setIsFocussed(true)}
            type="text"
            onClick={handleEditClick}
            value={editedValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className={`border w-full h-[30px] py-1 px-2 border-fieldBlurBorder text-xs rounded-s text-textColor ${
              isFocussed ? `border-fieldFocusBorder` : `border-none`
            }`}
          />
          {isFocussed && (
            <div className="flex w-full gap-2 text-xs pt-2 font-bold">
              <button
                onClick={handleSave}
                className={`w-fit flex justify-center h-8 py-1 font-normal px-4 rounded-s text-xs border items-center ${
                  editedValue
                    ? `border-fieldAndBorderBGGrayColor bg-active text-white`
                    : `pointer-events-none bg-disabled text-disabledColor `
                }`}
              >
                Save for 1 Profile
              </button>
              <button
                onClick={handleCancel}
                className={`w-fit flex justify-center  rounded-s font-normal  h-8  py-0 px-4 text-xs border items-center 
        `}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">{editedValue}</div>
      )}
      <PencilIcon
        className={`h-4 w-4 ${showEditIcon ? `visible` : `invisible`}`}
      />
    </div>
  );
};

export default DB_textbox;
