import { useState, useRef, useEffect } from "react";
import { FolderKanban, Users, Building, Search, Filter, Plus, BarChart2, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Trash2, Edit, Archive, MoreHorizontal } from "lucide-react";

const initialCompanies = [
  {
    name: "Whapi Corp",
    projects: [
      {
        name: "Whapi Project Management",
        status: "Active",
        members: ["A", "B", "C"],
        description: "Comprehensive project management platform for enterprise teams",
        tasks: [
          { id: 1, title: "Design UI Components", status: "Completed", assignee: "A" },
          { id: 2, title: "Implement Authentication", status: "In Progress", assignee: "B" },
          { id: 3, title: "Database Schema Design", status: "Pending", assignee: "C" }
        ],
        sprints: [
          { id: 1, name: "Sprint 1", status: "Completed", tasks: 8 },
          { id: 2, name: "Sprint 2", status: "Active", tasks: 12 }
        ],
        progress: 65,
        startDate: "2024-01-15",
        endDate: "2024-06-30"
      },
      {
        name: "Client Portal",
        status: "Planning",
        members: ["A", "D"],
        description: "Customer-facing portal for client management",
        tasks: [
          { id: 1, title: "Requirements Gathering", status: "Completed", assignee: "A" },
          { id: 2, title: "Architecture Design", status: "In Progress", assignee: "D" }
        ],
        sprints: [
          { id: 1, name: "Planning Sprint", status: "Active", tasks: 5 }
        ],
        progress: 25,
        startDate: "2024-03-01",
        endDate: "2024-08-31"
      },
    ],
  },
  {
    name: "Inkhub",
    projects: [
      {
        name: "Inkhub Docs",
        status: "Active",
        members: ["E", "F"],
        description: "Documentation platform for development teams",
        tasks: [
          { id: 1, title: "API Documentation", status: "Completed", assignee: "E" },
          { id: 2, title: "User Guide Creation", status: "In Progress", assignee: "F" },
          { id: 3, title: "Integration Testing", status: "Pending", assignee: "E" }
        ],
        sprints: [
          { id: 1, name: "Sprint 1", status: "Completed", tasks: 6 },
          { id: 2, name: "Sprint 2", status: "Active", tasks: 8 }
        ],
        progress: 45,
        startDate: "2024-02-01",
        endDate: "2024-07-31"
      },
    ],
  },
];

const statusTabs = ["All", "Active", "Planning", "Completed", "Archived"];
const analytics = [
  { label: "Total Projects", value: 6 },
  { label: "Active", value: 4 },
  { label: "Planning", value: 2 },
  { label: "Completed", value: 1 },
  { label: "Overdue", value: 0 },
];
const sortOptions = [
  { label: "Name", value: "name" },
  { label: "Status", value: "status" },
  { label: "Progress", value: "progress" },
  { label: "Start Date", value: "startDate" },
  { label: "End Date", value: "endDate" },
];

interface Project {
  name: string;
  status: string;
  members: string[];
  description: string;
  tasks: Array<{ id: number; title: string; status: string; assignee: string }>;
  sprints: Array<{ id: number; name: string; status: string; tasks: number }>;
  progress: number;
  startDate: string;
  endDate: string;
  company?: string;
  archived?: boolean;
}

