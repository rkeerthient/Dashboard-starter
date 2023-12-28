import * as React from "react";
import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useMyContext } from "../../Context/MyContext";
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
  const { userRole } = useMyContext();
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
        `/api/putFields/${`4635269`}?body=${requestBody}&userRole=${userRole}`
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
      className={`w-full items-center px-4 py-3 text-textColor ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <div className="flex w-full  items-center">
          <Listbox
            value={selectedItem}
            onChange={handleSelectChange}
            className="w-1/4 "
          >
            <div className=" flex gap-4 relative mt-1 h-fit">
              <Listbox.Button className="flex gap-4 relative w-full cursor-default bg-fieldBlurBorder rounded-s py-2 pl-3 pr-10 text-left hover:cursor-pointer">
                <span className="block text-xs">
                  {selectedItem
                    ? selectedItem.displayName
                    : options[0].displayName}
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
          {fieldId == "c_fonts" && (
            <div
              className={`ml-8 text-xs ${
                selectedItem?.displayName &&
                `font-${selectedItem?.displayName
                  .toLowerCase()
                  .replaceAll(" ", "")}`
              } w-2/4`}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
              <span className="font-bold"> molestias</span>, dicta asperiores
              aliquid quae amet tempora excepturi doloremque neque magnam nihil
              soluta inventore nobis ratione sint repellat optio labore
              mollitia?
            </div>
          )}
        </div>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer flex">
          <div className="w-1/4">
            {selectedItem?.displayName || `Click to add`}
          </div>
          {fieldId == "c_fonts" && (
            <div
              className={`ml-8 text-xs ${
                selectedItem?.displayName &&
                `font-${selectedItem?.displayName
                  .toLowerCase()
                  .replaceAll(" ", "")}`
              } w-2/4`}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
              <span className="font-bold"> molestias</span>, dicta asperiores
              aliquid quae amet tempora excepturi doloremque neque magnam nihil
              soluta inventore nobis ratione sint repellat optio labore
              mollitia?
            </div>
          )}
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
