import { useState } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  TrendingUp,
  Activity,
  Target,
  Clock,
  Star,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  Archive,
  Copy,
  Share2,
  Download,
  FilterX,
  Grid3X3,
  List,
  Bell,
  Heart,
  ExternalLink,
  GitCommit,
  DollarSign,
  CalendarDays,
  UserCheck,
  Timer,
  Flag,
  Layers,
  Zap,
  Award,
  TrendingDown,
  SortAsc,
  CheckSquare,
  Square,
  Play,
  Pause,
  StopCircle,
  RotateCcw,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Design User Interface Components",
    description: "Create reusable UI components for the dashboard with modern design patterns and accessibility features",
    status: "In Progress",
    priority: "High",
    assignee: "Sarah Johnson",
    dueDate: "2024-02-15",
    project: "Whapi Project Management",
    tags: ["Design", "Frontend"],
    progress: 75,
    timeSpent: "12h",
    estimatedTime: "16h",
    comments: 8,
    likes: 5,
    views: 24,
    created: "2024-01-20",
    lastActivity: "2 hours ago",
    subtasks: [
      { id: 1, title: "Button Components", completed: true },
      { id: 2, title: "Form Components", completed: true },
      { id: 3, title: "Navigation Components", completed: false },
      { id: 4, title: "Modal Components", completed: false }
    ]
  },
  {
    id: 2,
    title: "Implement Authentication System",
    description: "Set up JWT authentication with role-based access control and security best practices",
    status: "To Do",
    priority: "High",
    assignee: "Mike Chen",
    dueDate: "2024-02-20",
    project: "Whapi Project Management",
    tags: ["Backend", "Security"],
    progress: 0,
    timeSpent: "0h",
    estimatedTime: "24h",
    comments: 3,
    likes: 2,
    views: 18,
    created: "2024-01-22",
    lastActivity: "1 day ago",
    subtasks: [
      { id: 1, title: "JWT Implementation", completed: false },
      { id: 2, title: "Role Management", completed: false },
      { id: 3, title: "Security Testing", completed: false }
    ]
  },
  {
    id: 3,
    title: "Database Schema Optimization",
    description: "Optimize database queries and indexes for better performance and scalability",
    status: "Done",
    priority: "Medium",
    assignee: "Alex Rodriguez",
    dueDate: "2024-02-10",
    project: "Whapi Project Management",
    tags: ["Database", "Performance"],
    progress: 100,
    timeSpent: "18h",
    estimatedTime: "20h",
    comments: 12,
    likes: 7,
    views: 31,
    created: "2024-01-15",
    lastActivity: "3 days ago",
    subtasks: [
      { id: 1, title: "Query Analysis", completed: true },
      { id: 2, title: "Index Optimization", completed: true },
      { id: 3, title: "Performance Testing", completed: true }
    ]
  },
  {
    id: 4,
    title: "API Documentation",
    description: "Create comprehensive API documentation with examples and integration guides",
    status: "In Progress",
    priority: "Low",
    assignee: "Emma Wilson",
    dueDate: "2024-02-25",
    project: "Client Portal",
    tags: ["Documentation", "API"],
    progress: 40,
    timeSpent: "6h",
    estimatedTime: "12h",
    comments: 5,
    likes: 3,
    views: 15,
    created: "2024-01-25",
    lastActivity: "4 hours ago",
    subtasks: [
      { id: 1, title: "Endpoint Documentation", completed: true },
      { id: 2, title: "Code Examples", completed: false },
      { id: 3, title: "Integration Guide", completed: false }
    ]
  },
  {
    id: 5,
    title: "Mobile App Testing",
    description: "Perform comprehensive testing on mobile devices across different platforms",
    status: "To Do",
    priority: "Medium",
    assignee: "David Kim",
    dueDate: "2024-02-28",
    project: "Client Portal",
    tags: ["Testing", "Mobile"],
    progress: 0,
    timeSpent: "0h",
    estimatedTime: "16h",
    comments: 2,
    likes: 1,
    views: 12,
    created: "2024-01-28",
    lastActivity: "2 days ago",
    subtasks: [
      { id: 1, title: "iOS Testing", completed: false },
      { id: 2, title: "Android Testing", completed: false },
      { id: 3, title: "Cross-platform Testing", completed: false }
    ]
  },
  {
    id: 6,
    title: "Performance Monitoring Setup",
    description: "Implement comprehensive performance monitoring and alerting system",
    status: "In Progress",
    priority: "High",
    assignee: "Lisa Chen",
    dueDate: "2024-02-18",
    project: "Analytics Platform",
    tags: ["Monitoring", "Performance"],
    progress: 60,
    timeSpent: "14h",
    estimatedTime: "20h",
    comments: 9,
    likes: 6,
    views: 28,
    created: "2024-01-18",
    lastActivity: "6 hours ago",
    subtasks: [
      { id: 1, title: "Metrics Collection", completed: true },
      { id: 2, title: "Alert Configuration", completed: true },
      { id: 3, title: "Dashboard Setup", completed: false },
      { id: 4, title: "Integration Testing", completed: false }
    ]
  }
];

