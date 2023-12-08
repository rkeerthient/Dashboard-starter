import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState, ChangeEvent } from "react";
import * as React from "react";
import LexicalMarkdownEditor from "../LexicalRichText/LexicalMarkdownEditor";
interface EntityFieldProps {
  initialValue?: string;
  fieldId: string;
}

const EntityField = ({ initialValue, fieldId }: EntityFieldProps) => {
  const [textValue, setTextValue] = useState<string>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = textValue !== initialValue;
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsEditable(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };
  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: textValue,
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
    setOpen(false);
    setIsEditable(false);
  };
  return (
    <>
      <div
        className={`w-full px-4 py-3 ${
          isEditable ? `bg-containerBG` : `bg-transparent`
        }`}
      >
        {isEditable ? (
          <>
            <div className="space-y-2">
              {textValue.map((item, index) => (
                <div className="flex flex-col">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm">{item.id}</div>
                </div>
              ))}
            </div>
            <div
              className={`text-xs text-linkColor mt-2`}
              onClick={() => setOpen(true)}
            >
              Add blog
            </div>
          </>
        ) : (
          <div onClick={handleClick} className="hover:cursor-pointer">
            {(textValue && (
              <div className="space-y-2">
                {textValue.map((item, index) => (
                  <div className="flex flex-col">
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm">{item.id}</div>
                  </div>
                ))}
              </div>
            )) ||
              "Click to add"}
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
      <Transition.Root show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-full overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center ">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-2/4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="flex flex-col gap-6">
                      <div className="text-xl font-bold">New Blog</div>
                      <div>
                        <input
                          type="text"
                          className="border"
                          placeholder="enter blog title"
                        />
                      </div>
                      <div>
                        <LexicalMarkdownEditor
                          serializedAST={""}
                          editable={true}
                        ></LexicalMarkdownEditor>
                      </div>
                    </div>
                    <div className="flex mt-6 gap-3">
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
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default EntityField;
