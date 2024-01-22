import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { useMyContext } from "./Context/MyContext";

type ToastProps = {
  visibility: boolean;
  fieldKey: string;
  type: string;
  fieldName: string;
};

const Toast = ({ visibility, fieldKey, type, fieldName }: ToastProps) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const { setNotification } = useMyContext();
 
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (visible) {
      interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 2, 0));
      }, 100);
    }
    return () => {
      setNotification({});
      clearInterval(interval);
    };
  }, [visible]);

  useEffect(() => {
    if (progress === 0) {
      setTimeout(() => {
        setVisible(false);
      }, 100);
    }
  }, [progress]);

  return (
    <>
      {visible && (
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <Transition
              show={visible}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        className="h-6 w-6 text-[#0069c3]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className=" font-medium text-gray-900">
                        {type === "Suggestion"
                          ? `New Suggestion Posted`
                          : `Field Update`}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        {type === "Suggestion"
                          ? `New Suggestion Created for ${fieldName}(${fieldKey}).`
                          : `Field value is updated for ${fieldName}(${fieldKey})`}
                      </p>

                      <p
                        className={` mt-2 h-2 bg-[#0069c3] transition-all duration-100 ease-in-out`}
                        style={{ width: `${progress}%` }}
                      ></p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => {
                          setVisible(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
