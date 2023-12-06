import * as React from "react";
import { useState } from "react";
import LexicalRichTextEditor from "../LexicalRichText/LexicalRichTextEditor";
import LexicalMarkdownEditor from "../LexicalRichText/LexicalMarkdownEditor";
interface RichTextFieldProps {
  initialValue?: string | undefined;
  fieldId: string;
}
const RichTextField = ({ initialValue, fieldId }: RichTextFieldProps) => {
  const [textValue, setTextValue] = useState<string | object | undefined>(
    initialValue
  );
  const [isEditable, setIsEditable] = useState(false);
  const [isContentEdited, setIsContentEdited] = useState<boolean>(false);

  const handleClick = () => {
    setIsEditable(true);
  };
  const handleChange = (value: any) => {
    setTextValue(value);
  };

  const isJsonString = (str: any) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSave = async () => {
    try {
      const requestBody = encodeURIComponent(
        JSON.stringify({
          [fieldId as string]: textValue,
        })
      );
      const response = await fetch(
        `/api/fields/4635269/putFields?body=${requestBody}&format=${
          isJsonString(textValue) ? "html" : "markdown"
        }`
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
    setIsEditable(false);
  };

  return (
    <div
      className={`w-full px-4 py-3  ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <>
          {isJsonString(textValue) ? (
            <LexicalRichTextEditor
              serializedAST={JSON.parse(textValue).json}
              editable={true}
              isContentEdited={(value: boolean) => {
                setIsContentEdited(value);
              }}
              setChangedData={handleChange}
            />
          ) : (
            <LexicalMarkdownEditor
              serializedAST={textValue}
              editable={true}
              isContentEdited={(value: boolean) => {
                setIsContentEdited(value);
              }}
              setChangedData={handleChange}
            />
          )}
        </>
      ) : (
        <div onClick={handleClick} className="hover:cursor-pointer">
          {isJsonString(textValue) ? (
            <LexicalRichTextEditor
              serializedAST={
                JSON.parse(textValue).json || JSON.parse(textValue)
              }
            />
          ) : (
            <LexicalMarkdownEditor serializedAST={textValue} />
          )}
        </div>
      )}
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

export default RichTextField;
