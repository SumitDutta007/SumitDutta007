import {
  Award,
  Briefcase,
  Code,
  FileText,
  Folder,
  GraduationCap,
  Mail,
} from "lucide-react";
import React, { useState } from "react";
import { resumeData } from "../data/resumeData";
import FileIcon from "./FileIcon";
import FileWindow from "./FileWindow";
import MenuBar from "./MenuBar";

const MacOSDesktop = () => {
  const [openFile, setOpenFile] = useState(null);
  const [time, setTime] = useState(new Date());
  const [viewMode, setViewMode] = useState("small"); // small, medium, large, list - changed to small by default
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDesktopMaximized, setIsDesktopMaximized] = useState(false);
  const [showCloseTerminal, setShowCloseTerminal] = useState(false);
  const [closeInput, setCloseInput] = useState("");

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const files = [
    {
      id: "about",
      name: "about.txt",
      icon: FileText,
      color: "text-blue-400",
      data: resumeData.about,
    },
    {
      id: "experience",
      name: "experience.md",
      icon: Briefcase,
      color: "text-purple-400",
      data: resumeData.experience,
    },
    {
      id: "projects",
      name: "projects.json",
      icon: Folder,
      color: "text-yellow-400",
      data: resumeData.projects,
    },
    {
      id: "skills",
      name: "skills.js",
      icon: Code,
      color: "text-green-400",
      data: resumeData.skills,
    },
    {
      id: "education",
      name: "education.pdf",
      icon: GraduationCap,
      color: "text-red-400",
      data: resumeData.education,
    },
    {
      id: "achievements",
      name: "achievements.log",
      icon: Award,
      color: "text-orange-400",
      data: resumeData.achievements,
    },
    {
      id: "contact",
      name: "contact.vcf",
      icon: Mail,
      color: "text-cyan-400",
      data: resumeData.contact,
    },
  ];

  const handleFileOpen = (fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      setOpenFile(file);
      setIsMinimized(false);
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleDesktopMinimize = () => {
    // Minimize the browser window to OS taskbar
    if (window.electronAPI) {
      // If running in Electron
      window.electronAPI.minimize();
    } else {
      // For regular browsers, try to minimize using blur
      window.blur();
      // Also try to minimize if it's a popup window
      if (window.opener) {
        window.blur();
      }
      // Note: Most browsers restrict this for security, but it will work in certain contexts
    }
  };

  const handleDesktopMaximize = () => {
    // Toggle maximize without warning
    setIsDesktopMaximized(!isDesktopMaximized);
  };

  const handleDesktopClose = () => {
    // Show terminal for confirmation
    setShowCloseTerminal(true);
  };

  const handleCloseConfirm = () => {
    if (closeInput.toLowerCase().trim() === "yes") {
      // Close confirmed
      window.close(); // Attempt to close window
      // If that doesn't work (most browsers block it), show a message
      setTimeout(() => {
        alert(
          "Window cannot be closed programmatically. Please close the browser tab manually."
        );
      }, 100);
    }
    // Reset terminal
    setShowCloseTerminal(false);
    setCloseInput("");
  };

  const handleCloseCancel = () => {
    setShowCloseTerminal(false);
    setCloseInput("");
  };

  const getGridClass = () => {
    if (viewMode === "list") {
      return "flex flex-col gap-2";
    }
    const gridSizes = {
      small:
        "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4",
      medium:
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8",
      large:
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 md:gap-10",
    };
    return gridSizes[viewMode] || gridSizes.medium;
  };

  return (
    <div className="h-screen w-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Menu Bar */}
      <MenuBar
        time={time}
        onFileOpen={handleFileOpen}
        onViewChange={handleViewChange}
        currentView={viewMode}
        showWindowControls={true}
        onMinimizeDesktop={handleDesktopMinimize}
        onMaximizeDesktop={handleDesktopMaximize}
        onCloseDesktop={handleDesktopClose}
        isMaximized={isDesktopMaximized}
      />

      {/* Desktop Area */}
      <div className="h-[calc(100vh-32px)] p-4 md:p-8">
        {/* File Icons Grid */}
        <div className={getGridClass()}>
          {files.map((file) => (
            <FileIcon
              key={file.id}
              file={file}
              onDoubleClick={() => setOpenFile(file)}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>

      {/* Minimized Window Indicator */}
      {openFile && isMinimized && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 hover:bg-slate-700/90 transition-colors shadow-lg"
          >
            {React.createElement(openFile.icon, {
              className: `w-4 h-4 ${openFile.color}`,
            })}
            <span className="text-white text-sm">{openFile.name}</span>
          </button>
        </div>
      )}

      {/* File Window */}
      {openFile && !isMinimized && (
        <FileWindow
          file={openFile}
          onClose={() => setOpenFile(null)}
          onMinimize={handleMinimize}
        />
      )}

      {/* Close Confirmation Terminal */}
      {showCloseTerminal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-950/95 backdrop-blur-xl rounded-lg border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-400 text-xs ml-2">
                  Terminal — bash
                </span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              <div className="space-y-2 text-green-400">
                <p>
                  <span className="text-slate-500">user@portfolio:~$</span> exit
                </p>
                <p className="text-yellow-400">
                  ⚠️ Warning: This will close the portfolio desktop.
                </p>
                <p className="text-slate-300 mt-4">
                  Type &apos;yes&apos; to confirm or &apos;no&apos; to cancel:
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-slate-500">user@portfolio:~$</span>
                  <input
                    type="text"
                    value={closeInput}
                    onChange={(e) => setCloseInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCloseConfirm();
                      } else if (e.key === "Escape") {
                        handleCloseCancel();
                      }
                    }}
                    className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
                    autoFocus
                    placeholder="yes or no"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleCloseConfirm}
                    className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/50 rounded hover:bg-green-600/30 transition-colors"
                  >
                    Execute
                  </button>
                  <button
                    onClick={handleCloseCancel}
                    className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded hover:bg-red-600/30 transition-colors"
                  >
                    Cancel (ESC)
                  </button>
                </div>
                <p className="text-slate-500 text-xs mt-4">
                  Press Enter to execute or ESC to cancel
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacOSDesktop;
