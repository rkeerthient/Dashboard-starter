import * as React from "react";
import { useMyContext } from "../../Context/MyContext";
type Action_Props = {
  initialValue: any;
  isContentEdited: boolean;
  setIsEditable: (isEditable: boolean) => void;
  setValue: (value: any) => void;
  saveBody: any;
};
const Actions = ({
  initialValue,
  isContentEdited,
  setIsEditable,
  setValue,
  saveBody,
}: Action_Props) => {
  const { userRole, setData, setNotification } = useMyContext();

  const updateValue = (propertyName: string, newValue: any) => {
    setData((prevData) => ({
      ...prevData,
      [propertyName]: newValue,
    }));
  };

  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(JSON.stringify(saveBody));
      const response = await fetch(
        `/api/putFields/${`4635269`}?body=${requestBody}&userRole=${
          userRole.acl[0].roleId
        }`
      );
      const res = await response.json();
      // Test Here
      // if (!res.meta.errors.length) {
      //   res.operationType === "Update"
      //     ? setNotification({
      //         content: `Value updated for ${Object.keys(saveBody)[0]}`,
      //         type: `Update`,
      //       })
      //     : setNotification({
      //         content: `Suggestion Created for ${Object.keys(saveBody)[0]}`,
      //         type: `Suggestion`,
      //       });
      //   updateValue(
      //     Object.keys(saveBody)[0],
      //     saveBody[Object.keys(saveBody)[0]]
      //   );
      // } else {
      //   setNotification({
      //     content: `Suggestion Created for ${Object.keys(saveBody)[0]}`,
      //     type: `Suggestion`,
      //   });
      // }
      !res.meta.errors.length && updateValue;
    } catch (error) {
      console.error(
        `Failed to fetch field configuration for ${JSON.stringify(error)}:`,
        error
      );
    }
    setIsEditable(false);
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditable(false);
  };

  return (
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
  );
};

export default Actions;
