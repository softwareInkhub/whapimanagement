"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  Users,
  Calendar,
  BarChart2,
  Settings,
  Bell,
  ChevronRight,
  ChevronLeft,
  Building,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Tasks", icon: ListChecks },
  { label: "Teams", icon: Users },
  { label: "Companies", icon: Building },
  { label: "Calendar", icon: Calendar },
  { label: "Reports", icon: BarChart2 },
  { label: "Settings", icon: Settings },
  { label: "Notifications", icon: Bell },
];

interface SidebarProps {
  activeTab: number;
  openTabs: number[];
  onNavClick: (idx: number) => void;
  onTabClose: (idx: number) => void;
  setActiveTab: (idx: number) => void;
}

export default function Sidebar({ activeTab, openTabs, onNavClick, onTabClose, setActiveTab }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`sticky left-0 top-0 h-screen z-30 flex flex-col items-center bg-white border-r border-neutral-200 transition-all duration-200 ${expanded ? "w-56" : "w-16"} py-4 overflow-y-auto`}
    >
      <button
        className="mb-4 p-2 rounded hover:bg-neutral-100 transition"
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <nav className="flex flex-col gap-2 flex-1 w-full items-center">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`group relative flex items-center w-full px-2 py-3 rounded-lg transition-colors ${activeTab === idx ? "bg-blue-100 text-blue-600" : "hover:bg-neutral-100 text-neutral-500"}`}
              onClick={() => onNavClick(idx)}
              aria-label={item.label}
            >
              <Icon className="mx-auto" size={24} strokeWidth={activeTab === idx ? 2.5 : 1.5} />
              {!expanded && (
                <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-neutral-800 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                </span>
              )}
              {expanded && <span className="ml-3 text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
      <div className="mt-4 mb-2 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-lg font-bold text-white">B</div>
      </div>
      {/* Tabs UI */}
      <div className="absolute left-full top-0 ml-2 w-[calc(100vw-64px-260px)] max-w-[1200px]">
        <div className="flex gap-2 p-2 bg-white border-b border-neutral-200">
          {openTabs.map((idx) => (
            <div
              key={idx}
              className={`flex items-center px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === idx ? "bg-blue-100 text-blue-600" : "bg-neutral-100 text-neutral-500"}`}
              onClick={() => setActiveTab(idx)}
            >
              {navItems[idx].label}
              {openTabs.length > 1 && (
                <button
                  className="ml-2 text-xs text-neutral-400 hover:text-red-500"
                  onClick={(e) => { e.stopPropagation(); onTabClose(idx); }}
                  aria-label="Close tab"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
} 