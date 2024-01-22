import { TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import * as React from "react";
interface EntityAddOrDeleteFieldProps {
  initialValue?: any[];
  fieldId: string;
}

const EntityAddOrDeleteField = ({
  initialValue,
  fieldId,
}: EntityAddOrDeleteFieldProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showTextbox, setShowTextbox] = useState<boolean>(false);
  const [pageToken, setPageToken] = useState<string>("");
  const [entityValues, setEntityValues] = useState<any[]>(initialValue || []);
  const [value, setValue] = useState<string>("");
  const [responseValues, setResponseValues] = useState<any[]>([]);
  const [isContentEdited, setIsContentEdited] = useState(false);
  const handleClick = () => {
    setIsEditable(true);
  };

  const handleDelete = (_index: any) => {
    setShowTextbox(false);
    setEntityValues(entityValues.filter((_, index) => index !== _index));
  };

  const handleSave = async () => {
    console.log(JSON.stringify(entityValues));
    setShowTextbox(false);
  };
  const handleCancel = () => {
    setEntityValues(initialValue);
    setShowTextbox(false);
    setIsEditable(false);
  };

  const handleOpen = (inputString?: string, pageToken?: string) => {
    inputString && setValue(inputString);
    const getEntities = async () => {
      try {
        const response = await fetch(
          `/api/getEntities?entityType=${
            fieldId === `c_associatedInsights` ? `ce_insights` : `events`
          }${inputString ? `&inputString=${inputString}` : ``}${
            pageToken ? `&pageToken=${pageToken}` : ``
          }`
        );
        const resp = await response.json();

        if (resp && resp.response.entities) {
          resp.response.pageToken && setPageToken(resp.response.pageToken);
          setResponseValues((prevValue) => [
            ...prevValue,
            ...resp.response.entities.map((entity: any) => ({
              name: entity.name,
              id: entity.meta.id,
            })),
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEntities();
  };
  const updateList = async (item: any) => {
    setShowTextbox(false);
    setEntityValues((prevValues) => [
      ...prevValues,
      {
        name: item.name,
        id: item.id,
      },
    ]);
  };

  useEffect(() => {
    setIsContentEdited(
      JSON.stringify(initialValue) !== JSON.stringify(entityValues)
    );
  }, [entityValues]);

  return (
    <>
      <div
        className={` px-4 py-3 ${
          isEditable ? `bg-containerBG w-3/5` : `bg-transparent w-full`
        }`}
      >
        {isLoading && <div>isLoading...</div>}
        {isEditable ? (
          <>
            <div className="space-y-2 relative">
              {entityValues.map((item, index) => (
                <div key={index} className="flex flex-col ">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm">{item.id}</div>
                    </div>
                    <TrashIcon
                      className="w-4 h-4 hover:cursor-pointer"
                      onClick={() => handleDelete(index)}
                    >
                      Remove
                    </TrashIcon>
                  </div>
                </div>
              ))}
              {showTextbox && (
                <div className="">
                  <input
                    className="border w-full p-1"
                    type="text"
                    value={value}
                    onChange={(e) => handleOpen(e.target.value, pageToken)}
                  />
                  {responseValues && (
                    <div className="abolute z-50 border pl-2 pr-4 py-2 bg-white w-full flex flex-col gap-2 max-h-[8rem] h-full overflow-scroll">
                      {responseValues.map((item, index) => (
                        <div
                          onClick={() => updateList(item)}
                          className="flexflex-col w-full text-xs hover:cursor-pointer hover:bg-[#f9fafb]"
                          key={index}
                        >
                          <div className="font-bold w-full truncate overflow-hidden">
                            {item.name}
                          </div>
                          <div>ID: {item.id}</div>
                        </div>
                      ))}
                      {pageToken && (
                        <div
                          className={`text-xs text-linkColor hover:cursor-pointer hover:underline`}
                          onClick={(e) => handleOpen("", pageToken)}
                        >
                          Show More
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              <div
                className={`text-sm text-linkColor mt-2 hover:cursor-pointer`}
                onClick={() => {
                  handleOpen("", pageToken);
                  setShowTextbox(true);
                }}
              >
                + Add an Item
              </div>
            </div>
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
              <button
                onClick={handleCancel}
                className={`text-xs text-linkColor`}
              >
                Cancel
              </button>
            </div>{" "}
          </>
        ) : (
          <div onClick={handleClick} className="hover:cursor-pointer">
            {(entityValues && entityValues.length >= 1 && (
              <div className="space-y-2">
                {entityValues.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm">{item.id}</div>
                  </div>
                ))}
              </div>
            )) ||
              "Click to add"}
          </div>
        )}
      </div>
    </>
  );
};

export default EntityAddOrDeleteField;