export default function ProjectsAnalyticsPage({ onViewProject, onOpenTab }: { onViewProject: (project: Project) => void, onOpenTab?: (type: string, title?: string, project?: Project) => void }) {
  // State for all companies/projects
  const [companies, setCompanies] = useState(initialCompanies);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterCompany, setFilterCompany] = useState<string>("");
  const [filterMember, setFilterMember] = useState<string>("");
  const [page, setPage] = useState(1);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<string | null>(null);
  const pageSize = 10;

  // Flatten all projects for filtering/sorting
  let allProjects: Project[] = [];
  companies.forEach(company => {
    company.projects.forEach(project => {
      allProjects.push({ ...project, company: company.name });
    });
  });

  // Filters
  let filtered = allProjects.filter(p =>
    (activeTab === "All" || p.status === activeTab) &&
    (!filterStatus || p.status === filterStatus) &&
    (!filterCompany || p.company === filterCompany) &&
    (!filterMember || p.members.includes(filterMember)) &&
    (!p.archived || activeTab === "Archived")
  );
  // Search
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.company?.toLowerCase().includes(search.toLowerCase()));
  }
  // Sort
  filtered = filtered.sort((a, b) => {
    if (sort === "progress") return sortAsc ? a.progress - b.progress : b.progress - a.progress;
    const aVal = a[sort as keyof Project];
    const bVal = b[sort as keyof Project];
    const aStr = aVal !== undefined && aVal !== null ? String(aVal) : "";
    const bStr = bVal !== undefined && bVal !== null ? String(bVal) : "";
    return sortAsc ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });
  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Bulk actions
  const bulkArchive = () => {
    setCompanies(prev => prev.map(company => ({
      ...company,
      projects: company.projects.map(p => selected[p.name] ? { ...p, archived: true } : p)
    })));
    setSelected({});
  };
  const bulkDelete = () => {
    setCompanies(prev => prev.map(company => ({
      ...company,
      projects: company.projects.filter(p => !selected[p.name])
    })));
    setSelected({});
  };
  
  // Single actions
  const archiveProject = (project: Project) => {
    setCompanies(prev => prev.map(company => ({
      ...company,
      projects: company.projects.map(p => p.name === project.name ? { ...p, archived: true } : p)
    })));
  };
  const deleteProject = (project: Project) => {
    setCompanies(prev => prev.map(company => ({
      ...company,
      projects: company.projects.filter(p => p.name !== project.name)
    })));
  };
  const duplicateProject = (project: Project) => {
    const newProject = {
      ...project,
      name: `${project.name} (Copy)`,
      progress: 0,
      status: "Planning"
    };
    setCompanies(prev => prev.map(company => 
      company.name === project.company 
        ? { ...company, projects: [...company.projects, newProject] }
        : company
    ));
  };
  const exportProject = (project: Project) => {
    const dataStr = JSON.stringify(project, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Unique companies and members for filters
  const allCompanies = Array.from(new Set(allProjects.map(p => p.company)));
  const allMembers = Array.from(new Set(allProjects.flatMap(p => p.members)));

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const all: Record<string, boolean> = {};
      paginated.forEach(p => all[p.name] = true);
      setSelected(all);
    } else {
      setSelected({});
    }
  };

  // Handle individual select
  const handleSelectProject = (projectName: string, checked: boolean) => {
    setSelected(prev => ({ ...prev, [projectName]: checked }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterStatus("");
    setFilterCompany("");
    setFilterMember("");
    setSearch("");
    setPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters = filterStatus || filterCompany || filterMember || search;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FolderKanban className="text-blue-500" size={24} />
        <h1 className="text-2xl font-bold text-neutral-800">Projects</h1>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-neutral-200">
        {statusTabs.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 -mb-px border-b-2 transition font-medium ${activeTab === tab ? "border-blue-600 text-blue-700" : "border-transparent text-neutral-500 hover:text-blue-700"}`}
            onClick={() => { setActiveTab(tab); setPage(1); }}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Analytics Summary */}
      <div className="flex flex-wrap gap-6 mb-6">
        {analytics.map((a) => (
          <div key={a.label} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
            <BarChart2 className="text-blue-400" size={20} />
            <div>
              <div className="text-xl font-bold">{a.value}</div>
              <div className="text-neutral-500 text-sm">{a.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Search, Filters, Sort, Bulk Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-neutral-100 rounded px-3 py-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-neutral-400" />
          <input className="bg-transparent outline-none w-full" placeholder="Search projects..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        {/* Status Filter */}
        <select className="px-3 py-2 rounded bg-neutral-100 border border-neutral-200 text-sm" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {statusTabs.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
        </select>
        {/* Company Filter */}
        <select className="px-3 py-2 rounded bg-neutral-100 border border-neutral-200 text-sm" value={filterCompany} onChange={e => { setFilterCompany(e.target.value); setPage(1); }}>
          <option value="">All Companies</option>
          {allCompanies.map(c => <option key={c}>{c}</option>)}
        </select>
        {/* Member Filter */}
        <select className="px-3 py-2 rounded bg-neutral-100 border border-neutral-200 text-sm" value={filterMember} onChange={e => { setFilterMember(e.target.value); setPage(1); }}>
          <option value="">All Members</option>
          {allMembers.map(m => <option key={m}>{m}</option>)}
        </select>
        <button className="flex items-center gap-1 px-3 py-2 bg-neutral-100 rounded hover:bg-blue-50 text-blue-700 font-medium transition" onClick={() => setShowFilters(f => !f)}>
          <Filter size={16} /> Filters
        </button>
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button className="flex items-center gap-1 px-3 py-2 bg-neutral-100 rounded hover:bg-red-50 text-red-700 font-medium transition" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            type="button"
            className="flex items-center gap-1 px-3 py-2 bg-neutral-100 rounded hover:bg-blue-50 text-blue-700 font-medium transition" 
            onClick={() => setShowSortDropdown(prev => !prev)}
          >
            Sort: {sortOptions.find(o => o.value === sort)?.label}
            {showSortDropdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {showSortDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white border border-neutral-200 rounded shadow-lg z-50 min-w-[120px]">
              {sortOptions.map(o => (
                <button 
                  key={o.value} 
                  type="button"
                  className={`block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm ${sort === o.value ? 'bg-blue-50 text-blue-700' : ''}`} 
                  onClick={() => {
                    setSort(o.value);
                    setShowSortDropdown(false);
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => onOpenTab && onOpenTab("create-project")}> <Plus size={16} /> New Project </button>
        {Object.values(selected).some(Boolean) && (
          <>
            <button className="flex items-center gap-1 px-3 py-2 bg-neutral-100 rounded hover:bg-yellow-100 text-yellow-700 font-medium transition" onClick={bulkArchive}><Archive size={16} /> Archive</button>
            <button className="flex items-center gap-1 px-3 py-2 bg-neutral-100 rounded hover:bg-red-100 text-red-700 font-medium transition" onClick={bulkDelete}><Trash2 size={16} /> Delete</button>
          </>
        )}
      </div>
      {/* Filters (placeholder) */}
      {showFilters && (
        <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200 rounded-lg flex gap-4 items-center">
          <span className="text-neutral-500">Advanced filters coming soon...</span>
        </div>
      )}
      {/* Projects List */}
      <div className="overflow-y-auto">
        {paginated.length === 0 ? (
          <div className="text-center text-neutral-400 py-16">
            <AlertCircle size={32} className="mx-auto mb-4" />
            <div className="text-lg font-semibold mb-2">No projects found</div>
            <div className="mb-4">Try adjusting your filters or create a new project.</div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition" onClick={() => onOpenTab && onOpenTab("create-project")}>Create Project</button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-neutral-500 border-b border-neutral-200">
                <th className="px-2 py-2">
                  <input 
                    type="checkbox" 
                    checked={paginated.every(p => selected[p.name])} 
                    onChange={e => handleSelectAll(e.target.checked)} 
                  />
                </th>
                <th className="px-2 py-2 text-left cursor-pointer" onClick={() => { setSort("name"); setSortAsc(s => !s); }}>Project {sort === "name" && (sortAsc ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="px-2 py-2 text-left cursor-pointer" onClick={() => { setSort("company"); setSortAsc(s => !s); }}>Company {sort === "company" && (sortAsc ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="px-2 py-2 text-left cursor-pointer" onClick={() => { setSort("status"); setSortAsc(s => !s); }}>Status {sort === "status" && (sortAsc ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="px-2 py-2 text-left cursor-pointer" onClick={() => { setSort("progress"); setSortAsc(s => !s); }}>Progress {sort === "progress" && (sortAsc ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="px-2 py-2 text-left">Members</th>
                <th className="px-2 py-2 text-left">Dates</th>
                <th className="px-2 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(project => (
                <tr key={project.name} className="border-b border-neutral-100 hover:bg-neutral-50 transition">
                  <td className="px-2 py-2">
                    <input 
                      type="checkbox" 
                      checked={!!selected[project.name]} 
                      onChange={e => handleSelectProject(project.name, e.target.checked)} 
                    />
                  </td>
                  <td className="px-2 py-2 font-semibold flex items-center gap-2">
                    <FolderKanban className="text-blue-400" size={16} />
                    {project.name}
                  </td>
                  <td className="px-2 py-2">
                    <button className="underline text-blue-600 hover:text-blue-800" onClick={() => { setFilterCompany(project.company || ""); setPage(1); }}>{project.company}</button>
                  </td>
                  <td className="px-2 py-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${project.status === "Active" ? "bg-green-100 text-green-700" : project.status === "Planning" ? "bg-yellow-100 text-yellow-700" : project.status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-neutral-100 text-neutral-500"}`}>{project.status}</span>
                  </td>
                  <td className="px-2 py-2">
                    <div className="w-28 h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className={`h-2 rounded-full ${project.progress === 100 ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-neutral-500 ml-1">{project.progress}%</span>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex gap-1">
                      {project.members.map((m, i) => (
                        <button key={i} className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-xs hover:bg-blue-200" title={m} onClick={() => { setFilterMember(m); setPage(1); }}>{m}</button>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex flex-col text-xs">
                      <span>Start: {project.startDate}</span>
                      <span>End: {project.endDate}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-blue-50 text-blue-600" title="View" onClick={() => onViewProject && onViewProject(project)}><CheckCircle size={16} /></button>
                      <button className="p-1 rounded hover:bg-yellow-50 text-yellow-600" title="Edit" onClick={() => onOpenTab && onOpenTab("edit-project", `Edit: ${project.name}`, project)}><Edit size={16} /></button>
                      <button className="p-1 rounded hover:bg-neutral-100 text-neutral-500" title="Archive" onClick={() => archiveProject(project)}><Archive size={16} /></button>
                      <button className="p-1 rounded hover:bg-red-50 text-red-600" title="Delete" onClick={() => deleteProject(project)}><Trash2 size={16} /></button>
                      <div className="relative group">
                        <button 
                          className="p-1 rounded hover:bg-neutral-100 text-neutral-500" 
                          title="More" 
                          onClick={() => setShowMoreMenu(showMoreMenu === project.name ? null : project.name)}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        {showMoreMenu === project.name && (
                          <div className="absolute right-0 top-8 z-10 bg-white border border-neutral-200 rounded shadow min-w-[120px]">
                            <button 
                              className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm" 
                              onClick={() => {
                                duplicateProject(project);
                                setShowMoreMenu(null);
                              }}
                            >
                              Duplicate
                            </button>
                            <button 
                              className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm" 
                              onClick={() => {
                                exportProject(project);
                                setShowMoreMenu(null);
                              }}
                            >
                              Export
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="px-3 py-1 rounded bg-neutral-100 hover:bg-blue-50" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-neutral-100 hover:bg-blue-50"}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="px-3 py-1 rounded bg-neutral-100 hover:bg-blue-50" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>&gt;</button>
          </div>
        )}
      </div>
    </div>
  );
} 