const statusColors = {
  "To Do": "bg-slate-100 text-slate-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Done": "bg-emerald-100 text-emerald-700",
  "On Hold": "bg-orange-100 text-orange-700"
};

const priorityColors = {
  "High": "bg-red-100 text-red-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Low": "bg-green-100 text-green-700"
};

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());

  const analytics = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === "Done").length,
    inProgressTasks: tasks.filter(t => t.status === "In Progress").length,
    overdueTasks: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Done").length,
    avgProgress: Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length),
    totalTimeSpent: tasks.reduce((sum, t) => sum + parseInt(t.timeSpent.replace('h', '')), 0),
    totalEstimatedTime: tasks.reduce((sum, t) => sum + parseInt(t.estimatedTime.replace('h', '')), 0)
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleTask = (taskId: number) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return CheckCircle;
      case "In Progress":
        return Play;
      case "To Do":
        return Square;
      case "On Hold":
        return Pause;
      default:
        return Clock;
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg">
            <CheckSquare className="text-white mr-1" size={20} />
            <span>Tasks</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            New Task
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Enhanced Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <CheckSquare className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalTasks}</h3>
            <p className="text-slate-600 text-sm font-medium">Total Tasks</p>
            <div className="mt-2 text-xs text-slate-500">+3 this week</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <Play className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.inProgressTasks}</h3>
            <p className="text-slate-600 text-sm font-medium">In Progress</p>
            <div className="mt-2 text-xs text-slate-500">50% completion rate</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.completedTasks}</h3>
            <p className="text-slate-600 text-sm font-medium">Completed</p>
            <div className="mt-2 text-xs text-slate-500">+2 this week</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.overdueTasks}</h3>
            <p className="text-slate-600 text-sm font-medium">Overdue</p>
            <div className="mt-2 text-xs text-slate-500">Needs attention</div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks, descriptions, or assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                className="group flex items-center gap-2 px-4 py-3 border border-white/20 rounded-xl hover:bg-white/50 transition-all duration-200 hover:scale-105 focus-ring"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-emerald-100 text-emerald-600" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-emerald-100 text-emerald-600" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/20 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                  <option value="On Hold">On Hold</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>All Projects</option>
                  <option>Whapi Project Management</option>
                  <option>Client Portal</option>
                  <option>Analytics Platform</option>
                </select>

                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  <FilterX size={16} />
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredTasks.map((task, index) => {
            const StatusIcon = getStatusIcon(task.status);
            return (
              <div 
                key={task.id} 
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Task Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                        <Heart size={16} />
                      </button>
                      <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Task Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{task.progress}%</div>
                      <div className="text-xs text-slate-500">Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{task.timeSpent}</div>
                      <div className="text-xs text-slate-500">Time Spent</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>

                  {/* Status and Priority */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
                        <StatusIcon size={12} className="inline mr-1" />
                        {task.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        {task.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {task.views}
                      </span>
                    </div>
                  </div>

                  {/* Task Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {task.assignee}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {task.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Tag size={12} />
                        {task.project}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Task Actions */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                      onClick={() => toggleTask(task.id)}
                    >
                      <Layers size={14} />
                      {expandedTasks.has(task.id) ? 'Hide' : 'Show'} Details
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                      <Edit size={14} />
                    </button>
                    <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                      <Share2 size={14} />
                    </button>
                    <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTasks.has(task.id) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="border-t border-white/20 pt-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Subtasks</h4>
                      <div className="space-y-3">
                        {task.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {subtask.completed ? (
                                <CheckSquare size={16} className="text-emerald-600" />
                              ) : (
                                <Square size={16} className="text-slate-400" />
                              )}
                              <span className={`text-sm ${subtask.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                {subtask.title}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500">
                              {subtask.completed ? 'Completed' : 'Pending'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <CheckSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No tasks found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
            <button 
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 