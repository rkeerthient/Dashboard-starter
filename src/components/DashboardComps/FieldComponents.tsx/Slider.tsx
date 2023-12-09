import * as React from "react";
import { ChangeEvent, useState } from "react";

type SliderProps = {
  value: number;
  highLabel?: string;
  lowLabel?: string;
  fieldId: string;
};

const Slider = ({ value = 0, highLabel, lowLabel, fieldId }: SliderProps) => {
  const initValue: number = parseInt(value);

  const [rangeValue, setRangeValue] = useState<number | undefined>(value);
  const [isEditable, setIsEditable] = useState(false);
  const isContentEdited = rangeValue !== initValue;

  const handleClick = () => {
    // setIsEditable(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setTextValue(event.target.value);
  };
  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: rangeValue?.toString(),
        })
      );
      const response = await fetch(
        `/api/putFields/${`4635269`}?body=${requestBody}`
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
    // Add your save logic here
    setIsEditable(false);
  };
  return (
    <div className="flex flex-col gap-1">
      <input
        type="range"
        min={0}
        max={100}
        className="w-full"
        value={rangeValue}
        onChange={(e) => {
          setIsEditable(true), setRangeValue(parseInt(e.target.value));
        }}
      />
      <div className="flex justify-between">
        <label className="text-sm italic">{lowLabel}</label>
        <label className="text-sm italic">{highLabel}</label>
      </div>
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

export default Slider;
