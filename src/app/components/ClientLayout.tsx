"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./Sidebar";
import ContextSidebar from "./ContextSidebar";
import { useState } from "react";
import ProjectsPage from "./ProjectsPage";
import DepartmentsPage from "./DepartmentsPage";
import TeamsPageSheet from "./TeamsPageSheet";
import SprintsPage from "./SprintsPage";
import TasksPage from "./TasksPage";
import TeamsPage from "./TeamsPage";
import CalendarPage from "./CalendarPage";
import ReportsPage from "./ReportsPage";
import SettingsPage from "./SettingsPage";
import NotificationsPage from "./NotificationsPage";
import CompaniesPage from "./CompaniesPage";
import DashboardPage from "./DashboardPage";
import { X } from "lucide-react";
import ProjectsAnalyticsPage from "./ProjectsAnalyticsPage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navItems = [
  { label: "Dashboard", component: DashboardPage },
  { label: "Projects", component: ProjectsPage },
  { label: "Tasks", component: TasksPage },
  { label: "Teams", component: TeamsPage },
  { label: "Companies", component: CompaniesPage },
  { label: "Calendar", component: CalendarPage },
  { label: "Reports", component: ReportsPage },
  { label: "Settings", component: SettingsPage },
  { label: "Notifications", component: NotificationsPage },
];

const SHEET_COMPONENTS = {
  project: ProjectsPage,
  departments: DepartmentsPage,
  teams: TeamsPageSheet,
  sprints: SprintsPage,
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Remove default openTabs for project details
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [showProjectsAnalytics, setShowProjectsAnalytics] = useState(false);

  // Handlers to open new tabs
  const openTab = (type: string, title: string) => {
    setOpenTabs((prev) => {
      // Prevent duplicate tabs of the same type (optional, or allow multiple)
      if (prev.some((tab) => tab.type === type)) {
        const idx = prev.findIndex((tab) => tab.type === type);
        setActiveTabIdx(idx);
        return prev;
      }
      return [...prev, { type, key: `${type}-${Date.now()}`, title, component: SHEET_COMPONENTS[type] }];
    });
    setActiveTabIdx(openTabs.length); // Will be the new tab
  };

  const closeTab = (idx: number) => {
    setOpenTabs((prev) => {
      const newTabs = prev.filter((_, i) => i !== idx);
      // Adjust active tab if needed
      if (activeTabIdx >= newTabs.length) setActiveTabIdx(newTabs.length - 1);
      return newTabs;
    });
  };

  // Map sidebar index to tab type and title
  const sidebarTabMap = [
    { type: "dashboard", title: "Dashboard", component: DashboardPage },
    { type: "project", title: "Whapi Project Management", component: ProjectsPage },
    { type: "tasks", title: "Tasks", component: TasksPage },
    { type: "teams", title: "Teams", component: TeamsPageSheet },
    { type: "companies", title: "Companies", component: CompaniesPage },
    { type: "calendar", title: "Calendar", component: CalendarPage },
    { type: "reports", title: "Reports", component: ReportsPage },
    { type: "settings", title: "Settings", component: SettingsPage },
    { type: "notifications", title: "Notifications", component: NotificationsPage },
  ];

  const onSidebarNavClick = (idx: number) => {
    const tab = sidebarTabMap[idx];
    if (tab.type === "project") {
      setShowProjectsAnalytics(true);
      return;
    }
    setOpenTabs((prev) => {
      const existingIdx = prev.findIndex((t) => t.type === tab.type);
      if (existingIdx !== -1) {
        setActiveTabIdx(existingIdx);
        return prev;
      }
      return [...prev, { ...tab, key: `${tab.type}-${Date.now()}` }];
    });
    setActiveTabIdx(openTabs.length); // Will be the new tab
  };

  // Handler to open a project details tab from analytics sheet
  const onViewProject = (project) => {
    setOpenTabs((prev) => {
      const existingIdx = prev.findIndex((t) => t.type === "project-details" && t.project?.name === project.name);
      if (existingIdx !== -1) {
        setActiveTabIdx(existingIdx);
        return prev;
      }
      return [
        ...prev,
        {
          type: "project-details",
          key: `project-details-${project.name}-${Date.now()}`,
          title: project.name,
          component: ProjectsPage,
          project,
        },
      ];
    });
    setActiveTabIdx(openTabs.length);
  };

  // Map tab type to sidebar index
  const sidebarIndexMap: Record<string, number> = {
    dashboard: 0,
    project: 1,
    tasks: 2,
    teams: 3,
    companies: 4,
    calendar: 5,
    reports: 6,
    settings: 7,
    notifications: 8,
  };
  const sidebarActiveTab = sidebarIndexMap[openTabs[activeTabIdx]?.type] ?? 0;

  // Pass these handlers to ContextSidebar
  return (
    <div className={`flex h-screen w-screen overflow-hidden ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
      <Sidebar
        activeTab={sidebarActiveTab}
        openTabs={[]}
        onNavClick={onSidebarNavClick}
        onTabClose={() => {}}
        setActiveTab={setActiveTabIdx}
      />
      {/* Only show ContextSidebar when Companies is active and not viewing a project details tab */}
      {sidebarActiveTab === 4 && !(openTabs[activeTabIdx]?.type === 'project-details') && (
        <ContextSidebar
          activeTab={sidebarActiveTab}
          onAddProject={() => openTab("project", "Whapi Project Management")}
          onAddDepartments={() => openTab("departments", "Departments")}
          onAddTeams={() => openTab("teams", "Teams")}
          onAddSprints={() => openTab("sprints", "Sprints")}
          onOpenCompany={() => openTab("companies", "Companies")}
        />
      )}
      <main className="flex-1 min-w-0 bg-background overflow-y-auto">
        {/* Tab Bar */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-white border-b border-neutral-200">
          {openTabs.map((tab, idx) => (
            <div
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold cursor-pointer ${activeTabIdx === idx ? "bg-blue-50 text-blue-700" : "bg-neutral-100 text-neutral-700"}`}
              onClick={() => setActiveTabIdx(idx)}
            >
              {tab.type === "project" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3z"/><path d="M9 3v18"/><path d="M15 3v18"/></svg></span>}
              {tab.type === "departments" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M8 3.13a4 4 0 0 0 0 7.75"/></svg></span>}
              {tab.type === "teams" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a4.5 4.5 0 0 1 9 0v2"/><path d="M17 11v2a4 4 0 0 1-8 0v-2"/></svg></span>}
              {tab.type === "sprints" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg></span>}
              <span>{tab.title}</span>
              <button onClick={e => { e.stopPropagation(); closeTab(idx); }} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close"><X size={18} /></button>
            </div>
          ))}
          <button className="ml-2 text-neutral-400 hover:text-blue-500 text-xl font-bold">+</button>
          <button className="ml-2 text-neutral-400 hover:text-blue-500 text-xl font-bold">&#8230;</button>
        </div>
        {/* Active Tab Content */}
        {openTabs[activeTabIdx] && (() => {
          const TabComponent = openTabs[activeTabIdx].component;
          return <TabComponent open={true} onClose={() => closeTab(activeTabIdx)} project={openTabs[activeTabIdx].project} />;
        })()}
        {/* Projects Analytics Sheet */}
        {showProjectsAnalytics && <ProjectsAnalyticsPage open={showProjectsAnalytics} onClose={() => setShowProjectsAnalytics(false)} onViewProject={onViewProject} />}
      </main>
    </div>
  );
} 