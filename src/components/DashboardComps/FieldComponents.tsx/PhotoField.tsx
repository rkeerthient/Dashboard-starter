import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PhotoUpload from "./PhotoUpload";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useMyContext } from "../../Context/MyContext";

interface PhotoFieldProps {
  fieldId: string;
  initialValue: PhotoProps | null;
  isMulti?: boolean;
}

interface PhotoProps {
  height?: number;
  url: string;
  width?: number;
}

const PhotoField = ({ fieldId, initialValue, isMulti }: PhotoFieldProps) => {
  const [open, setOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { userRole, setData } = useMyContext();
  const [imgUrls, setImgUrls] = useState<PhotoProps["url"] | null>(
    initialValue ? initialValue.url : null
  );
  const [isContentEdited, setIsContentEdited] = useState<boolean>(false);
  const handleClick = () => {
    setIsEditable(true);
  };
  const updateValue = (
    propertyName: string,
    newValue: any,
    isSuggestion: boolean
  ) => {
    setData((prevData) => ({
      ...prevData,
      [propertyName]: {
        ...prevData[propertyName],
        value: newValue,
        isSuggestion: isSuggestion,
      },
    }));
  };
  const handleDelete = (imgUrl: string | string[]) => {
    setImgUrls("");
  };
  useEffect(() => {
    setIsContentEdited(
      JSON.stringify(imgUrls) !== JSON.stringify(initialValue && initialValue)
    );
  }, [imgUrls, initialValue]);

  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: { url: imgUrls },
        })
      );

      const response = await fetch(
        `/api/putFields/${`4635269`}?body=${requestBody}&userRole=${userRole}`
      );
      const res = await response.json();
      const isSuggestion = res.response.meta ? true : false;

      updateValue(fieldId, imgUrls, isSuggestion);
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }
    setIsEditable(false);
  };
  const handleCancel = () => {
    initialValue ? setImgUrls(initialValue.url) : setImgUrls("");
    setIsEditable(false);
  };
  return (
    <>
      <div
        className={`w-full px-4 py-3  max-h-96 overflow-scroll ${
          isEditable ? `bg-containerBG` : `bg-transparent`
        }`}
      >
        {isEditable ? (
          <>
            <div className="flex flex-col gap-4">
              <>
                {imgUrls ? (
                  <div className="flex justify-between border-b pb-4">
                    <div
                      className={`w-[160px] flex flex-col justify-center h-[160px] rounded-[3px]  border`}
                    >
                      <img
                        src={imgUrls}
                        className="  max-w-[160px] max-h-[160px] "
                        alt=""
                      />
                    </div>
                    <TrashIcon
                      className="w-4 h-4 hover:cursor-pointer"
                      onClick={() => handleDelete(imgUrls)}
                    />
                  </div>
                ) : (
                  `Click here`
                )}
              </>
              <button
                className={`text-xs text-linkColor mr-auto`}
                onClick={() => setOpen(true)}
              >
                Select Photos
              </button>
            </div>
          </>
        ) : (
          <div onClick={handleClick} className="hover:cursor-pointer">
            {
              <>
                <div className="flex flex-col gap-4">
                  <>
                    {imgUrls ? (
                      <div className="flex justify-between border-b pb-4">
                        <div
                          className={`w-[160px] flex flex-col justify-center h-[160px] rounded-[3px]  border`}
                        >
                          <img
                            src={imgUrls}
                            className="  max-w-[160px] max-h-[160px] "
                            alt=""
                          />
                        </div>
                      </div>
                    ) : (
                      `Click here`
                    )}
                  </>
                </div>
              </>
            }
          </div>
        )}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
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
                as={Fragment}
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
                        setImgUrls(imgUrls);
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <PhotoUpload
                      imgUrls={(newUrls) => setImgUrls(newUrls)}
                      multiple={false}
                      isOpen={(val: boolean) => setOpen(val)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
    </>
  );
};

export default PhotoField;
