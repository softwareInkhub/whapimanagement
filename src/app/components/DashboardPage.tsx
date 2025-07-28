import { FolderKanban, ListChecks, Users, Calendar, BarChart2, Activity, Plus, TrendingUp, Clock, CheckCircle, UserPlus, FolderPlus, Bell, AlertCircle, Star, Target, Zap, Award, TrendingDown, Eye, MessageSquare, Download, Filter } from "lucide-react";

const stats = [
  { 
    label: "Active Projects", 
    value: 8, 
    icon: FolderKanban, 
    action: "projects",
    trend: "+12%",
    trendUp: true,
    color: "from-blue-500 to-blue-600",
    description: "From last month"
  },
  { 
    label: "Total Tasks", 
    value: 124, 
    icon: ListChecks, 
    action: "tasks",
    trend: "+8%",
    trendUp: true,
    color: "from-emerald-500 to-emerald-600",
    description: "23 completed today"
  },
  { 
    label: "Teams", 
    value: 4, 
    icon: Users, 
    action: "teams",
    trend: "+2",
    trendUp: true,
    color: "from-purple-500 to-purple-600",
    description: "12 active members"
  },
  { 
    label: "Sprints", 
    value: 6, 
    icon: Calendar, 
    action: "sprints",
    trend: "On track",
    trendUp: false,
    color: "from-orange-500 to-orange-600",
    description: "2 ending this week"
  },
];

const recentActivity = [
  { 
    user: "Alice Johnson", 
    action: "completed task", 
    target: "Design UI", 
    time: "2h ago",
    avatar: "AJ",
    type: "task-completed",
    icon: CheckCircle,
    priority: "high"
  },
  { 
    user: "Bob Smith", 
    action: "created project", 
    target: "Client Portal", 
    time: "4h ago",
    avatar: "BS",
    type: "project-created",
    icon: FolderPlus,
    priority: "medium"
  },
  { 
    user: "Charlie Davis", 
    action: "added member", 
    target: "Team Alpha", 
    time: "1d ago",
    avatar: "CD",
    type: "member-added",
    icon: UserPlus,
    priority: "low"
  },
  { 
    user: "Diana Wilson", 
    action: "started sprint", 
    target: "Sprint 3", 
    time: "1d ago",
    avatar: "DW",
    type: "sprint-started",
    icon: Calendar,
    priority: "medium"
  },
];

const projectProgress = [
  { name: "E-commerce Platform", progress: 85, status: "In Progress", color: "bg-blue-500", team: "Frontend Team", deadline: "Dec 15", budget: "$12,500" },
  { name: "Mobile App", progress: 62, status: "In Progress", color: "bg-emerald-500", team: "Mobile Team", deadline: "Jan 20", budget: "$8,200" },
  { name: "Dashboard Redesign", progress: 45, status: "In Progress", color: "bg-purple-500", team: "Design Team", deadline: "Dec 30", budget: "$5,800" },
  { name: "API Integration", progress: 92, status: "Almost Done", color: "bg-orange-500", team: "Backend Team", deadline: "Dec 10", budget: "$3,200" },
];

const teamMembers = [
  { name: "Alice Johnson", role: "UI/UX Designer", avatar: "AJ", status: "online", tasks: 8, projects: 3 },
  { name: "Bob Smith", role: "Frontend Developer", avatar: "BS", status: "online", tasks: 12, projects: 2 },
  { name: "Charlie Davis", role: "Backend Developer", avatar: "CD", status: "away", tasks: 6, projects: 4 },
  { name: "Diana Wilson", role: "Project Manager", avatar: "DW", status: "online", tasks: 15, projects: 5 },
];

const notifications = [
  { type: "success", message: "Project 'E-commerce Platform' is 85% complete", time: "5m ago", icon: CheckCircle },
  { type: "warning", message: "Sprint 'Mobile App v2' ends in 2 days", time: "15m ago", icon: AlertCircle },
  { type: "info", message: "New team member 'Eve Chen' joined", time: "1h ago", icon: UserPlus },
  { type: "success", message: "All tasks completed for 'Dashboard Redesign'", time: "2h ago", icon: CheckCircle },
];

