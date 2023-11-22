// src/App.tsx
import * as React from "react";
import { useState } from "react";
import * as ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Turndown from "turndown";

const MarkdownEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleChange = (value: string) => {
    setContent(value);
  };

  const convertToMarkdown = () => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(content);
    console.log("Markdown:", markdown);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      <button onClick={convertToMarkdown}>Convert to Markdown</button>
    </div>
  );
};

export default App;
