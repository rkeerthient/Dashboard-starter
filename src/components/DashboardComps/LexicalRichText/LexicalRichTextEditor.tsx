import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HashtagNode } from "@lexical/hashtag";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, EditorThemeClasses } from "lexical";
import DefaultNodeStyling from "./DefaultStyling";
import * as React from "react";
import { ImageNode } from "./imageNode";
import { useRef, useState } from "react";

export interface LexicalRichTextEditorProps {
  serializedAST: string | object | undefined;
  nodeClassNames?: EditorThemeClasses;
  editable?: boolean;
  isContentEdited?: (value: boolean) => void;
  setChangedData?: (value: string | object | any) => void;
}

const LexicalRichTextEditor = ({
  serializedAST,
  nodeClassNames,
  editable = false,
  isContentEdited,
  setChangedData,
}: LexicalRichTextEditorProps) => {
  const editorStateRef = useRef<EditorState | null>(null);
  const [initJson, setInitJson] = useState<any>();

  const generateConfig = (editorState: any, theme?: EditorThemeClasses) => {
    return {
      namespace: "",
      editable: editable,
      onError: (error: Error) => {
        throw error;
      },
      editorState: editorState,
      theme: theme ?? DefaultNodeStyling,
      nodes: [
        HeadingNode,
        HashtagNode,
        ImageNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        HorizontalRuleNode,
      ],
    };
  };

  const Placeholder = () => (
    <div className="editor-placeholder">Enter some rich text...</div>
  );
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const json = editorState;
      !initJson && setInitJson(json);
      const updatedContent = editorState;

      const contentEdited =
        JSON.stringify(initJson) !== JSON.stringify(updatedContent);

      if (isContentEdited) {
        isContentEdited(contentEdited);
        setChangedData?.(JSON.stringify(updatedContent));
      }
    });
  };

  return (
    <div className={`${editable && `border bg-white !text-[#777777]`}`}>
      <LexicalComposer
        initialConfig={generateConfig(
          JSON.stringify(serializedAST),
          nodeClassNames
        )}
      >
        <span className={`${editable ? `block` : `hidden`} border-b`}>
          <ToolbarPlugin />
          <hr />
        </span>
        {editable ? (
          <>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              ErrorBoundary={LexicalErrorBoundary}
              placeholder={<Placeholder />}
            />
            <OnChangePlugin
              onChange={(editorState) =>
                onChange((editorStateRef.current = editorState))
              }
            />
          </>
        ) : (
          <>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              ErrorBoundary={LexicalErrorBoundary}
              placeholder={<Placeholder />}
            />
          </>
        )}
        <ListPlugin />
      </LexicalComposer>
    </div>
  );
};

export default LexicalRichTextEditor;
