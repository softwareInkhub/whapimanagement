import { FolderKanban, Users, Building, Search, Filter, Plus, BarChart2 } from "lucide-react";

const companies = [
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

const analytics = [
  { label: "Total Projects", value: 6 },
  { label: "Active", value: 4 },
  { label: "Planning", value: 2 },
];

export default function ProjectsAnalyticsPage({ open, onClose, onViewProject }: { open: boolean, onClose: () => void, onViewProject: (project: any) => void }) {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FolderKanban className="text-blue-500" size={24} />
        <h1 className="text-2xl font-bold text-neutral-800">Projects</h1>
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
        {/* Search & Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-neutral-100 rounded px-3 py-2 flex-1">
            <Search size={16} className="text-neutral-400" />
            <input className="bg-transparent outline-none w-full" placeholder="Search projects..." />
          </div>
          <button className="flex items-center gap-1 px-3 py-2 bg-neutral-100 rounded hover:bg-blue-50 text-blue-700 font-medium transition">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            <Plus size={16} /> New Project
          </button>
        </div>
        {/* Projects List */}
        <div className="overflow-y-auto">
          {companies.map((company) => (
            <div key={company.name} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Building className="text-blue-400" size={18} />
                <span className="font-semibold text-neutral-700 text-lg">{company.name}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.projects.map((project) => (
                  <div key={project.name} className="p-5 bg-white border border-neutral-100 rounded-xl shadow flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <FolderKanban className="text-blue-500" size={18} />
                      <span className="font-semibold text-neutral-800">{project.name}</span>
                      <span className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${project.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{project.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Users size={14} />
                      {project.members.map((m, i) => (
                        <span key={i} className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-xs" title={m}>{m}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100" onClick={() => onViewProject && onViewProject({ ...project, company: company.name })}>View</button>
                      <button className="px-3 py-1 rounded bg-neutral-100 text-neutral-700 text-xs font-medium hover:bg-neutral-200">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
} 