"use client";
import {
  FolderKanban,
  Plus,
  Building2,
  Building,
  ChevronDown,
  ChevronRight,
  Users,
  User,
  Zap,
  Calendar,
  BookOpen,
  CheckSquare
} from "lucide-react";
import { useState } from "react";

const companies = [
  {
    id: 1,
    name: "whapi project management",
    expanded: true,
    sections: {
      projects: { expanded: false },
      departments: { expanded: false, subdepartments: ["HR", "Engineering", "Design"] },
      teams: { expanded: false, subteams: ["Frontend", "Backend", "QA"] },
      sprints: { 
        expanded: false, 
        calendar: true, 
        stories: { 
          expanded: false, 
          tasks: ["Task 1", "Task 2", "Task 3"] 
        } 
      },
    }
  }
];

console.log('Initial companies data:', companies);

const namespaces = [
  "FSHIP",
  "Google Sheet",
  "ewrere",
  "Google Cloud Search",
  "pinterest",
  "Gmail",
  "Google Calender",
  "Easebuzz API",
  "Google Docs Api",
  "BRHM Project Management",
  "fintech",
  "Shopify Products",
  "shopify",
  "youtube",
  "Test AI Namespace",
  "Inkhub",
  "brmh",
  "Razorpay",
];

// Companies tab index (after Teams, before Calendar)
const COMPANIES_TAB_INDEX = 4;

