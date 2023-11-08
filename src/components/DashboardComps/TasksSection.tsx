import * as React from "react";
import { C_taskGroups, Tasks } from "../../types/dashboard_entity";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MarkdownView from "react-showdown";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useState } from "react";
import Subtasks from "./Subtasks";

const TasksSection = ({ taskGroup }: { taskGroup: C_taskGroups[] }) => {
  return (
    <>
      {taskGroup && (
        <div className="flex flex-col gap-4">
          {taskGroup.map((item: C_taskGroups, index: number) => (
            <div className="border" key={index}>
              <Disclosure className="border-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-start bg-headerBG px-4 py-2 text-left text-sm font-medium text-white">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4 text-xl">
                          <div>{item.name}</div>
                          <ChevronDownIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-7 w-7 text-white`}
                          />
                        </div>
                        <div className="text-sm">{item.description}</div>
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm bg-white text-gray-500">
                      <>
                        {item.tasks?.map((subItem: Tasks, subIndex: any) => (
                          <div key={subIndex}>
                            <Subtasks subItem={subItem} />
                          </div>
                        ))}
                      </>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TasksSection;
