import { Battery, Maximize2, Menu, Minus, Volume2, Wifi, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const MenuBar = ({
  time,
  onFileOpen,
  onViewChange,
  currentView,
  showWindowControls = false,
  onMinimizeDesktop,
  onMaximizeDesktop,
  onCloseDesktop,
  isMaximized,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    // Get battery level if available
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = {
    File: [
      { label: "About Me", action: () => onFileOpen && onFileOpen("about") },
      {
        label: "Experience",
        action: () => onFileOpen && onFileOpen("experience"),
      },
      { label: "Projects", action: () => onFileOpen && onFileOpen("projects") },
      { label: "Skills", action: () => onFileOpen && onFileOpen("skills") },
      {
        label: "Education",
        action: () => onFileOpen && onFileOpen("education"),
      },
      {
        label: "Achievements",
        action: () => onFileOpen && onFileOpen("achievements"),
      },
      { label: "Contact", action: () => onFileOpen && onFileOpen("contact") },
    ],
    Edit: [
      {
        label: "Copy All Text",
        action: () => {
          const content =
            document.querySelector(".custom-scrollbar")?.innerText || "";
          navigator.clipboard.writeText(content);
          alert("Content copied to clipboard!");
        },
      },
      {
        label: "Select All",
        action: () => {
          const selection = window.getSelection();
          const range = document.createRange();
          const content = document.querySelector(".custom-scrollbar");
          if (content) {
            range.selectNodeContents(content);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        },
      },
      {
        label: "Find...",
        action: () => {
          const searchTerm = prompt("Search for:");
          if (searchTerm) {
            window.find(searchTerm);
          }
        },
      },
      {
        label: "Clear Selection",
        action: () => window.getSelection().removeAllRanges(),
      },
    ],
    View: [
      {
        label: "Grid View (Small)",
        action: () => onViewChange && onViewChange("small"),
        isChecked: currentView === "small",
      },
      {
        label: "Grid View (Medium)",
        action: () => onViewChange && onViewChange("medium"),
        isChecked: currentView === "medium",
      },
      {
        label: "Grid View (Large)",
        action: () => onViewChange && onViewChange("large"),
        isChecked: currentView === "large",
      },
      {
        label: "List View",
        action: () => onViewChange && onViewChange("list"),
        isChecked: currentView === "list",
      },
    ],
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleItemClick = (action) => {
    action();
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMenu(null);
  };

  return (
    <div
      className="h-8 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between px-2 md:px-4 text-white text-sm relative z-50"
      ref={menuRef}
    >
      <div className="flex items-center gap-1">
        {/* Window Controls for Desktop */}
        {showWindowControls && (
          <div className="flex gap-1.5 mr-2 md:mr-3">
            <button
              className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors group relative"
              onClick={onCloseDesktop}
              title="Close"
            >
              <X
                className="w-2 h-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </button>
            <button
              className="w-2.5 h-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors group relative"
              onClick={onMinimizeDesktop}
              title="Minimize"
            >
              <Minus
                className="w-2 h-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </button>
            <button
              className="w-2.5 h-2.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors group relative"
              onClick={onMaximizeDesktop}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2
                className="w-1.5 h-1.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </button>
          </div>
        )}

        {/* Portfolio Name - Always visible */}
        <span className="font-semibold px-1 md:px-2 text-xs md:text-sm truncate max-w-[120px] md:max-w-none">SUMIT DUTTA</span>

        {/* Desktop Menu - Hidden on small screens */}
        <div className="hidden md:flex items-center gap-1">
          {Object.keys(menuItems).map((menu) => (
            <div key={menu} className="relative">
              <button
                onClick={() => handleMenuClick(menu)}
                className={`px-2 py-1 hover:bg-slate-800/60 rounded transition-colors ${
                  activeMenu === menu ? "bg-slate-800/60" : ""
                }`}
              >
                {menu}
              </button>

              {activeMenu === menu && (
                <div className="absolute top-full left-0 mt-0.5 min-w-[200px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-2xl py-1 z-50">
                  {menuItems[menu].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemClick(item.action)}
                      className="w-full px-4 py-2 text-left hover:bg-slate-800/60 transition-colors text-sm flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      {item.isChecked && (
                        <span className="text-green-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hamburger Menu Button - Visible on small screens */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-1 hover:bg-slate-800/60 rounded transition-colors ml-1"
          title="Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* System Tray - Responsive */}
      <div className="flex items-center gap-1.5 md:gap-3">
        <Wifi className="w-3 h-3 md:w-3.5 md:h-3.5" />
        <Volume2 className="w-3 h-3 md:w-3.5 md:h-3.5 hidden sm:block" />
        <div className="flex items-center gap-0.5 md:gap-1">
          <Battery className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span className="text-slate-300 text-[10px] md:text-xs hidden sm:inline">{batteryLevel}%</span>
        </div>
        <span className="text-slate-300 text-[10px] md:text-xs">
          {time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl md:hidden">
          {Object.keys(menuItems).map((menuName) => (
            <div key={menuName} className="border-b border-slate-800/50 last:border-b-0">
              <button
                onClick={() => handleMenuClick(menuName)}
                className={`w-full px-4 py-2.5 text-left font-medium hover:bg-slate-800/60 transition-colors flex items-center justify-between ${
                  activeMenu === menuName ? "bg-slate-800/60" : ""
                }`}
              >
                <span>{menuName}</span>
                <span className={`transform transition-transform ${activeMenu === menuName ? 'rotate-90' : ''}`}>›</span>
              </button>
              
              {activeMenu === menuName && (
                <div className="bg-slate-800/30">
                  {menuItems[menuName].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemClick(item.action)}
                      className="w-full px-8 py-2 text-left text-sm hover:bg-slate-800/60 transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      {item.isChecked && (
                        <span className="text-green-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuBar;
