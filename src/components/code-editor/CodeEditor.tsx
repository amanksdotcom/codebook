import React, { useRef } from "react";
import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { FcInfo } from "react-icons/fc";
import { BsCodeSlash } from "react-icons/bs";

interface CodeEditorProps {
  initialValue?: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      editorRef.current = editor;
      onChange(editor.getValue());
    });
  };

  //function to format code using prettier
  const onFormatClick = () => {
    if (!editorRef.current) {
      return;
    }
    const unformattedCode = editorRef.current.getModel().getValue();
    const formattedCode = prettier
      .format(unformattedCode, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
      })
      .replace(/\n$/, ""); // removing extra new line added at end by prettier
    editorRef.current.setValue(formattedCode);
  };

  return (
    <div className="h-[calc(100%-32px)] w-[calc(100%-9px)] bg-vs-dark max-w-6xl ">
      <div className="flex px-10 py-2 justify-end gap-4 items-center">
        <button
          onClick={onFormatClick}
          className="text-white"
          title="format code"
        >
          <BsCodeSlash />
        </button>
        <button>
          <FcInfo />
        </button>
      </div>
      <MonacoEditor
        onMount={onMount}
        value={initialValue}
        language="javascript"
        theme="vs-dark"
        // height={400}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
