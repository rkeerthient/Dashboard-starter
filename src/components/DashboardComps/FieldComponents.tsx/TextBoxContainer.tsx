import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as React from "react";
import LexicalMarkdownEditor from "../LexicalRichText/LexicalMarkdownEditor";

interface Option {
  displayName: string;
  textValue: string;
}
interface MultiPicklistFieldProps {
  initialValue?: string | undefined;
  options: MultiOption[];
  fieldId: string;
}

export interface MultiOption {
  displayName: string;
  textValue: string;
  checked?: boolean;
}
interface StringType {
  stereotype: string;
  maxLength: number;
}

interface DateType {}

interface OptionType {
  option: Option[];
}

export interface RichTextType {
  maxLength: number;
  supportedFormat: string[];
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
    richTextType?: RichTextType;
    listType: MultiPicklistFieldProps;
  };
}

interface Block {
  textValues: Record<string, string>;
  richTextValues: string | null;
  optionValue: string;
  dateValues: (Date | null)[];
  options: string[] | null;
  booleanValue: boolean | null;
  multiPickOptions: string[] | null;
}

interface TextBoxContainerProps {
  properties: Property[];
  initialValue: any;
  fieldId: string;
  setInitialValues: any | any[];
  editMode: (newValue: boolean) => void;
}

