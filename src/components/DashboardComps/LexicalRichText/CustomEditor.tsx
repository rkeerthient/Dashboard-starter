import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $getSelection } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useRef } from "react";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import * as React from "react";
import exampleTheme from "./themes/ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

const CustomEditor = (props: { content: any }) => {
  const editorStateRef = useRef(); // Use useRef to store the editor state

  const editorConfig = {
    // The editor theme
    theme: exampleTheme,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,

      AutoLinkNode,
      LinkNode,
    ],
  };

  function saveHandle() {
    const editorState = editorStateRef.current;
    if (editorState) {
      console.log("Saving content:", JSON.stringify(editorState));
    }
  }
  function onChange(editorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log(editorState);
    });
  }
  function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
  }

  return (
    <div className="border ">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />

            <button onClick={saveHandle}>Save</button>
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};

export default CustomEditor;
