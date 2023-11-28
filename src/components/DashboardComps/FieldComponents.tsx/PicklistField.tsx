import * as React from "react";
import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
interface PicklistFieldProps {
  initialValue: string | undefined;
  options: Option[];
  fieldId?: string;
}
export interface Option {
  displayName: string;
  textValue: string | boolean;
}
const PicklistField = ({
  initialValue = undefined,
  options,
  fieldId,
}: PicklistFieldProps) => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const isContentEdited = selectedItem?.textValue !== initialValue;
  const [isEditable, setIsEditable] = useState(false);

  const handleClick = () => {
    setIsEditable(true);
  };

  useEffect(() => {
    setSelectedItem(
      options.find((option) => option.textValue === initialValue) || null
    );
  }, [options, initialValue]);

  const handleSelectChange = (selectedValue: Option | null) => {
    setSelectedItem(selectedValue);
  };

  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: selectedItem!.textValue,
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
      className={`w-full px-4 py-3 text-textColor ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <Listbox
          value={selectedItem}
          onChange={handleSelectChange}
          className="w-fit"
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default bg-fieldBlurBorder rounded-s py-2 pl-3 pr-10 text-left hover:cursor-pointer">
              <span className="block text-xs">
                {selectedItem ? selectedItem.displayName : `Click me!`}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-max overflow-auto rounded-md  bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                {options.map((opt, optIdx) => (
                  <Listbox.Option
                    key={optIdx}
                    className={({ active }) =>
                      `w-full  select-none hover:cursor-pointer  ${
                        active ? "bg-amber-100 text-amber-900" : ""
                      }`
                    }
                    value={opt}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block text-xs py-2 p-4 hover:bg-containerBG  ${
                            selected ? "bg-dropdownActiveBG" : "bg-white"
                          }`}
                        >
                          {opt.displayName}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {selectedItem?.displayName || `Click me!`}
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

export default PicklistField;
