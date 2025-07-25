import { FolderKanban, Users, Building, Search, Filter, Plus, BarChart2 } from "lucide-react";

const companies = [
  {
    name: "Whapi Corp",
    projects: [
      { name: "Whapi Project Management", status: "Active", members: ["A", "B", "C"] },
      { name: "Client Portal", status: "Planning", members: ["A", "D"] },
    ],
  },
  {
    name: "Inkhub",
    projects: [
      { name: "Inkhub Docs", status: "Active", members: ["E", "F"] },
    ],
  },
];

const analytics = [
  { label: "Total Projects", value: 6 },
  { label: "Active", value: 4 },
  { label: "Planning", value: 2 },
];

export default function ProjectsAnalyticsPage({ open, onClose, onViewProject }: { open: boolean, onClose: () => void, onViewProject: (project: any) => void }) {
  if (!open) return null;
  return (
    <>
      {/* Sheet Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 transition-opacity" onClick={onClose} />
      {/* Sheet */}
      <div className="fixed left-0 right-0 bottom-0 z-50 max-w-5xl mx-auto rounded-t-2xl bg-white shadow-2xl animate-slide-up overflow-hidden">
        {/* Header/Tab Bar */}
        <div className="flex items-center gap-2 px-6 pt-4 bg-white border-b border-neutral-200 rounded-t-2xl">
          <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-blue-50 text-blue-700 font-semibold">
            <FolderKanban className="text-blue-500 mr-1" size={20} />
            <span>Projects</span>
          </div>
          <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close">
            ×
          </button>
        </div>
        {/* Analytics Summary */}
        <div className="flex flex-wrap gap-6 p-6 border-b border-neutral-100">
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
        <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100 bg-white">
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
        <div className="p-6 overflow-y-auto max-h-[60vh]">
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
    </>
  );
} 