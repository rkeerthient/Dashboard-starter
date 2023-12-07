import * as React from "react";
import { useState, useEffect } from "react";

interface MultiPicklistFieldProps {
  initialValue?: string | undefined;
  options: Option[];
  fieldId: string;
}

export interface Option {
  displayName: string;
  textValue: string;
  checked?: boolean;
}

const MultiPicklistField = ({
  initialValue = "",
  options,
  fieldId,
}: MultiPicklistFieldProps) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isContentEdited, setIsContentEdited] = useState(false);
  const [initVals, setInitVals] = useState<Option[]>([]);
  useEffect(() => {
    const initialCheckboxes = options.map((checkbox) => ({
      ...checkbox,
      checked: initialValue.includes(checkbox.textValue),
    }));
    setSelectedItems(initialCheckboxes);
    setInitVals(initialCheckboxes);
  }, [options, initialValue]);

  const handleCheckboxChange = (changedCheckbox: Option) => {
    const updatedCheckboxes = selectedItems.map((checkbox) =>
      checkbox.textValue === changedCheckbox.textValue
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setSelectedItems(updatedCheckboxes);
    const hasContentChanged = !arraysAreEqual(updatedCheckboxes, initVals);
    setIsContentEdited(hasContentChanged);
  };

  const arraysAreEqual = (array1: Option[], array2: Option[]) => {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (
        array1[i].textValue !== array2[i].textValue ||
        array1[i].checked !== array2[i].checked
      ) {
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    let x = selectedItems.filter((item) => item.checked);
    let filteredData = x.map((item) => item.textValue);
    const requestBody = encodeURIComponent(
      JSON.stringify({
        [fieldId]: filteredData,
      })
    );
    try {
      const response = await fetch(
        `/api/fields/4635269/putFields?body=${requestBody}`
      );
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }
    setIsEditMode(false);
    setIsContentEdited(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setIsContentEdited(false);
  };

  return (
    <div
      className={`w-full   ${isEditMode ? `bg-containerBG` : `bg-transparent`}`}
    >
      {isEditMode ? (
        <>
          {selectedItems.map((checkbox) => (
            <div key={checkbox.textValue} className="flex gap-2">
              <input
                type="checkbox"
                id={`checkbox-${checkbox.textValue}`}
                checked={checkbox.checked || false}
                onChange={() => handleCheckboxChange(checkbox)}
              />
              <label htmlFor={`checkbox-${checkbox.textValue}`}>
                {checkbox.displayName}
              </label>
            </div>
          ))}
        </>
      ) : (
        <div
          onClick={() => setIsEditMode(true)}
          className="hover:cursor-pointer hover:bg-containerBG p-2"
        >
          {selectedItems.filter((item) => item.checked).length >= 1 ? (
            <div className="grid grid-cols-3 ">
              {selectedItems &&
                selectedItems
                  .filter((checkbox) => checkbox.checked)
                  .map((checkbox) => (
                    <div key={checkbox.textValue}>{checkbox.displayName}</div>
                  ))}
            </div>
          ) : (
            <div>Click to add</div>
          )}
        </div>
      )}
      {isEditMode && (
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

export default MultiPicklistField;
