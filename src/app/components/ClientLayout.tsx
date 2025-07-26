"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./Sidebar";
import ContextSidebar from "./ContextSidebar";
import { useState } from "react";

interface Project {
  name: string;
  company?: string;
  status?: string;
  description?: string;
  tasks?: Array<{ title: string; status: string }>;
  sprints?: Array<{ name: string; start: string; end: string }>;
  members?: string[];
  activity?: Array<{ user: string; action: string; target: string; time: string }>;
  attachments?: Array<{ name: string; size: string; type: string }>;
}




import ProjectsPage from "./ProjectsPage";
import DepartmentsPage from "./DepartmentsPage";
import TeamsPageSheet from "./TeamsPageSheet";
import SprintsPage from "./SprintsPage";
import StoriesPage from "./StoriesPage";
import TasksPageSheet from "./TasksPageSheet";
import TasksPage from "./TasksPage";
import TeamsPage from "./TeamsPage";
import CalendarPage from "./CalendarPage";
import ReportsPage from "./ReportsPage";
import SettingsPage from "./SettingsPage";
import NotificationsPage from "./NotificationsPage";
import CompaniesPage from "./CompaniesPage";
import DashboardPage from "./DashboardPage";
import { X, Pin, Plus } from "lucide-react";
import ProjectsAnalyticsPage from "./ProjectsAnalyticsPage";
import NewTabPage from "./NewTabPage";
import CreateProjectPage from "./CreateProjectPage";
import CreateTaskPage from "./CreateTaskPage";
import CreateTeamPage from "./CreateTeamPage";
import CreateSprintPage from "./CreateSprintPage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SHEET_COMPONENTS: Record<string, any> = {
  project: ProjectsPage,
  departments: DepartmentsPage,
  teams: TeamsPageSheet,
  sprints: SprintsPage,
  stories: StoriesPage,
  tasks: TasksPageSheet,
  "create-project": CreateProjectPage,
  "create-task": CreateTaskPage,
  "create-team": CreateTeamPage,
  "create-sprint": CreateSprintPage,
  "edit-project": CreateProjectPage,
  "edit-task": CreateTaskPage,
  "edit-team": CreateTeamPage,
  "edit-sprint": CreateSprintPage,
  "view-project": ProjectsPage,
  "view-task": TasksPageSheet,
  "view-team": TeamsPageSheet,
  "view-sprint": SprintsPage,
  "view-department": DepartmentsPage,
  "view-story": StoriesPage,
};

