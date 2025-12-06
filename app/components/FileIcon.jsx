import React, { useEffect, useRef, useState } from "react";

const FileIcon = ({ file, onDoubleClick, viewMode = "medium" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastClick, setLastClick] = useState(0);
  const iconRef = useRef(null);
  const Icon = file.icon;

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClick < 300) {
      onDoubleClick();
    }
    setLastClick(now);
  };

  return (
    <div
      ref={iconRef}
      className={`relative flex ${
        viewMode === "list" ? "flex-row gap-3 w-full" : "flex-col"
      } items-center gap-2 cursor-pointer group transition-transform hover:scale-105`}
      style={{
        transform:
          viewMode === "list"
            ? "none"
            : `translate(${position.x}px, ${position.y}px)`,
        userSelect: "none",
      }}
      onMouseDown={viewMode === "list" ? undefined : handleMouseDown}
      onClick={handleClick}
    >
      <div
        className={`${
          viewMode === "small"
            ? "w-12 h-12"
            : viewMode === "large"
            ? "w-24 h-24"
            : viewMode === "list"
            ? "w-10 h-10"
            : "w-16 h-16 md:w-20 md:h-20"
        } bg-slate-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-slate-700/50 group-hover:border-slate-600 group-hover:bg-slate-700/60 transition-all`}
      >
        <Icon
          className={`${
            viewMode === "small"
              ? "w-6 h-6"
              : viewMode === "large"
              ? "w-12 h-12"
              : viewMode === "list"
              ? "w-5 h-5"
              : "w-8 h-8 md:w-10 md:h-10"
          } ${file.color}`}
          strokeWidth={1.5}
        />
      </div>
      <span
        className={`text-white ${
          viewMode === "small"
            ? "text-xs"
            : viewMode === "large"
            ? "text-base"
            : viewMode === "list"
            ? "text-sm"
            : "text-xs md:text-sm"
        } ${
          viewMode === "list" ? "text-left flex-1" : "text-center"
        } px-2 py-1 bg-slate-900/50 backdrop-blur-sm rounded max-w-[100px] truncate`}
      >
        {file.name}
      </span>
    </div>
  );
};

export default FileIcon;
