import { Maximize2, Minus, Square, X } from "lucide-react";
import React, { useState } from "react";

const FileWindow = ({ file, onClose, onMinimize }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const Icon = file.icon;

  const renderContent = () => {
    switch (file.id) {
      case "about":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{file.data.name}</h2>
            <p className="text-slate-300">{file.data.location}</p>
            <div className="pt-4 space-y-2">
              <p className="text-slate-200 leading-relaxed">{file.data.bio}</p>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Work Experience & Leadership
            </h2>
            {file.data.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 border-purple-400 pl-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {exp.role}
                  </h3>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 text-sm hover:underline"
                    >
                      View Project →
                    </a>
                  )}
                </div>
                <p className="text-purple-400">{exp.organization}</p>
                <p className="text-slate-400 text-sm">{exp.period}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Projects</h2>
            {file.data.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 text-sm hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm">
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Technical Skills</h2>
            {Object.entries(file.data).map(([category, skills]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-green-400 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-green-400/10 text-green-300 rounded-lg border border-green-400/20 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Education</h2>
            <div className="bg-green-400/10 border border-red-400/20 rounded-lg p-6 space-y-3">
              <h3 className="text-xl font-semibold text-white">
                {file.data.institution}
              </h3>
              <p className="text-green-400">{file.data.degree}</p>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between text-slate-300">
                <p>{file.data.period}</p>
                <p className="font-semibold">CPI: {file.data.cpi}</p>
              </div>
              <p className="text-slate-400">{file.data.location}</p>
            </div>
          </div>
        );

      case "achievements":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Achievements & Recognition
            </h2>
            <div className="space-y-3">
              {file.data.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-orange-400/10 rounded-lg p-4 border border-orange-400/20"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2"></div>
                  <p className="text-slate-200 flex-1">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Contact Information
            </h2>
            <div className="space-y-4">
              {file.data.map((contact, index) => (
                <div
                  key={index}
                  className="bg-cyan-400/10 rounded-lg p-4 border border-cyan-400/20"
                >
                  <p className="text-cyan-400 text-sm mb-1">{contact.type}</p>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-300 transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-white">{contact.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p className="text-slate-400">No content available</p>;
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className={`bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized
            ? "w-full h-full max-w-full max-h-full m-0"
            : "w-full max-w-3xl max-h-[85vh]"
        }`}
      >
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button
                className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors group relative"
                onClick={onClose}
                title="Close"
              >
                <X
                  className="w-2 h-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
                  strokeWidth={3}
                />
              </button>
              <button
                className="w-2.5 h-2.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors group relative"
                onClick={handleMinimize}
                title="Minimize"
              >
                <Minus
                  className="w-2 h-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity"
                  strokeWidth={3}
                />
              </button>
              <button
                className="w-2.5 h-2.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors group relative"
                onClick={handleMaximize}
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? (
                  <Square
                    className="w-1.5 h-1.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
                    strokeWidth={3}
                  />
                ) : (
                  <Maximize2
                    className="w-1.5 h-1.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
                    strokeWidth={3}
                  />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${file.color}`} />
              <span className="text-white text-sm font-medium">
                {file.name}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FileWindow;
