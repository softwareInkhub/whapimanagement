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
import { X, Pin, Plus, MoreHorizontal } from "lucide-react";
import ProjectsAnalyticsPage from "./ProjectsAnalyticsPage";
import NewTabPage from "./NewTabPage";

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
  const [pinnedTabs, setPinnedTabs] = useState<Set<string>>(new Set());

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

  const togglePinTab = (tabKey: string) => {
    setPinnedTabs((prev) => {
      const newPinned = new Set(prev);
      if (newPinned.has(tabKey)) {
        newPinned.delete(tabKey);
      } else {
        newPinned.add(tabKey);
      }
      return newPinned;
    });
  };

  const openNewTab = () => {
    setOpenTabs((prev) => {
      const newTab = {
        type: "new-tab",
        key: `new-tab-${Date.now()}`,
        title: "Create New",
        component: NewTabPage,
      };
      const newTabs = [...prev, newTab];
      setActiveTabIdx(newTabs.length - 1);
      return newTabs;
    });
  };

  // Map sidebar index to tab type and title
  const sidebarTabMap = [
    { type: "dashboard", title: "Dashboard", component: DashboardPage },
    { type: "projects", title: "Projects", component: ProjectsAnalyticsPage },
    { type: "tasks", title: "Tasks", component: TasksPage },
    { type: "teams", title: "Teams", component: TeamsPage },
    { type: "companies", title: "Companies", component: CompaniesPage },
    { type: "calendar", title: "Calendar", component: CalendarPage },
    { type: "reports", title: "Reports", component: ReportsPage },
    { type: "settings", title: "Settings", component: SettingsPage },
    { type: "notifications", title: "Notifications", component: NotificationsPage },
  ];

  const onSidebarNavClick = (idx: number) => {
    const tab = sidebarTabMap[idx];
    setOpenTabs((prev) => {
      const existingIdx = prev.findIndex((t) => t.type === tab.type);
      if (existingIdx !== -1) {
        // If tab already exists, switch to it
        setActiveTabIdx(existingIdx);
        return prev;
      }
      // If tab doesn't exist, add it and set as active
      const newTabs = [...prev, { ...tab, key: `${tab.type}-${Date.now()}` }];
      setActiveTabIdx(newTabs.length - 1); // Set to the new tab
      return newTabs;
    });
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
          title: "Project", // Fixed title to show "Project" instead of project name
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
    projects: 1,
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
        {/* Tab Bar Container */}
        <div className="flex items-center bg-white border-b border-neutral-200">
          {/* Scrollable Tab Area */}
          <div className="flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 hover:scrollbar-thumb-neutral-400">
            <div className="flex items-center gap-2 px-6 pt-4 pb-2 min-w-max">
              {openTabs.map((tab, idx) => (
                <div
                  key={tab.key}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold cursor-pointer transition-all whitespace-nowrap ${
                    activeTabIdx === idx 
                      ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600" 
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  } ${pinnedTabs.has(tab.key) ? "border-l-4 border-l-orange-400" : ""}`}
                  onClick={() => setActiveTabIdx(idx)}
                >
                  {/* Tab Icons */}
                  {tab.type === "project" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3z"/><path d="M9 3v18"/><path d="M15 3v18"/></svg></span>}
                  {tab.type === "departments" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M8 3.13a4 4 0 0 0 0 7.75"/></svg></span>}
                  {tab.type === "teams" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a4.5 4.5 0 0 1 9 0v2"/><path d="M17 11v2a4 4 0 0 1-8 0v-2"/></svg></span>}
                  {tab.type === "sprints" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg></span>}
                  {tab.type === "companies" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M8 3.13a4 4 0 0 0 0 7.75"/></svg></span>}
                  {tab.type === "dashboard" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>}
                  {tab.type === "tasks" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>}
                  {tab.type === "calendar" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg></span>}
                  {tab.type === "reports" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg></span>}
                  {tab.type === "settings" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>}
                  {tab.type === "notifications" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></span>}
                  {tab.type === "new-tab" && <span className="mr-1"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg></span>}
                  
                  <span>{tab.title}</span>
                  
                  {/* Pin Button - Show on hover */}
                  <button 
                    onClick={e => { 
                      e.stopPropagation(); 
                      togglePinTab(tab.key); 
                    }} 
                    className={`ml-1 p-1 rounded transition-colors ${
                      pinnedTabs.has(tab.key) 
                        ? "text-orange-500 hover:text-orange-600" 
                        : "text-neutral-400 hover:text-orange-500 opacity-0 group-hover:opacity-100"
                    }`} 
                    aria-label="Pin tab"
                  >
                    <Pin size={14} className={pinnedTabs.has(tab.key) ? "fill-current" : ""} />
                  </button>
                  
                  {/* Close Button */}
                  <button 
                    onClick={e => { e.stopPropagation(); closeTab(idx); }} 
                    className="ml-1 p-1 text-neutral-400 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100" 
                    aria-label="Close tab"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fixed Action Buttons */}
          <div className="flex items-center gap-2 px-4 py-4 bg-white border-l border-neutral-200">
            {/* Add New Tab Button */}
            <button 
              onClick={openNewTab}
              className="p-2 text-neutral-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
              aria-label="Add new tab"
            >
              <Plus size={18} />
            </button>
            
            {/* More Options Button */}
            <button className="p-2 text-neutral-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" aria-label="More options">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
        {/* Active Tab Content */}
        {openTabs[activeTabIdx] && (() => {
          const TabComponent = openTabs[activeTabIdx].component;
          return <TabComponent 
            open={true} 
            onClose={() => closeTab(activeTabIdx)} 
            project={openTabs[activeTabIdx].project}
            onViewProject={openTabs[activeTabIdx].type === "projects" ? onViewProject : undefined}
          />;
        })()}

      </main>
    </div>
  );
} 