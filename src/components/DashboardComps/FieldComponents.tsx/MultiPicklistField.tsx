import * as React from "react";
import { useState, useEffect } from "react";
import Actions from "../common/Actions";

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
  const [value, setValue] = useState<Option[]>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isContentEdited, setIsContentEdited] = useState(false);
  const [initVals, setInitVals] = useState<Option[]>([]);
  useEffect(() => {
    const initialCheckboxes = options.map((checkbox) => ({
      ...checkbox,
      checked: initialValue.includes(checkbox.textValue),
    }));
    setValue(initialCheckboxes);
    setInitVals(initialCheckboxes);
  }, [options, initialValue]);

  const handleCheckboxChange = (changedCheckbox: Option) => {
    const updatedCheckboxes = value.map((checkbox) =>
      checkbox.textValue === changedCheckbox.textValue
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setValue(updatedCheckboxes);
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
      className={`w-full   ${isEditable ? `bg-containerBG` : `bg-transparent`}`}
    >
      {isEditable ? (
        <>
          {value.map((checkbox) => (
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
          onClick={() => setIsEditable(true)}
          className="hover:cursor-pointer hover:bg-containerBG p-2"
        >
          {value.filter((item) => item.checked).length >= 1 ? (
            <div className="grid grid-cols-3 ">
              {value &&
                value
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
      {isEditable && (
        <Actions
          initialValue={initialValue}
          isContentEdited={isContentEdited}
          setIsEditable={(e) => setIsEditable(e)}
          setValue={(e) => setValue(e)}
          saveBody={{ [fieldId]: buildBody(value) }}
        />
      )}
    </div>
  );
};

export default MultiPicklistField;
export const buildBody = (value: any) => {
  let x = value.filter((item: any) => item.checked);
  let filteredData = x.map((item: any) => item.textValue);
  return filteredData;
};
