import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Option {
  displayName: string;
  textValue: string;
}

interface StringType {
  stereotype: string;
  maxLength: number;
}

interface DateType {}

interface OptionType {
  option: Option[];
}

interface Property {
  name: string;
  displayName: string;
  isRequired: boolean;
  typeId: string;
  type: {
    optionType?: OptionType;
    stringType?: StringType;
    dateType?: DateType;
  };
}

interface Block {
  textValues: Record<string, string>; // Use an object to store multiple text values, where keys are property names
  optionValue: string;
  dateValues: (Date | null)[]; // Use an array to store multiple date values
  options: string[];
}

interface TextBoxContainerProps {
  properties: Property[];
  initialValue: any;
}

const TextBoxContainer = ({
  properties,
  initialValue,
}: TextBoxContainerProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const initialBlocks = (initialValue || []).map((item: any) => {
      const initialTextValues: Record<string, string> = {};
      const initialDateValues: (Date | null)[] = [];
      const initialOptionValues: (Date | null)[] = [];

      properties.forEach((property) => {
        initialTextValues[property.name] = (item || {})[property.name] || "";

        if (property.typeId === "date") {
          initialDateValues.push(
            (item[property.name] && new Date(item[property.name])) || null
          );
        }
        if (property.typeId === "option") {
          initialOptionValues.push(
            (item[property.name] && item[property.name]) || null
          );
        }
      });
      console.log(initialOptionValues);

      return {
        textValues: initialTextValues,
        optionValue: initialOptionValues || "",
        dateValues: initialDateValues,
        options: [],
      };
    });

    setBlocks(initialBlocks);
  }, [initialValue, properties]);

  const deleteBlock = (index: number) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  const handleTextChange = (
    index: number,
    property: Property,
    value: string
  ) => {
    const updatedBlocks = [...blocks];

    updatedBlocks[index].textValues[property.name] = value;

    setBlocks(updatedBlocks);
  };

  const addNewBlock = () => {
    const initialTextValues: Record<string, string> = {};
    properties.forEach((property) => {
      initialTextValues[property.name] = "";
    });

    const initialDateValues: (Date | null)[] = Array(
      properties.filter((property) => property.typeId === "date").length
    ).fill(null);

    setBlocks([
      ...blocks,
      {
        textValues: initialTextValues,
        optionValue: "",
        dateValues: initialDateValues,
        options: [],
      },
    ]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].optionValue = value;
    setBlocks(updatedBlocks);
  };

  const handleDateChange = (
    index: number,
    dateIndex: number,
    date: Date | null
  ) => {
    const updatedBlocks = [...blocks];

    updatedBlocks[index].dateValues[dateIndex] = date;

    setBlocks(updatedBlocks);
  };

  const saveChanges = () => {
    const jsonArray: any[] = [];
    console.log(JSON.stringify(blocks));

    blocks.forEach((block) => {
      const jsonBlock: Record<string, any> = {};

      properties.forEach((property) => {
        switch (property.typeId) {
          case "string":
            jsonBlock[property.name] = block.textValues[property.name];
            break;
          case "option":
            if (Array.isArray(block.optionValue)) {
              // Handle case where optionValue is an array
              jsonBlock[property.name] = block.optionValue;
            } else {
              // Handle case where optionValue is a string
              jsonBlock[property.name] = [block.optionValue];
            }
            break;
          case "date":
            jsonBlock[property.name] = block.dateValues;
            break;
          // Add cases for other property types if needed
          default:
            break;
        }
      });
      jsonArray.push(jsonBlock);
    });

    const formattedJsonArray = jsonArray.map((item) => ({
      ...item,
      date:
        item.date instanceof Date
          ? item.date.toISOString().split("T")[0]
          : null,
    }));

    console.log(formattedJsonArray);
  };

  return (
    <div className={`w-full px-4 py-3  bg-containerBG`}>
      {blocks.map((block: Block, index: number) => (
        <div key={index} className="flex ">
          <div className="flex flex-row w-full  border p-4 m-2 gap-4">
            <div className="flex flex-col gap-2 w-full">
              {properties.map((property, propIndex) => (
                <div
                  key={`${index}-${property.name}`}
                  className="text-[#374151] flex flex-col gap-1"
                >
                  <label key={propIndex} className="font-bold">
                    {property.displayName}
                  </label>
                  {property.typeId === "string" && (
                    <input
                      type="text"
                      className="w-full p-1 border"
                      placeholder={property.displayName}
                      value={block.textValues[property.name]}
                      onChange={(e) =>
                        handleTextChange(index, property, e.target.value)
                      }
                      maxLength={property.type?.stringType?.maxLength || 100}
                      required={property.isRequired}
                    />
                  )}

                  {property.typeId === "option" && (
                    <Listbox
                      className="w-fit"
                      value={block.optionValue}
                      onChange={(value) => handleOptionChange(index, value)}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default bg-fieldBlurBorder rounded-s py-2 pl-3 pr-10 text-left hover:cursor-pointer">
                          <span className="block text-xs">
                            {block.optionValue}
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
                          <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                            {property.type?.optionType?.option?.map(
                              (option, optionIndex) => (
                                <Listbox.Option
                                  key={optionIndex}
                                  value={option.textValue}
                                >
                                  {({ selected }) => (
                                    <div
                                      className={`block text-xs py-2 p-4 hover:bg-containerBG  ${
                                        selected
                                          ? "bg-dropdownActiveBG"
                                          : "bg-white"
                                      }`}
                                    >
                                      {option.displayName}
                                    </div>
                                  )}
                                </Listbox.Option>
                              )
                            )}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  )}

                  {property.typeId === "date" && (
                    <div>
                      {block.dateValues.map((dateValue, dateIndex) => (
                        <DatePicker
                          key={dateIndex}
                          className="border w-fit p-1"
                          selected={dateValue}
                          onChange={(date: Date) =>
                            handleDateChange(index, dateIndex, date)
                          }
                          dateFormat="dd/MM/yyyy"
                          showYearDropdown
                          scrollableYearDropdown
                        />
                      ))}
                    </div>
                  )}

                  {/* {property.typeId === "richText" && <RichtextEditor />} */}
                </div>
              ))}
            </div>
            <TrashIcon className="h-4 w-4" onClick={() => deleteBlock(index)} />
          </div>
        </div>
      ))}
      <button onClick={addNewBlock}>Add New</button>
      <button onClick={saveChanges} className="ml-8">
        Save changes
      </button>
    </div>
  );
};

export default TextBoxContainer;
