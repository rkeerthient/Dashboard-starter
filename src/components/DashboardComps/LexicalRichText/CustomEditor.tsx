import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useRef } from "react";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import * as React from "react";
import { EditorThemeClasses } from "lexical";
import DefaultNodeStyling from "./DefaultStyling";
import { HashtagNode } from "@lexical/hashtag";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";

export interface LexicalRichTextProps {
  /** A JSON-serialized Lexical Dev AST. */
  serializedAST: string;
  /** CSS Class names for the various Lexical Node types. */
  nodeClassNames?: EditorThemeClasses;
}
const CustomEditor = ({
  serializedAST,
  nodeClassNames,
}: LexicalRichTextProps) => {
  const generateConfig = (editorState: string, theme?: EditorThemeClasses) => {
    return {
      namespace: "",
      onError: (error: Error) => {
        throw error;
      },
      editorState,
      theme: theme || DefaultNodeStyling,
      nodes: [
        HeadingNode,
        HashtagNode,
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

  function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
  }
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      // const markdown = $convertToMarkdownString(TRANSFORMERS);
      // onSave(markdown);
      const json = editorState.toJSON();
      console.log(JSON.stringify(json));
    });
  };

  return (
    <div className="border ">
      <LexicalComposer
        initialConfig={generateConfig(serializedAST, nodeClassNames)}
      >
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner cursor-text">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
          </div>
          <ListPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default CustomEditor;
