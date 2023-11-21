import * as React from "react";
import { useState } from "react";

const Slider = ({ value, highLabel, lowLabel }: any) => {
  const [rangeValue, setRangeValue] = useState(value);
  return (
    <div className="flex flex-col gap-1">
      <input
        type="range"
        min={0}
        max={100}
        className="w-full"
        value={rangeValue}
        onChange={(e) => setRangeValue(e.target.value)}
      />
      <div className="flex justify-between">
        <label className="text-sm">{lowLabel}</label>
        <label className="text-sm">{highLabel}</label>
      </div>
    </div>
  );
};

export default Slider;
