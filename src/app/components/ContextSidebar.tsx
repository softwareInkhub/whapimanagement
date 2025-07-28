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
  CheckSquare,
  X
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



export default function ContextSidebar({ 
  activeTab = 0, 
  onAddProject, 
  onAddDepartments, 
  onAddTeams, 
  onAddSprints,
  onAddStories,
  onAddTasks,
  onOpenCompanyProjects,
  onClose
}: {
  activeTab?: number,
  onAddProject?: () => void,
  onAddDepartments?: () => void,
  onAddTeams?: () => void,
  onAddSprints?: () => void,
  onAddStories?: () => void,
  onAddTasks?: () => void,
  onOpenCompanyProjects?: (companyName: string) => void,
  onClose?: () => void,
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
    <>
      {(activeTab === 4 || activeTab === 1 || activeTab === 2 || activeTab === 3) && (
        <aside className="sticky top-0 h-screen w-[260px] bg-white border-r border-neutral-200 flex flex-col overflow-y-auto z-20">
        <>
          {/* Header */}
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">
              {activeTab === 1 ? "Project Details" : "Companies"}
            </h2>
            <div className="flex items-center gap-2">
              {activeTab === 1 ? (
                <button className="p-1 rounded hover:bg-blue-100 text-blue-600" aria-label="Add Task">
                  <Plus size={20} />
                </button>
              ) : (
                <button className="p-1 rounded hover:bg-blue-100 text-blue-600" aria-label="Add Company">
                  <Plus size={20} />
                </button>
              )}
              {onClose && (
                <button 
                  className="p-1 rounded hover:bg-neutral-100 text-neutral-600" 
                  aria-label="Close sidebar"
                  onClick={onClose}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 1 ? (
            /* Project Details Content */
            <div className="flex-1 px-4 py-4 space-y-6">
              {/* Project Overview */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <FolderKanban size={16} className="text-blue-500" />
                  Project Overview
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-900">E-commerce Platform</div>
                    <div className="text-xs text-blue-600 mt-1">Modern e-commerce platform with advanced features</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Progress</span>
                    <span className="text-neutral-900 font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Priority</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">High</span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <Users size={16} className="text-green-500" />
                  Team Members
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-700">SJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-neutral-900">Sarah Johnson</div>
                      <div className="text-xs text-neutral-500">Project Lead</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-700">MC</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-neutral-900">Mike Chen</div>
                      <div className="text-xs text-neutral-500">Frontend Dev</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-700">AL</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-neutral-900">Alex Lee</div>
                      <div className="text-xs text-neutral-500">Backend Dev</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <CheckSquare size={16} className="text-orange-500" />
                  Recent Tasks
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-neutral-900">User authentication system</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-neutral-900">Payment integration</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-neutral-900">Mobile responsive design</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <Calendar size={16} className="text-purple-500" />
                  Timeline
                </h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <div className="text-neutral-600">Start Date</div>
                    <div className="text-neutral-900 font-medium">Jan 1, 2024</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-neutral-600">End Date</div>
                    <div className="text-neutral-900 font-medium">Mar 31, 2024</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-neutral-600">Budget</div>
                    <div className="text-neutral-900 font-medium">$150K</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700 flex items-center gap-2">
                  <Zap size={16} className="text-yellow-500" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-blue-50 rounded-lg text-sm text-blue-600 font-medium">
                    Add Task
                  </button>
                  <button className="w-full text-left p-2 hover:bg-green-50 rounded-lg text-sm text-green-600 font-medium">
                    Update Progress
                  </button>
                  <button className="w-full text-left p-2 hover:bg-purple-50 rounded-lg text-sm text-purple-600 font-medium">
                    Schedule Meeting
                  </button>
                  <button className="w-full text-left p-2 hover:bg-orange-50 rounded-lg text-sm text-orange-600 font-medium">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Companies Content (existing) */
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
                          onClick={() => { 
                            if (onOpenCompanyProjects) onOpenCompanyProjects(company.name);
                          }}
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
                                <Building size={14} className="text-blue-400" />
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
                              <Calendar size={14} className="text-pink-400" />
                              <span className="text-xs">Sprint Calendar</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer transition text-neutral-600 hover:bg-neutral-100"
                                onClick={() => toggleNestedSection(company.id, "sprints", "stories")}
                              >
                                {company.sections.sprints.stories.expanded ? <ChevronDown size={14} className="text-neutral-300" /> : <ChevronRight size={14} className="text-neutral-300" />}
                                <BookOpen size={14} className="text-pink-400" />
                                <span className="text-xs">Stories</span>
                                <button
                                  className="ml-auto w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                                  onClick={e => { e.stopPropagation(); if (onAddStories) onAddStories(); }}
                                >
                                  <Plus size={10} className="text-white" />
                                </button>
                              </div>
                              {company.sections.sprints.stories.expanded && (
                                <div className="ml-4 space-y-1">
                                  {company.sections.sprints.stories.tasks && company.sections.sprints.stories.tasks.map((task) => (
                                    <div key={task} className="flex items-center gap-2 px-3 py-1 rounded-lg text-neutral-600 hover:bg-neutral-100">
                                      <CheckSquare size={12} className="text-neutral-300" />
                                      <span className="text-xs">{task}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}
        </>
        </aside>
      )}
    </>
  );
} 