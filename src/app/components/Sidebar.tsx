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
  onNavClick: (idx: number) => void;
}

export default function Sidebar({ activeTab, onNavClick }: SidebarProps) {
  // Remove expand/collapse state and button
  return (
    <aside
      className="sticky left-0 top-0 h-screen z-30 flex flex-col items-center bg-white border-r border-neutral-200 w-16 py-4"
    >
      {/* No expand/collapse button */}
      <nav className="flex flex-col gap-2 flex-1 w-full items-center">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`group flex items-center w-full px-2 py-3 rounded-lg transition-colors ${activeTab === idx ? "bg-blue-100 text-blue-600" : "hover:bg-neutral-100 text-neutral-500"}`}
              onClick={() => onNavClick(idx)}
              aria-label={item.label}
            >
              <Icon className="mx-auto" size={24} strokeWidth={activeTab === idx ? 2.5 : 1.5} />
            </button>
          );
        })}
      </nav>
      <div className="mt-4 mb-2 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-lg font-bold text-white">B</div>
      </div>
    </aside>
  );
} 