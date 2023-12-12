import { useState } from "react";
import * as React from "react";
const FontSelector = () => {
  const [selectedFont, setSelectedFont] = useState<string>("font-sans");

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(event.target.value);
  };

  return (
    <div className="mt-4 centered-container">
      <div className="mt-4 flex justify-between items-center">
        <select
          className="p-2 border rounded"
          onChange={handleFontChange}
          value={selectedFont}
        >
          <option value="font-sans">Sans-serif</option>
          <option value="font-serif">Serif</option>
          <option value="font-mono">Monospace</option>
          <option value="font-bangers">Bangers</option>
          <option value="font-roboto">Roboto</option>
          <option value="font-opensans">Open Sans</option>
          <option value="font-lato">Lato</option>
          <option value="font-recursive">Recursive</option>
          <option value="font-poppins">Poppins</option>
          <option value="font-bowlby">Bowl by one</option>
        </select>

        <div className={`mt-4 ${selectedFont} w-1/2`}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
          <span className="font-bold"> molestias</span>, dicta asperiores
          aliquid quae amet tempora excepturi doloremque neque magnam nihil
          soluta inventore nobis ratione sint repellat optio labore mollitia?
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
