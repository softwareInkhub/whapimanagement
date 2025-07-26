import { X, Users, ListChecks, Calendar, FileText, Activity, FolderKanban, Paperclip, Building } from "lucide-react";

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

export default function ProjectsPage({ project, onClose }: { project: Project, onClose?: () => void }) {
  if (!project) return null;
  return (
    <div className="w-full">
      {/* Tab Bar */}
      <div className="flex items-center gap-2 px-6 pt-4 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-blue-50 text-blue-700 font-semibold">
          <FolderKanban className="text-blue-500 mr-1" size={20} />
          <span>Project</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close">
            <X size={18} />
          </button>
        )}
      </div>
      {/* Project Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-8 pb-4 bg-white border-b border-neutral-100">
        <div className="flex items-center gap-4">
          <FolderKanban className="text-blue-500" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-1">{project.name}</h1>
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              {project.company && <span className="flex items-center gap-1"><Building size={16} className="text-blue-400" /> {project.company}</span>}
              {project.status && <span className={`px-2 py-0.5 rounded text-xs font-medium ${project.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{project.status}</span>}
            </div>
          </div>
        </div>
      </div>
      {/* Project Content */}
      <div className="p-8 bg-white grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sections */}
        <div className="col-span-2 space-y-8">
          {/* Overview */}
          <section className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><FileText size={18} /> Overview</h3>
            <p className="text-neutral-700 mb-2">{project.description || 'No description provided.'}</p>
          </section>
          {/* Tasks */}
          {project.tasks && (
            <section className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><ListChecks size={18} /> Tasks</h3>
              <ul className="space-y-1">
                {project.tasks.map((task, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${task.status === 'Done' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-yellow-400' : 'bg-gray-300'}`}></span>
                    <span>{task.title}</span>
                    <span className="ml-auto text-xs text-neutral-400">{task.status}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* Sprints */}
          {project.sprints && (
            <section className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><Calendar size={18} /> Sprints</h3>
              <ul className="space-y-1">
                {project.sprints.map((sprint, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{sprint.name}</span>
                    <span className="text-xs text-neutral-400">{sprint.start} - {sprint.end}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {/* Sidebar Sections */}
        <div className="space-y-8">
          {/* Members */}
          {project.members && (
            <section className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><Users size={18} /> Members</h3>
              <div className="flex gap-2 flex-wrap">
                {project.members.map((m, i: number) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm" title={m}>{m}</div>
                ))}
              </div>
            </section>
          )}
          {/* Activity */}
          {project.activity && (
            <section className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><Activity size={18} /> Activity</h3>
              <ul className="space-y-1">
                {project.activity.map((a, i: number) => (
                  <li key={i} className="text-sm text-neutral-700">
                    <span className="font-medium text-blue-700">{a.user}</span> {a.action} <span className="font-medium">{a.target}</span> <span className="text-xs text-neutral-400">{a.time}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {/* Attachments */}
          {project.attachments && (
            <section className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2"><Paperclip size={18} /> Attachments</h3>
              <ul className="space-y-1">
                {project.attachments.map((att, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-blue-500"><Paperclip size={14} /></span>
                    <span>{att.name}</span>
                    <span className="ml-auto text-xs text-neutral-400">{att.size}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 