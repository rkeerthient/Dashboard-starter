import * as React from "react";

const UITypes = () => {
  return (
    <div className="w-full">
      {(() => {
        switch (type) {
          case "string":
            return (
              <>
                <Textbox initialValue={initialValue}></Textbox>
              </>
            );
          case "option":
            return (
              <>
                <Picklist
                  initialValue={initialValue}
                  options={fieldData.response.type.optionType.option}
                ></Picklist>
              </>
            );
          case "decimal":
            return (
              <>
                <Slider />
              </>
            );
          case "list":
            switch (fieldData.response.type.listType.typeId) {
              case "option":
                return (
                  <>
                    <Checkbox
                      initialValue={initialValue}
                      checkboxes={
                        fieldData.response.type.listType.type.optionType.option
                      }
                    ></Checkbox>
                  </>
                );
              case "string":
                return <>string list</>;
            }
          default:
            return <>Null</>;
        }
      })()}
    </div>
  );
};

export default UITypes;
