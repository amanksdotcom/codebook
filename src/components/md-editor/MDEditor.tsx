import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { useTypedDispatch } from "../../hooks/useTypedRedux";
import { Cell, cellActions } from "../../store";

interface MarkdownEditorProps {
  cell: Cell;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(true);
  const dispatch = useTypedDispatch();
  const { updateCell } = cellActions;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (editing && ref.current) {
      const textarea: HTMLTextAreaElement = ref.current.querySelector(
        ".w-md-editor-text-input"
      ) as HTMLTextAreaElement;
      textarea.focus();
    }
  }, [editing]);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) =>
            dispatch(updateCell({ id: cell.id, content: v || cell.content }))
          }
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <div>
        <MDEditor.Markdown
          source={cell.content || "Click to edit"}
          className="min-h-[250px] p-4 rounded-lg"
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
