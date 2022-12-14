import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useTypedDispatch } from "../../hooks/useTypedRedux";
import { cellActions } from "../../store";
import { ICell } from "../../types";
interface MarkdownEditorProps {
  cell: ICell;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(true);
  const [inFocus, setInFocus] = useState(true);
  const dispatch = useTypedDispatch();
  const { updateCell } = cellActions;
  const ref = useRef<HTMLDivElement | null>(null);

  const isCellEmpty = () => !cell.content.trim();

  useEffect(() => {
    if (!editing || !ref.current) {
      return;
    }
    const keyboardShortcuts = function (
      this: HTMLTextAreaElement,
      e: KeyboardEvent
    ) {
      if (e.shiftKey && e.key === "Enter") {
        // removes extra newline at end added by shift+enter command
        const trimmedVal = cell.content.substring(0, cell.content.length - 1);
        dispatch(updateCell({ id: cell.id, content: trimmedVal }));
        if (isCellEmpty()) {
          this.blur();
          return;
        }
        setEditing(false);
      }
    };

    const textarea: HTMLTextAreaElement = ref.current.querySelector(
      ".w-md-editor-text-input"
    ) as HTMLTextAreaElement;
    textarea.setAttribute("data-gramm", "false");
    textarea.addEventListener("keyup", keyboardShortcuts, false);
    return () => {
      textarea.removeEventListener("keyup", keyboardShortcuts);
    };
  }, [editing, cell.content]);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          data-color-mode="light"
          autoFocus={true}
          value={cell.content}
          onChange={(v) => {
            const str = v || "";
            dispatch(updateCell({ id: cell.id, content: str }));
          }}
          preview="edit"
          height={"100%"}
          hideToolbar={true}
          highlightEnable={true}
          visibleDragbar={false}
          className={`${isCellEmpty() && "py-2"} ${editing && "border"} ${
            inFocus && "border-blue-400"
          } ${editing && !inFocus && "bg-gray-100"}`}
          minHeight={30}
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
        />
      </div>
    );
  }

  const enableEditing = () => {
    setEditing(true);
  };

  return (
    <div
      onClick={() => {
        if (isCellEmpty()) {
          enableEditing();
        }
      }}
      onDoubleClick={enableEditing}
      className={``}
      tabIndex={0}
    >
      <div data-color-mode="light">
        <MDEditor.Markdown
          source={cell.content || ""}
          className={`py-4 px-8 min-h-[30px] cursor-default ${
            isCellEmpty() && "bg-gray-100 border"
          }`}
        />
      </div>
    </div>
  );
};
