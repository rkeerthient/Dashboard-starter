import * as React from "react";
import { useState } from "react";
import LexicalRichTextEditor from "../LexicalRichText/LexicalRichTextEditor";
import LexicalMarkdownEditor from "../LexicalRichText/LexicalMarkdownEditor";
import { useMyContext } from "../../Context/MyContext";
import Actions from "../common/Actions";
interface RichTextFieldProps {
  initialValue?: string | undefined;
  fieldId: string;
}
const RichTextField = ({ initialValue, fieldId }: RichTextFieldProps) => {
  const [value, setValue] = useState<string | object | undefined>(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const [isContentEdited, setIsContentEdited] = useState<boolean>(false);
  const { userRole } = useMyContext();
  const handleClick = () => {
    setIsEditable(true);
  };
  const handleChange = (value: any) => {
    setValue(value);
  };

  const isJsonString = (str: any) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div
      className={`w-full px-4 py-3  ${
        isEditable ? `bg-containerBG` : `bg-transparent`
      }`}
    >
      {isEditable ? (
        <>
          {isJsonString(value) ? (
            <LexicalRichTextEditor
              serializedAST={JSON.parse(value).json}
              editable={true}
              isContentEdited={(value: boolean) => {
                setIsContentEdited(value);
              }}
              setChangedData={handleChange}
            />
          ) : (
            <LexicalMarkdownEditor
              serializedAST={""}
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
          {isJsonString(value) ? (
            <LexicalRichTextEditor
              serializedAST={JSON.parse(value).json || JSON.parse(value)}
            />
          ) : (
            `Click here`
          )}
        </div>
      )}
      {isEditable && (
        <Actions
          initialValue={initialValue}
          isContentEdited={isContentEdited}
          setIsEditable={(e) => setIsEditable(e)}
          setValue={(e) => setValue(e)}
          saveBody={{ [fieldId as string]: value }}
        />
      )}
    </div>
  );
};

export default RichTextField;
