import * as React from "react";
import { useState, useEffect } from "react";

interface Checkbox {
  displayName: string;
  textValue: string;
  checked?: boolean;
}

interface CheckboxProps {
  checkboxes: Checkbox[];
  initialValue?: string[];
}

const MultiCheckbox = ({ checkboxes, initialValue }: CheckboxProps) => {
  const [selectedItem, setSelectedItem] = useState<Checkbox[]>([]);

  useEffect(() => {
    const initialCheckboxes = checkboxes.map((checkbox) => ({
      ...checkbox,
      checked: initialValue?.includes(checkbox.textValue) || false,
    }));
    setSelectedItem(initialCheckboxes);
  }, [checkboxes, initialValue]);

  const handleCheckboxChange = (changedCheckbox: Checkbox) => {
    const updatedCheckboxes = selectedItem.map((checkbox) =>
      checkbox.textValue === changedCheckbox.textValue
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );

    setSelectedItem(updatedCheckboxes);
  };

  return (
    <div>
      {selectedItem.map((checkbox) => (
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
    </div>
  );
};

export default MultiCheckbox;