const quickStats = [
  { label: "Tasks Completed", value: "23", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Hours Logged", value: "156", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Team Velocity", value: "87%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Code Quality", value: "A+", icon: Star, color: "text-orange-600", bg: "bg-orange-50" },
];

export default function DashboardPage({ onOpenTab }: { onOpenTab?: (type: string) => void }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header with Notifications */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="relative">
                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <Bell size={20} className="text-slate-600" />
                </button>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </div>
            </div>
            <p className="text-slate-600 text-lg font-medium">
              Welcome back! Here&apos;s an overview of your workspace analytics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring">
              <Filter size={16} />
              Filter
            </button>
            <button className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring">
              <Download size={16} />
              Export
            </button>
            <button
              className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
              onClick={() => onOpenTab && onOpenTab("create-project")}
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
              New Project
            </button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
          {quickStats.map((stat, index) => (
            <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <button
              key={stat.label}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 p-6 text-left hover:scale-105 transition-all duration-300 hover:bg-white/90 hover-lift focus-ring animate-fade-in"
              onClick={() => onOpenTab?.(stat.action)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                   style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[2]})` }}>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trendUp ? (
                      <TrendingUp size={14} className="text-emerald-500" />
                    ) : (
                      <TrendingDown size={14} className="text-slate-400" />
                    )}
                    <span className={stat.trendUp ? "text-emerald-600 font-medium" : "text-slate-500"}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600 font-medium mb-2">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced Analytics & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Project Progress Chart */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <BarChart2 size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Project Progress</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            <div className="space-y-6">
              {projectProgress.map((project, index) => (
                <div key={project.name} className="space-y-3 animate-fade-in" style={{ animationDelay: `${800 + index * 100}ms` }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-700">{project.name}</span>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span>{project.team}</span>
                        <span>•</span>
                        <span>Due {project.deadline}</span>
                        <span>•</span>
                        <span>{project.budget}</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${project.color} rounded-full progress-animate`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${project.color}`}></div>
                      <span className="text-xs text-slate-500">{project.status}</span>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 animate-fade-in" style={{ animationDelay: '700ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <Activity size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/50 transition-colors duration-200 animate-fade-in" style={{ animationDelay: `${900 + index * 100}ms` }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-white text-xs font-semibold flex items-center justify-center">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 text-sm">{activity.user}</span>
                      <activity.icon size={14} className="text-slate-400" />
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        activity.priority === 'high' ? 'bg-red-100 text-red-700' :
                        activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {activity.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {activity.action} <span className="font-medium text-slate-800">{activity.target}</span>
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Overview & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                  <Users size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Team Overview</h2>
              </div>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={member.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50/50 transition-colors duration-200 animate-fade-in" style={{ animationDelay: `${1000 + index * 100}ms` }}>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-white text-sm font-semibold flex items-center justify-center">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{member.name}</div>
                    <div className="text-sm text-slate-600">{member.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{member.tasks} tasks</div>
                    <div className="text-xs text-slate-500">{member.projects} projects</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 animate-fade-in" style={{ animationDelay: '900ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
                  <Bell size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
              </div>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">Mark All Read</button>
            </div>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/50 transition-colors duration-200 animate-fade-in" style={{ animationDelay: `${1100 + index * 100}ms` }}>
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    <notification.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 mb-1">{notification.message}</p>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{notification.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <button
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring"
            onClick={() => onOpenTab && onOpenTab("create-task")}
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            Add Task
          </button>
          <button
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring"
            onClick={() => onOpenTab && onOpenTab("create-team")}
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            Add Team
          </button>
          <button
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring"
            onClick={() => onOpenTab && onOpenTab("create-sprint")}
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            Add Sprint
          </button>
          <button
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
          >
            <Zap size={18} />
            Quick Actions
          </button>
        </div>
      </div>
    </div>
  );
} 