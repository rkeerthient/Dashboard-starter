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
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import DefaultNodeStyling from "./DefaultStyling";
import * as React from "react";
import { ImageNode } from "./imageNode";

export interface LexicalRichTextProps {
  serializedAST: string;
  nodeClassNames?: EditorThemeClasses;
  isEditMode?: boolean;
}

const CustomEditor = ({
  serializedAST,
  nodeClassNames,
  isEditMode = false,
}: LexicalRichTextProps) => {
  TRANSFORMERS.push({
    format: ["underline"],
    type: "text-format",
    tag: "++",
  });

  const generateConfig = (editorState: string, theme?: EditorThemeClasses) => {
    return {
      namespace: "",
      editable: isEditMode,
      onError: (error) => {
        throw error;
      },
      editorState: () => $convertFromMarkdownString(editorState, TRANSFORMERS),
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
      const json = editorState.toJSON();
    });
  };

  return (
    <div className={`${isEditMode && `border`}`}>
      <LexicalComposer
        initialConfig={generateConfig(serializedAST, nodeClassNames)}
      >
        <span className={`${isEditMode ? `block` : `hidden`}`}>
          <ToolbarPlugin />
        </span>
        {isEditMode ? (
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={<Placeholder />}
          />
        ) : (
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={<Placeholder />}
          />
        )}
        <ListPlugin />
      </LexicalComposer>
    </div>
  );
};

export default CustomEditor;