const TextBoxContainer = ({
  properties,
  initialValue,
  fieldId,
  setInitialValues,
  editMode,
}: TextBoxContainerProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [initialData, setInitialData] = useState<any>(initialValue);
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);
  const [showSaveButtons, setShowSaveButtons] = useState<boolean>(false);
  const [initBlocks, setInitBlocks] = useState<Block[]>([]);
  const [isContentEdited, setIsContentEdited] = useState<boolean>(false);

  const booleanData = [
    {
      displayName: "Yes",
      textValue: true,
    },
    {
      displayName: "No",
      textValue: false,
    },
  ];
  useEffect(() => {
    setInitialData(initialValue);
    const initialBlocks = (initialValue || []).map((item: any) => {
      let initialTextValues: Record<string, string> = {};
      let initialRichTextValues: string | null = null;
      let initialDateValues: (Date | null)[] = [];
      let initialOptionValues: string[] = [];
      let initialBooleanValue: boolean | null = false;
      let initialMultiPickValues: string[] = [];

      properties.forEach((property: Property) => {
        if (property.typeId === "string") {
          initialTextValues[property.name] = (item || {})[property.name] || "";
        }
        if (property.typeId === "date") {
          initialDateValues.push(
            (item[property.name] && new Date(item[property.name])) || null
          );
        }
        if (property.typeId === "option") {
          initialOptionValues.push(
            (item[property.name] && item[property.name]) || ""
          );
        }
        if (
          property.typeId === "list" &&
          property.type.listType.typeId === "option"
        ) {
          const optionList = property.type.listType.type.optionType.option;
          const optionsInItem = item[property.name] || [];

          const multiPickValuesForProperty = optionList.map((option) => ({
            textValue: option.textValue,
            displayName: option.displayName,
            checked: optionsInItem.includes(option.textValue),
          }));

          initialMultiPickValues.push(...multiPickValuesForProperty);
        }

        if (property.typeId === "boolean") {
          initialBooleanValue =
            (item || {})[property.name] !== undefined
              ? (item || {})[property.name]
              : false;
        }
        if (property.typeId === "richText") {
          initialRichTextValues =
            (item || {})[property.name] !== undefined
              ? (item || {})[property.name]
              : "";
        }
      });

      return {
        textValues: initialTextValues,
        richTextValues: initialRichTextValues,
        optionValue: initialOptionValues[0] || "",
        dateValues: initialDateValues,
        booleanValue: initialBooleanValue,
        multiPickOptions: initialMultiPickValues,
      };
    });
    setInitBlocks(initialBlocks);
    setBlocks(initialBlocks);
  }, [initialValue, properties]);

  const deleteBlock = (index: number) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);

    setIsDataChanged(
      JSON.stringify(updatedBlocks) !== JSON.stringify(initBlocks)
    );
    setShowSaveButtons(true);
  };

  const handleTextChange = (
    index: number,
    property: Property,
    value: string
  ) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].textValues[property.name] = value;
    setBlocks(updatedBlocks);
    setIsDataChanged(
      JSON.stringify(updatedBlocks) !== JSON.stringify(initBlocks)
    );
  };

  const handleRichtextChange = (index: number, value: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].richTextValues = value;
    setBlocks(updatedBlocks);
    setIsDataChanged(!deepEqual(initialData, updatedBlocks));
  };

  const addNewBlock = () => {
    const initialTextValues: Record<string, string> = {};
    properties.forEach((property: Property) => {
      initialTextValues[property.name] = "";
    });

    const initialDateValues: (Date | null)[] = Array(
      properties.filter((property: Property) => property.typeId === "date")
        .length
    ).fill(null);
    const initialBooleanValue: boolean | null = false;
    const initialRichTextValues: string | null = "";
    const initialOptions: string[] | null = properties
      .filter(
        (property: Property) =>
          property.typeId === "option" &&
          property.type.optionType?.option[0]?.textValue
      )
      .map(
        (property: Property) => property.type.optionType!.option[0].textValue
      );

    const initialMultiPickValues:
      | { textValue: string; checked: boolean }[]
      | null = properties
      .filter(
        (property: Property) =>
          property.typeId === "list" &&
          property.type.listType.typeId === "option"
      )
      .map((property: Property) => {
        const optionList = property.type.listType.type.optionType.option;
        return optionList.map((option) => ({
          textValue: option.textValue,
          displayName: option.displayName,
          checked: false,
        }));
      })
      .flat();

    setBlocks([
      ...blocks,
      {
        textValues: initialTextValues,
        richTextValues: initialRichTextValues,
        optionValue: initialOptions[0],
        dateValues: initialDateValues,
        options: [],
        booleanValue: initialBooleanValue,
        multiPickOptions: initialMultiPickValues,
      },
    ]);
    setIsDataChanged(JSON.stringify(blocks) !== JSON.stringify(initBlocks));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].optionValue = value;
    setBlocks(updatedBlocks);
    setIsDataChanged(!deepEqual(initialData, updatedBlocks));
  };

  const handleMultiOptionChange = (index: number, changedCheckbox: Option) => {
    const updatedBlocks = [...blocks];

    if (updatedBlocks[index] && updatedBlocks[index].multiPickOptions) {
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        multiPickOptions: updatedBlocks[index].multiPickOptions.map(
          (checkbox) =>
            checkbox.textValue === changedCheckbox.textValue
              ? { ...checkbox, checked: !checkbox.checked }
              : checkbox
        ),
      };

      setBlocks(updatedBlocks);
      setIsDataChanged(!deepEqual(initialData, updatedBlocks));
    }
  };

  const handleBooleanChange = (index: number, value: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].booleanValue = Boolean(value);
    setBlocks(updatedBlocks);
    setIsDataChanged(!deepEqual(initialData, updatedBlocks));
  };

  const handleDateChange = (
    index: number,
    dateIndex: number,
    date: Date | null
  ) => {
    const updatedBlocks = [...blocks];

    updatedBlocks[index].dateValues[dateIndex] = date;
    setBlocks(updatedBlocks);
    setIsDataChanged(!deepEqual(initialData, updatedBlocks));
  };

  const saveChanges = async () => {
    const jsonArray: any[] = [];
    blocks.forEach((block) => {
      const jsonBlock: Record<string, any> = {};
      properties.forEach((property: Property) => {
        switch (property.typeId) {
          case "string":
            jsonBlock[property.name] = block.textValues[property.name];
            break;
          case "boolean":
            jsonBlock[property.name] = block.booleanValue;
            break;
          case "richText":
            jsonBlock[property.name] = block.richTextValues;
            break;
          case "list":
            jsonBlock[property.name] = block.multiPickOptions
              .filter((item) => item.checked)
              .map((item) => item.textValue);
            break;
          case "option":
            jsonBlock[property.name] = Array.isArray(block.optionValue)
              ? block.optionValue
              : block.optionValue;
            break;
          case "date":
            jsonBlock[property.name] = block.dateValues[0] || null;
            break;
          default:
            break;
        }
      });
      jsonArray.push(jsonBlock);
    });

    const formattedJsonArray = jsonArray.map((item) => {
      const formattedItem: Record<string, any> = { ...item };
      if (formattedItem.date instanceof Date) {
        formattedItem.date = formatDateTime(formattedItem.date);
      }
      return formattedItem;
    });

    const allKeys: string[] = formattedJsonArray.reduce(
      (keys, item) => keys.concat(Object.keys(item)),
      [] as string[]
    );
    const isRichTextField = properties.some((item) =>
      ["richText", "richTextV2"].includes(item.typeId)
    );

    const richFormat = isRichTextField
      ? isRichTextField
        ? "markdown"
        : "html"
      : "";

    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: formattedJsonArray,
        })
      );
      const response = await fetch(
        `/api/fields/4635269/putFields?body=${requestBody}${
          richFormat.length ? `&format=${richFormat}` : ""
        }`
      );
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }
    setIsDataChanged(false);
    setInitialValues(formattedJsonArray);
    editMode(false);
  };

  return (
    <div className={`w-full px-4 py-3 bg-containerBG`}>
      {blocks.map((block: Block, index: number) => (
        <div key={index} className="flex ">
          <div className="flex flex-row w-full border p-4 m-2 gap-4">
            <div className="flex flex-col gap-2 w-full">
              {properties.map((property: Property, propIndex: any) => (
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
                                  key={`${index}-${property.name}-${optionIndex}`}
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
                  {property.typeId === "list" && (
                    <div className="grid grid-cols-3">
                      {block.multiPickOptions.map((checkbox) => (
                        <div key={checkbox.textValue} className="flex gap-2">
                          <input
                            type="checkbox"
                            id={`checkbox-${checkbox.textValue}`}
                            checked={checkbox.checked || false}
                            onChange={() =>
                              handleMultiOptionChange(index, checkbox)
                            }
                          />
                          <label htmlFor={`checkbox-${checkbox.textValue}`}>
                            {checkbox.displayName}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {property.typeId === "boolean" && (
                    <>
                      <Listbox
                        className="w-fit"
                        value={
                          block.booleanValue
                            ? booleanData.filter(
                                (option) => option.textValue === true
                              )[0].displayName
                            : booleanData.filter(
                                (option) => option.textValue === false
                              )[0].displayName
                        }
                        onChange={(value) => handleBooleanChange(index, value)}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default bg-fieldBlurBorder rounded-s py-2 pl-3 pr-10 text-left hover:cursor-pointer">
                            <span className="block text-xs">
                              {
                                booleanData.filter(
                                  (option) =>
                                    option.textValue === block.booleanValue
                                )[0].displayName
                              }
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
                              {booleanData.map((option, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={option.textValue}
                                >
                                  {({ selected }) => (
                                    <div
                                      className={`block text-xs py-2 p-4 hover:bg-containerBG ${
                                        selected
                                          ? "bg-dropdownActiveBG"
                                          : "bg-white"
                                      }`}
                                    >
                                      {option.displayName}
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </>
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

                  {property.typeId === "richText" && (
                    <LexicalMarkdownEditor
                      editable={true}
                      serializedAST={block.richTextValues}
                      isContentEdited={(value: boolean) => {
                        setIsContentEdited(value);
                      }}
                      setChangedData={(richText: string) =>
                        handleRichtextChange(index, richText)
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <TrashIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => deleteBlock(index)}
            />
          </div>
        </div>
      ))}
      <div className="flex flex-col pl-4 gap-4 justify-start">
        <button
          className=" mr-auto text-sm text-linkColor"
          onClick={addNewBlock}
        >
          + Add New
        </button>
        <div className="flex gap-4">
          <button
            onClick={saveChanges}
            className={`w-fit flex justify-center h-8 py-1 font-normal px-4 rounded-s text-xs border items-center ${
              !isDataChanged
                ? `border-fieldAndBorderBGGrayColor bg-disabled text-disabledColor pointer-events-none`
                : `border-fieldAndBorderBGGrayColor bg-active text-white`
            }`}
          >
            Save changes
          </button>
          <button
            className=" mr-auto text-sm text-linkColor"
            onClick={() => editMode(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextBoxContainer;

export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  )
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
};

export const formatDateTime = (dateString?: Date) => {
  var formattedDate = "";
  if (dateString != null) {
    var date = dateString;

    var year = date.getFullYear();

    var numMonth = date.getMonth() + 1;
    var month = String(numMonth);
    if (numMonth < 10) month = "0" + month;

    var numDay = date.getDate();
    var day = String(numDay);
    if (numDay < 10) day = "0" + day;

    var numHour = date.getHours();
    var hour = String(numHour);
    if (numHour < 10) hour = "0" + hour;

    var numMins = date.getMinutes();
    var minutes = String(numMins);
    if (numMins < 10) minutes = "0" + minutes;

    formattedDate = year + "-" + month + "-" + day;
  }

  return formattedDate;
};
