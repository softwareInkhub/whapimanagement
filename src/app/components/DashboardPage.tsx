import { FolderKanban, ListChecks, Users, Calendar, BarChart2, Activity, Plus } from "lucide-react";

const stats = [
  { label: "Projects", value: 8, icon: FolderKanban },
  { label: "Tasks", value: 124, icon: ListChecks },
  { label: "Teams", value: 4, icon: Users },
  { label: "Sprints", value: 6, icon: Calendar },
];

const recentActivity = [
  { user: "Alice", action: "completed task", target: "Design UI", time: "2h ago" },
  { user: "Bob", action: "created project", target: "Client Portal", time: "4h ago" },
  { user: "Charlie", action: "added member", target: "Team Alpha", time: "1d ago" },
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-neutral-500">Welcome back! Here’s an overview of your workspace analytics.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          <Plus size={18} /> New Project
        </button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 p-6 bg-white rounded-xl shadow border border-neutral-100">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-neutral-500 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Placeholder Chart */}
        <div className="col-span-2 bg-white rounded-xl shadow border border-neutral-100 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={20} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Project Progress</h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {/* Replace with real chart */}
            <div className="w-full h-48 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-blue-400 font-bold text-2xl">
              [Chart Placeholder]
            </div>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow border border-neutral-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <ul className="space-y-3">
            {recentActivity.map((a, i) => (
              <li key={i} className="text-sm text-neutral-700 flex items-center gap-2">
                <span className="font-medium text-blue-700">{a.user}</span> {a.action} <span className="font-medium">{a.target}</span>
                <span className="ml-auto text-xs text-neutral-400">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg hover:bg-blue-50 text-blue-700 font-medium transition">
          <Plus size={16} /> Add Task
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg hover:bg-blue-50 text-blue-700 font-medium transition">
          <Plus size={16} /> Add Team
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg hover:bg-blue-50 text-blue-700 font-medium transition">
          <Plus size={16} /> Add Sprint
        </button>
      </div>
    </div>
  );
} 