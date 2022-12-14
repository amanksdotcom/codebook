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

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editorRef = useRef<any>();

  const onMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      editorRef.current = editor;
      editor.addAction({
        // An unique identifier of the contributed action.
        id: "my-unique-id",

        // A label of the action that will be presented to the user.
        label: "My Label!!!",

        // An optional array of keybindings for the action.
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
          // chord
          monaco.KeyMod.chord(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM
          ),
        ],

        contextMenuGroupId: "navigation",

        contextMenuOrder: 1.5,

        // Method that will be executed when the action is triggered.
        // @param editor The editor instance is passed in as a convenience
        run: function (ed) {
          alert("i'm running => " + ed.getPosition());
        },
      });
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