export default function ClientLayout() {
  // Set Dashboard as the default open tab
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [openTabs, setOpenTabs] = useState<{ type: string; key: string; title: string; component: React.ComponentType<any>; project?: Project }[]>([
    { type: "dashboard", key: `dashboard-${Date.now()}`, title: "Dashboard", component: DashboardPage }
  ]);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [pinnedTabs, setPinnedTabs] = useState<Set<string>>(new Set());

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

  // Handlers to open new tabs
  const openTab = (type: string, title?: string) => {
    setOpenTabs((prev) => {
      // Prevent duplicate tabs of the same type (optional, or allow multiple)
      if (prev.some((tab) => tab.type === type)) {
        const idx = prev.findIndex((tab) => tab.type === type);
        setActiveTabIdx(idx);
        return prev;
      }
      
      // Find the component from sidebarTabMap or SHEET_COMPONENTS
      let component;
      let tabTitle = title;
      
      // Check if it's a main sidebar tab
      const sidebarTab = sidebarTabMap.find(tab => tab.type === type);
      if (sidebarTab) {
        component = sidebarTab.component;
        tabTitle = tabTitle || sidebarTab.title;
      } else {
        // Check if it's a sheet component
        component = SHEET_COMPONENTS[type];
        tabTitle = tabTitle || type.charAt(0).toUpperCase() + type.slice(1);
      }
      
      if (!component) {
        console.warn(`No component found for type: ${type}`);
        return prev;
      }
      
      // Add new tab at the end and set as active
      const newTabs = [...prev, { type, key: `${type}-${Date.now()}`, title: tabTitle, component }];
      setActiveTabIdx(newTabs.length - 1);
      return newTabs;
    });
  };

  const closeTab = (idx: number) => {
    setOpenTabs((prev) => {
      const newTabs = prev.filter((_, i) => i !== idx);
      // If we're closing the active tab, switch to the previous tab or the first tab
      if (idx === activeTabIdx) {
        if (newTabs.length === 0) {
          // If no tabs left, open dashboard
          setActiveTabIdx(0);
          return [{ type: "dashboard", key: `dashboard-${Date.now()}`, title: "Dashboard", component: DashboardPage }];
        } else {
          setActiveTabIdx(Math.max(0, idx - 1));
        }
      } else if (idx < activeTabIdx) {
        // If we're closing a tab before the active tab, adjust the active index
        setActiveTabIdx(activeTabIdx - 1);
      }
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
      const newTabs = [...prev, { type: "new-tab", key: `new-tab-${Date.now()}`, title: "New Tab", component: NewTabPage }];
      setActiveTabIdx(newTabs.length - 1);
      return newTabs;
    });
  };

  const onSidebarNavClick = (idx: number) => {
    const tab = sidebarTabMap[idx];
    setOpenTabs((prev) => {
      const existingIdx = prev.findIndex((t) => t.type === tab.type);
      if (existingIdx !== -1) {
        // If tab already exists, switch to it
        setActiveTabIdx(existingIdx);
        return prev;
      }
      // If tab doesn't exist, add it at the end and set as active
      const newTabs = [...prev, { ...tab, key: `${tab.type}-${Date.now()}` }];
      setActiveTabIdx(newTabs.length - 1); // Set to the new tab
      return newTabs;
    });
  };

  // Handler to open a project details tab from analytics sheet
  const onViewProject = (project: Project) => {
    setOpenTabs((prev) => {
      const existingIdx = prev.findIndex((t) => t.type === "project-details" && t.project?.name === project.name);
      if (existingIdx !== -1) {
        setActiveTabIdx(existingIdx);
        return prev;
      }
      // Add project tab at the end
      const newTabs = [
        ...prev,
        {
          type: "project-details",
          key: `project-details-${project.name}-${Date.now()}`,
          title: "Project", // Fixed title to show "Project" instead of project name
          component: ProjectsPage,
          project,
        },
      ];
      setActiveTabIdx(newTabs.length - 1);
      return newTabs;
    });
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
        onNavClick={onSidebarNavClick}
      />
      {/* Only show ContextSidebar when Companies is active and not viewing a project details tab */}
      {sidebarActiveTab === 4 && !(openTabs[activeTabIdx]?.type === 'project-details') && (
        <ContextSidebar
          activeTab={sidebarActiveTab}
          onAddProject={() => openTab("project", "Projects")}
          onAddDepartments={() => openTab("departments", "Departments")}
          onAddTeams={() => openTab("teams", "Teams")}
          onAddSprints={() => openTab("sprints", "Sprints")}
          onAddStories={() => openTab("stories", "Stories")}
          onAddTasks={() => openTab("tasks", "Tasks")}
        />
      )}
      <main className="flex-1 min-w-0 bg-background flex flex-col">
        {/* Tab Bar Container */}
        <div className="flex items-center bg-white border-b border-neutral-200 h-10">
          {/* Pinned Tabs (fixed, always visible) */}
          <div className="flex items-center gap-0 pl-2">
            {openTabs.filter(tab => pinnedTabs.has(tab.key)).map((tab) => {
              const globalIdx = openTabs.findIndex(t => t.key === tab.key);
              const isActive = activeTabIdx === globalIdx;
              return (
                <div
                  key={tab.key}
                  className={`group flex items-center h-10 px-4 border-r border-neutral-200 cursor-pointer transition-all whitespace-nowrap min-w-max select-none
                    ${isActive ? "font-bold text-neutral-900 bg-white" : "font-normal text-neutral-700 bg-white hover:bg-neutral-100"}
                  `}
                  onClick={() => setActiveTabIdx(globalIdx)}
                  style={{ 
                    borderRadius: 0,
                    borderBottom: isActive ? '4px solid #2563eb' : '2px solid transparent'
                  }}
                >
                  <span className="truncate max-w-[120px]">{tab.title}</span>
                  {/* Pin Button - Always visible for pinned, gold color */}
                  <button
                    onClick={e => { e.stopPropagation(); togglePinTab(tab.key); }}
                    className="ml-1 p-1 rounded transition-colors text-yellow-400 hover:text-yellow-500"
                    aria-label="Pin tab"
                  >
                    <Pin size={14} className={pinnedTabs.has(tab.key) ? "fill-current" : ""} />
                  </button>
                  {/* Close Button */}
                  <button
                    onClick={e => { e.stopPropagation(); closeTab(globalIdx); }}
                    className="ml-1 p-1 rounded transition-colors text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
                    aria-label="Close tab"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Scrollable Tabs (non-pinned) */}
          <div className="flex items-center gap-0 flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
            {openTabs.filter(tab => !pinnedTabs.has(tab.key)).map((tab) => {
              const globalIdx = openTabs.findIndex(t => t.key === tab.key);
              const isActive = activeTabIdx === globalIdx;
              return (
                <div
                  key={tab.key}
                  className={`group flex items-center h-10 px-4 border-r border-neutral-200 cursor-pointer transition-all whitespace-nowrap min-w-max select-none
                    ${isActive ? "font-bold text-neutral-900 bg-white" : "font-normal text-neutral-700 bg-white hover:bg-neutral-100"}
                  `}
                  onClick={() => setActiveTabIdx(globalIdx)}
                  style={{ 
                    borderRadius: 0,
                    borderBottom: isActive ? '4px solid #2563eb' : '2px solid transparent'
                  }}
                >
                  <span className="truncate max-w-[120px]">{tab.title}</span>
                  {/* Pin Button - Show on hover */}
                  <button
                    onClick={e => { e.stopPropagation(); togglePinTab(tab.key); }}
                    className="ml-1 p-1 rounded transition-colors text-neutral-400 hover:text-neutral-600 opacity-0 group-hover:opacity-100"
                    aria-label="Pin tab"
                  >
                    <Pin size={14} />
                  </button>
                  {/* Close Button */}
                  <button
                    onClick={e => { e.stopPropagation(); closeTab(globalIdx); }}
                    className="ml-1 p-1 rounded transition-colors text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
                    aria-label="Close tab"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* New Tab Button */}
          <div className="flex items-center px-2 border-l border-neutral-200">
            <button
              onClick={openNewTab}
              className="p-1 rounded transition-colors text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
              aria-label="New tab"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          {openTabs[activeTabIdx] && (() => {
            const TabComponent = openTabs[activeTabIdx].component;
            return (
              <div className="h-full">
                <TabComponent
                  open={true}
                  onClose={() => closeTab(activeTabIdx)}
                  onOpenTab={openTab}
                  project={openTabs[activeTabIdx].project}
                />
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
} 