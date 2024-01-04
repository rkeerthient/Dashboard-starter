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
        <ul
          onClick={() => setIsEditMode(true)}
          className="hover:cursor-pointer hover:bg-containerBG p-2"
        >
          {selectedItems
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => (
              <li key={checkbox.textValue}>{checkbox.displayName}</li>
            )) || `Click to add`}
        </ul>
      )}
    </div>
  );
};

export default MultiPicklistField;
