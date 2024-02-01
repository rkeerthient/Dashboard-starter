import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PhotoUpload from "./PhotoUpload";
import { TrashIcon } from "@heroicons/react/20/solid";
import Actions from "../common/Actions";
import Assets from "./Assets";
interface PhotoGalleryFieldProps {
  fieldId?: string;
  initialValue?: any;
  passDataToParent?: boolean;
  setUrlData?: (urlData: string[]) => void;
  editMode?: boolean;
  textSize?: string;
}
const PhotoGalleryField = ({
  fieldId,
  initialValue,
  passDataToParent = false,
  setUrlData,
  editMode = false,
  textSize = `text-xs`,
}: PhotoGalleryFieldProps) => {
  const [open, setOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(editMode);
  const [value, setValue] = useState<string[]>(
    initialValue && initialValue.map((item: any) => item.url)
  );
  const [isContentEdited, setIsContentEdited] = useState<boolean>(false);
  const handleClick = () => {
    setIsEditable(true);
  };

  const handleDelete = (imgUrl: string | string[]) => {
    setValue(value.filter((item: any, currentIndex: any) => item !== imgUrl));
  };
  useEffect(() => {
    passDataToParent && value && setUrlData(value);
    setIsContentEdited(
      JSON.stringify(value) !==
        JSON.stringify(
          initialValue && initialValue.map((item: any) => item.url)
        )
    );
  }, [value, initialValue]);

  // const handleCancel = () => {
  //   initialValue
  //     ? setValue(initialValue.map((item: any) => item.url))
  //     : setValue([]);
  //   setIsEditable(false);
  // };
  return (
    <>
      <div
        className={`w-full  py-3  max-h-96 overflow-scroll ${
          !editMode && isEditable ? `bg-containerBG` : `bg-transparent`
        }`}
      >
        {isEditable ? (
          <>
            <div className="flex flex-col gap-4">
              {value &&
                value.length &&
                value.map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-4"
                    >
                      <div
                        className={`w-[160px] flex flex-col justify-center h-[160px] rounded-[3px]  border`}
                      >
                        <img
                          src={item}
                          className="  max-w-[160px] max-h-[160px] "
                          alt=""
                        />
                      </div>
                      <TrashIcon
                        className="w-4 h-4 hover:cursor-pointer"
                        onClick={() => handleDelete(item)}
                      />
                    </div>
                  );
                })}
              <button
                className={`${textSize}  text-linkColor mr-auto`}
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
                  {value ? (
                    value.length >= 1 &&
                    value.map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="w-[160px] flex flex-col justify-center h-[160px] border hover:border hover:border-fieldFocusBorder rounded-[3px] p-1"
                        >
                          <img
                            src={item}
                            className="  max-w-[160px] max-h-[160px] "
                            alt=""
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div>Clck here!</div>
                  )}
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
                        setValue(initialValue);
                        setOpen(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    {passDataToParent ? (
                      <Assets
                        value={(newUrls) => {
                          setValue((prevUrls: string[] | undefined) => [
                            ...(prevUrls || []),
                            ...newUrls,
                          ]);
                        }}
                        isOpen={(val: boolean) => setOpen(val)}
                        isMulti={true}
                      />
                    ) : (
                      <PhotoUpload
                        value={(newUrls) => {
                          setValue((prevUrls: string[] | undefined) => [
                            ...(prevUrls || []),
                            ...newUrls,
                          ]);
                        }}
                        multiple={true}
                        isOpen={(val: boolean) => setOpen(val)}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {!editMode && isEditable && (
        <Actions
          initialValue={initialValue}
          isContentEdited={isContentEdited}
          setIsEditable={(e) => setIsEditable(e)}
          setValue={(e) => setValue(e)}
          saveBody={{ [fieldId as string]: value }}
        />
      )}
    </>
  );
};

export default PhotoGalleryField;
