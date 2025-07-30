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
  Grid3X3,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, type: "dashboard" },
  { label: "Projects", icon: FolderKanban, type: "projects" },
  { label: "Tasks", icon: ListChecks, type: "tasks" },
  { label: "Teams", icon: Users, type: "teams" },
  { label: "Companies", icon: Building, type: "companies" },
  { label: "Calendar", icon: Calendar, type: "calendar" },
  { label: "Reports", icon: BarChart2, type: "reports" },
  { label: "Grid Layout", icon: Grid3X3, type: "grid-layout" },
  { label: "Settings", icon: Settings, type: "settings" },
  { label: "Notifications", icon: Bell, type: "notifications" },
];

interface SidebarProps {
  activeTab: number;
  onNavClick: (idx: number) => void;
  onToggleGridMode?: () => void;
  isGridMode?: boolean;
  onDragStart?: (e: React.DragEvent, item: any) => void;
}

export default function Sidebar({ activeTab, onNavClick, onToggleGridMode, isGridMode, onDragStart }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDragStart = (e: React.DragEvent, item: any) => {
    if (onDragStart) {
      onDragStart(e, item);
    }
  };

  return (
    <aside
      className={`sticky left-0 top-0 h-screen z-30 flex flex-col items-center bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      } py-4`}
    >
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-6 p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-700"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 flex-1 w-full items-center">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isGridLayoutItem = item.label === "Grid Layout";
          const isDraggable = !isGridLayoutItem && isGridMode;
          
          return (
            <button
              key={item.label}
              className={`group flex items-center w-full px-2 py-3 rounded-lg transition-colors ${
                isGridLayoutItem && isGridMode
                  ? "bg-green-100 text-green-600" 
                  : activeTab === idx 
                  ? "bg-blue-100 text-blue-600" 
                  : "hover:bg-neutral-100 text-neutral-500"
              } ${isExpanded ? 'justify-start gap-3' : 'justify-center'} ${
                isDraggable ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
              onClick={() => {
                if (isGridLayoutItem && onToggleGridMode) {
                  onToggleGridMode();
                } else {
                  onNavClick(idx);
                }
              }}
              draggable={isDraggable}
              onDragStart={(e) => handleDragStart(e, item)}
              aria-label={item.label}
            >
              <Icon 
                className={`transition-all duration-200 ${
                  isExpanded ? 'flex-shrink-0' : 'mx-auto'
                }`} 
                size={20} 
                strokeWidth={activeTab === idx ? 2.5 : 1.5} 
              />
              {isExpanded && (
                <span className="text-xs font-medium truncate">
                  {item.label}
                </span>
              )}
              {isDraggable && isExpanded && (
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div className="mt-4 mb-2 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-white">
          B
        </div>
        {isExpanded && (
          <span className="text-xs text-neutral-500 mt-1 truncate">
            User
          </span>
        )}
      </div>
    </aside>
  );
} 