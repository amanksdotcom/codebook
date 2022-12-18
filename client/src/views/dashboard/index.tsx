import React from "react";
import { SiJavascript } from "react-icons/si";
import { Container } from "../../components/container";
import { FcFolder, FcFile } from "react-icons/fc";
import { FaFolderPlus, FaFolder } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div>
      <header className="sticky top-0 bg-white z-10">
        <div className="py-2 border-b">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h3 className="font-bold font-mono">CodeBook</h3>
            </div>
            <div>
              <SiJavascript size={20} />
            </div>
          </div>
        </div>
        <div className=" border-b">
          <nav className="container mx-auto text-sm flex gap-2">
            {["File", "View", "Settings", "Help"].map((item) => {
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
      <Container id="dashboard-container">
        <div className="container mx-auto text-sm text-gray-600">
          <div className="bg-white min-h-[calc(100vh-100px)] drop-shadow-lg">
            <section className="bg-gray-200 h-10 drop-shadow-sm">
              <span className="inline-flex items-center bg-white h-full w-56 px-3 gap-2">
                <FcFolder /> Files Tree
              </span>
            </section>
            <section className="py-2 [&>*]:px-3">
              <div className="flex gap-2">
                <button className="hover:bg-gray-100 p-1 flex items-center gap-1">
                  <FcFile /> New Notebook
                </button>
                <button className="hover:bg-gray-100 p-1 flex items-center gap-1">
                  <FaFolderPlus /> New Folder
                </button>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  className="border border-cyan-900 w-full px-2 py-1 outline-1 outline-cyan-600"
                  placeholder="Filter files by name"
                />
              </div>
              <div className="my-1 py-1 flex items-center gap-2 text-[13px]">
                {["root", "notebook", "data"].map((data) => {
                  if (data == "root") {
                    return (
                      <span className="flex gap-2 items-center" key={data}>
                        <FaFolder className="cursor-pointer hover:bg-gray-200" />
                        <span>/</span>
                      </span>
                    );
                  }
                  return (
                    <span className="flex gap-2 items-center" key={data}>
                      <span className="hover:bg-gray-200 cursor-pointer">
                        {data}
                      </span>
                      <span>/</span>
                    </span>
                  );
                })}
              </div>
              <div className="flex font-medium text-black leading-7 border">
                <div className="w-4/5 border-r">Name</div>
                <div className="w-1/5 text-right">Last Modified</div>
              </div>
              <ul>
                {[
                  {
                    type: "directory",
                    title: "notebooks",
                    updated_at: "12 days ago",
                  },
                  {
                    type: "application/json",
                    title: "Untitled.cb",
                    updated_at: "1 hour ago",
                  },
                ].map((data) => {
                  return (
                    <li className="flex py-1 hover:bg-gray-200 -mx-3 px-3 cursor-default">
                      <span className="w-4/5 flex items-center gap-2">
                        {data.type === "directory" && <FaFolder />}{" "}
                        {data.type === "application/json" && <FcFile />}{" "}
                        {data.title}
                      </span>
                      <span className="w-1/5 text-right">12 days ago</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
