import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useTypedDispatch } from "../../hooks/useTypedRedux";
import { Cell, cellActions } from "../../store";
import styles from "./MDEditor.module.css";

interface MarkdownEditorProps {
  cell: Cell;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useTypedDispatch();
  const { updateCell } = cellActions;
  const ref = useRef<HTMLDivElement | null>(null);
  const [inFocus, setInFocus] = useState(false);

  const isCellEmpty = () => !cell.content.trim();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log("in");
        return;
      }
      if (isCellEmpty()) {
        console.log("editing false");
        setEditing(false);
      } else {
        console.log("out");
      }
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (!editing || !ref.current) {
      return;
    }
    const shortcut = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "Enter") {
        setEditing(false);
      }
    };
    const textarea: HTMLTextAreaElement = ref.current.querySelector(
      ".w-md-editor-text-input"
    ) as HTMLTextAreaElement;
    textarea.setAttribute("data-gramm", "false");
    textarea.addEventListener("keyup", shortcut, false);
    return () => {
      textarea.removeEventListener("keyup", shortcut);
    };
  }, [editing]);

  // useEffect(() => {
  //   console.log(cell.content);
  // }, [cell.content]);

  if (editing) {
    return (
      <div ref={ref} className={styles.markdownEditor}>
        <MDEditor
          data-color-mode="light"
          autoFocus={true}
          value={cell.content}
          onChange={(v) =>
            dispatch(updateCell({ id: cell.id, content: v || "" }))
          }
          preview="edit"
          height={"100%"}
          hideToolbar={true}
          highlightEnable={true}
          visibleDragbar={false}
          className={`${isCellEmpty() && "py-2"} ${editing && "border"}`}
          minHeight={30}
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
      className={`shadow`}
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

export default MarkdownEditor;
