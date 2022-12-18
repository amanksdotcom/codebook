import React from "react";
import { SiJavascript } from "react-icons/si";

export interface IHeaderProps {
  notebookTitle: string;
  setNotebookTitle: (value: string) => void;
}

export const Header: React.FC<IHeaderProps> = ({
  notebookTitle,
  setNotebookTitle,
}) => {
  return (
    <header className="sticky top-0 bg-white z-10">
      <div className="py-2 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h3 className="font-bold font-mono">CodeBook</h3>
            <input
              type="text"
              style={{ width: `${notebookTitle.length}ch` }}
              className={`focus:outline px-1 min-w-[50px]`}
              value={notebookTitle}
              onClick={(e) => {
                e.currentTarget.select();
              }}
              onChange={(e) => setNotebookTitle(e.target.value)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setNotebookTitle("Untitled");
                }
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
  );
};
