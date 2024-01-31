import * as React from "react";
import { useEffect, useState } from "react";

type AssetProps = {
  value: (newUrls: string | string[]) => void;
  isOpen: (value: boolean) => void;
};

const Assets = ({ value, isOpen }: AssetProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetData, setAssetData] = useState([]);
  const [clicked, setClicked] = useState<number>();
  const [currentImg, setCurrentImg] = useState<string[]>([]);
  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    setIsLoading(true);
    const url = `/api/getAssets`;
    try {
      let requ = await fetch(url);
      const res = await requ.json();
      let filteredResp = await res.response.assets
        .filter((item) => item.type === "complexImage")
        .map((item) => {
          return { name: item.name, img: item.value.image.url };
        });
      setAssetData(filteredResp);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="w-full h-[80vh] ">
          <div className="grid grid-cols-4 gap-6 w-full p-12 h-5/6 overflow-scroll">
            {assetData.map((item, index) => (
              <div
                onClick={() => {
                  setClicked(index);
                  setCurrentImg(item.img);
                }}
                key={index}
                className={`h-[150px] w-[150px] border flex items-center justify-center hover:cursor-pointer hover:border-blue-400 ${
                  clicked === index ? `border-blue-700` : `border`
                }`}
              >
                <img
                  className="bg-cover max-w-full max-h-full"
                  src={item.img}
                  alt={item.name}
                />
              </div>
            ))}
          </div>
          <div className="flex mt-6 gap-3 justify-end px-4">
            <div
              onClick={() => {
                value(currentImg!);
                isOpen(false);
              }}
              className={`h-8 flex items-center bg-active rounded-md px-4 py-0 text-white text-sm ${
                isLoading
                  ? `bg-disabled pointer-events-none`
                  : `bg-active hover:cursor-pointer`
              }`}
            >
              Continue
            </div>
            <button
              onClick={() => {
                value([]);
                isOpen(false);
              }}
              className={`text-xs text-linkColor`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Assets;
