import React from "react";
import { SiJavascript } from "react-icons/si";
import CellList from "../../components/cell-list/CellList";
import MarkdownEditor from "../../components/md-editor/MDEditor";
const Notebook = () => {
  return (
    <div>
      <header className="sticky top-0 bg-white z-10">
        <div className="py-2 border-b">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <span className="font-bold font-mono">JSnippets</span>
              <input
                type="text"
                className={`focus:outline-none focus:border px-1 `}
                defaultValue={"Untitled"}
                onClick={(e) => {
                  e.currentTarget.select();
                }}
              />
              <small>Last Checkpoint: 38 minutes ago</small>
            </div>
            <div>
              <SiJavascript size={20} />
            </div>
          </div>
        </div>
        <div className=" border-b">
          <nav className="container mx-auto text-sm flex gap-2">
            {["File", "Edit", "View", "Help"].map((item) => {
              return (
                <span
                  key={item}
                  className="px-2 py-1 hover:bg-gray-100 select-none"
                >
                  {item}
                </span>
              );
            })}
          </nav>
        </div>
      </header>
      <section
        id="notebook-content"
        className="bg-gray-100 min-h-[calc(100vh-70px)] py-6"
      >
        <div className="container mx-auto">
          <CellList />
        </div>
      </section>
    </div>
  );
};

export default Notebook;
