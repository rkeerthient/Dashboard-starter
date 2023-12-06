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
  textValue: string;
}
const PicklistField = ({
  initialValue = undefined,
  options,
  fieldId,
}: PicklistFieldProps) => {
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  useEffect(() => {
    setSelectedItem(
      options.find((option) => option.textValue === initialValue) || null
    );
  }, [options, initialValue]);

  const handleSelectChange = (selectedValue: Option | null) => {
    setSelectedItem(selectedValue);
  };

  return (
    <div className=" px-4 py-3 flex w-full gap-2 items-center hover:cursor-pointer hover:bg-containerBG text-textColor">
      <Listbox
        value={selectedItem}
        onChange={handleSelectChange}
        className="w-fit"
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default bg-fieldBlurBorder rounded-s py-2 pl-3 pr-10 text-left hover:cursor-pointer">
            <span className="block text-xs">
              {selectedItem ? selectedItem.displayName : `Click to add`}
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
    </div>
  );
};

export default PicklistField;