export default function ContextSidebar({ activeTab = 0, onAddProject, onAddDepartments, onAddTeams, onAddSprints }: {
  activeTab?: number,
  onAddProject?: () => void,
  onAddDepartments?: () => void,
  onAddTeams?: () => void,
  onAddSprints?: () => void,
}) {
  const [companiesList, setCompaniesList] = useState(companies);

  // Helper to toggle section expansion
  const toggleSection = (companyId: number, section: string) => {
    setCompaniesList(prev => prev.map(c =>
      c.id === companyId
        ? { ...c, sections: { ...c.sections, [section]: { ...c.sections[section as keyof typeof c.sections], expanded: !c.sections[section as keyof typeof c.sections].expanded } } }
        : c
    ));
  };

  // Helper to toggle nested section expansion (like stories within sprints)
  const toggleNestedSection = (companyId: number, parentSection: string, nestedSection: string) => {
    console.log('Toggling nested section:', { companyId, parentSection, nestedSection });
    setCompaniesList(prev => {
      const newList = prev.map(c =>
        c.id === companyId
          ? { 
              ...c, 
              sections: { 
                ...c.sections, 
                                [parentSection]: {
                  ...c.sections[parentSection as keyof typeof c.sections],
                  [nestedSection]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ...(c.sections[parentSection as keyof typeof c.sections] as any)[nestedSection],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    expanded: !(c.sections[parentSection as keyof typeof c.sections] as any)[nestedSection].expanded
                  }
                } 
              } 
            }
          : c
      );
      console.log('New companies list:', newList);
      return newList;
    });
  };

  return (
    <aside className="sticky top-0 h-screen w-[260px] bg-white border-r border-neutral-200 flex flex-col overflow-y-auto z-20">
      {activeTab === COMPANIES_TAB_INDEX ? (
        <>
          {/* Header */}
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Companies</h2>
            <button className="p-1 rounded hover:bg-blue-100 text-blue-600" aria-label="Add Company">
              <Plus size={20} />
            </button>
          </div>

          {/* Companies List */}
          <nav className="flex-1 px-2 pb-4 space-y-1 overflow-y-auto">
            {companiesList.map((company) => (
              <div key={company.id} className="space-y-1">
                {/* Company Header */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-neutral-50 relative group">
                  <button
                    className="p-1 rounded hover:bg-neutral-100 transition-colors"
                    onClick={() => {
                      setCompaniesList(prev => prev.map(c =>
                        c.id === company.id ? { ...c, expanded: !c.expanded } : c
                      ));
                    }}
                  >
                    {company.expanded ? <ChevronDown size={16} className="text-neutral-400" /> : <ChevronRight size={16} className="text-neutral-400" />}
                  </button>
                  <Building2 size={18} className="text-blue-500" />
                  <span className="text-sm font-semibold text-neutral-800 flex-1">{company.name}</span>
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-600">AI</span>
                  </div>
                </div>

                {/* Company Sections - Only show when expanded */}
                {company.expanded && (
                  <div className="ml-6 space-y-1">
                    {/* Projects */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-neutral-50 group">
                      <ChevronRight size={16} className="text-neutral-400" />
                      <FolderKanban size={16} className="text-blue-400" />
                      <span className="text-sm font-medium">Projects</span>
                      <button
                        className="ml-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                        onClick={() => { if (onAddProject) onAddProject(); }}
                      >
                        <Plus size={12} className="text-white" />
                      </button>
                    </div>

                    {/* Departments */}
                    <div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-neutral-50 group"
                        onClick={() => toggleSection(company.id, "departments")}
                      >
                        {company.sections.departments.expanded ? <ChevronDown size={16} className="text-neutral-400" /> : <ChevronRight size={16} className="text-neutral-400" />}
                        <Building size={16} className="text-purple-500" />
                        <span className="text-sm font-medium">Departments</span>
                        <button
                          className="ml-auto w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                          onClick={e => { e.stopPropagation(); if (onAddDepartments) onAddDepartments(); }}
                        >
                          <Plus size={12} className="text-white" />
                        </button>
                      </div>
                      {company.sections.departments.expanded && (
                        <div className="ml-6 space-y-1">
                          {company.sections.departments.subdepartments && company.sections.departments.subdepartments.map((sub) => (
                            <div key={sub} className="flex items-center gap-2 px-3 py-1 rounded-lg text-neutral-600 hover:bg-neutral-100">
                              <ChevronRight size={14} className="text-neutral-300" />
                              <Building size={14} className="text-purple-400" />
                              <span className="text-xs">{sub}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Teams */}
                    <div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-neutral-50 group"
                        onClick={() => toggleSection(company.id, "teams")}
                      >
                        {company.sections.teams.expanded ? <ChevronDown size={16} className="text-neutral-400" /> : <ChevronRight size={16} className="text-neutral-400" />}
                        <Users size={16} className="text-blue-500" />
                        <span className="text-sm font-medium">Teams</span>
                        <button
                          className="ml-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                          onClick={e => { e.stopPropagation(); if (onAddTeams) onAddTeams(); }}
                        >
                          <Plus size={12} className="text-white" />
                        </button>
                      </div>
                      {company.sections.teams.expanded && (
                        <div className="ml-6 space-y-1">
                          {company.sections.teams.subteams && company.sections.teams.subteams.map((sub) => (
                            <div key={sub} className="flex items-center gap-2 px-3 py-1 rounded-lg text-neutral-600 hover:bg-neutral-100">
                              <ChevronRight size={14} className="text-neutral-300" />
                              <User size={14} className="text-blue-400" />
                              <span className="text-xs">{sub}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Sprints */}
                    <div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-neutral-50 group"
                        onClick={() => toggleSection(company.id, "sprints")}
                      >
                        {company.sections.sprints.expanded ? <ChevronDown size={16} className="text-neutral-400" /> : <ChevronRight size={16} className="text-neutral-400" />}
                        <Zap size={16} className="text-pink-500" />
                        <span className="text-sm font-medium">Sprints</span>
                        <button
                          className="ml-auto w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                          onClick={e => { e.stopPropagation(); if (onAddSprints) onAddSprints(); }}
                        >
                          <Plus size={12} className="text-white" />
                        </button>
                      </div>
                      {company.sections.sprints.expanded && (
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-lg text-neutral-600 hover:bg-neutral-100">
                            <ChevronRight size={14} className="text-neutral-300" />
                            <Calendar size={14} className="text-pink-400" />
                            <span className="text-xs">Calendar</span>
                          </div>
                          <div 
                            className="flex items-center gap-2 px-3 py-1 rounded-lg text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                            onClick={() => toggleNestedSection(company.id, "sprints", "stories")}
                          >
                            {company.sections.sprints.stories.expanded ? <ChevronDown size={14} className="text-neutral-400" /> : <ChevronRight size={14} className="text-neutral-300" />}
                            <BookOpen size={14} className="text-green-400" />
                            <span className="text-xs">Stories</span>
                          </div>
                          {(() => {
                            console.log('Stories state:', company.sections.sprints.stories);
                            return company.sections.sprints.stories.expanded && company.sections.sprints.stories.tasks && company.sections.sprints.stories.tasks.map((task) => (
                              <div key={task} className="flex items-center gap-2 px-6 py-1 rounded-lg text-neutral-500 hover:bg-neutral-100">
                                <ChevronRight size={12} className="text-neutral-300" />
                                <CheckSquare size={12} className="text-green-400" />
                                <span className="text-xs">{task}</span>
                              </div>
                            ));
                          })()}
                        </div>
                      )}
                    </div>


                  </div>
                )}
              </div>
            ))}
          </nav>
        </>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Namespaces</h2>
            <button className="p-1 rounded hover:bg-blue-100 text-blue-600" aria-label="Add Namespace">
              <Plus size={20} />
            </button>
          </div>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded bg-neutral-100 border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <nav className="flex-1 px-2 pb-4 space-y-1 overflow-y-auto">
            {namespaces.map((ns, idx) => (
              <div
                key={ns}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-blue-50 hover:text-blue-600 ${idx === 0 ? "bg-blue-50 text-blue-600" : ""}`}
              >
                <FolderKanban size={18} className="text-blue-400" />
                <span className="text-sm font-medium truncate">{ns}</span>
              </div>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
} 