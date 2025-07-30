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
  LineChart,
  X,
  Building,
  Save,
  ArrowLeft
} from "lucide-react";

// Sample task data
const initialTasks = [
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

const assignees = [
  "Sarah Johnson",
  "Mike Chen", 
  "Alex Rodriguez",
  "Emily Davis",
  "David Wilson",
  "Lisa Thompson",
  "James Brown",
  "Maria Garcia"
];

const statuses = ["To Do", "In Progress", "Review", "Done", "Blocked"];
const priorities = ["Low", "Medium", "High", "Critical"];
const projects = [
  "Whapi Project Management",
  "E-commerce Platform", 
  "Client Portal",
  "Mobile App Development",
  "API Integration"
];

const tags = [
  "Design", "Frontend", "Backend", "Security", "Testing", 
  "Documentation", "Bug Fix", "Feature", "Refactor", "UI/UX"
];

export default function TasksPage({ context }: { context?: { company: string } }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: context?.company || projects[0],
    assignee: assignees[0],
    status: statuses[0],
    priority: priorities[1],
    dueDate: "",
    startDate: "",
    estimatedHours: "",
    tags: [] as string[],
    subtasks: [] as { id: number; title: string; completed: boolean }[],
    comments: ""
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating task:", formData);
    
    // Create new task object
    const newTask = {
      id: Date.now(), // Generate unique ID
      title: formData.title,
      description: formData.description,
      project: formData.project,
      assignee: formData.assignee,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
      startDate: formData.startDate,
      estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : 0,
      tags: formData.tags,
      subtasks: formData.subtasks,
      comments: formData.comments,
      createdAt: new Date().toISOString(),
      lastActivity: "Just now"
    };

    // Add the new task to the tasks array
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Reset form and hide it
    setShowCreateForm(false);
    setFormData({
      title: "",
      description: "",
      project: context?.company || projects[0],
      assignee: assignees[0],
      status: statuses[0],
      priority: priorities[1],
      dueDate: "",
      startDate: "",
      estimatedHours: "",
      tags: [],
      subtasks: [],
      comments: ""
    });
  };

  const addSubtask = () => {
    const newSubtask = {
      id: Date.now(),
      title: "",
      completed: false
    };
    setFormData(prev => ({
      ...prev,
      subtasks: [...prev.subtasks, newSubtask]
    }));
  };

  const updateSubtask = (id: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask => 
        subtask.id === id ? { ...subtask, [field]: value } : subtask
      )
    }));
  };

  const removeSubtask = (id: number) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(subtask => subtask.id !== id)
    }));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg">
            <CheckSquare className="text-white mr-1" size={20} />
            <span>{context?.company ? `${context.company} Tasks` : 'Tasks'}</span>
          </div>
          {context?.company && (
            <div className="text-sm text-slate-600">
              Managing tasks for {context.company}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            {showCreateForm ? 'Cancel' : 'New Task'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Task Creation Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Create New Task</h2>
                  <p className="text-slate-600">Fill in the details below to create a new task.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Task Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Task Information</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Task Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter task title"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Project *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.project}
                          onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                          required
                        >
                          {projects.map(project => (
                            <option key={project} value={project}>{project}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Building className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                      {showNewProject && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={newProject}
                            onChange={(e) => setNewProject(e.target.value)}
                            placeholder="Enter new project name"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowNewProject(!showNewProject)}
                        className="text-sm text-blue-600 hover:text-blue-700 mt-1"
                      >
                        {showNewProject ? "Cancel" : "+ Add New Project"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Assignee *
                      </label>
                      <div className="relative">
                        <select
                          value={formData.assignee}
                          onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                          required
                        >
                          {assignees.map(assignee => (
                            <option key={assignee} value={assignee}>{assignee}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <User className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the task goals, requirements, and key deliverables..."
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Task Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        required
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Flag className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Priority *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        required
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <AlertCircle className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Estimated Hours
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.estimatedHours}
                        onChange={(e) => setFormData(prev => ({ ...prev, estimatedHours: e.target.value }))}
                        placeholder="e.g., 8"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Clock className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Due Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Tags</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        formData.tags.includes(tag)
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtasks */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Subtasks</h3>
                  </div>
                  <button
                    type="button"
                    onClick={addSubtask}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Subtask</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.subtasks.map((subtask, index) => (
                    <div key={subtask.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={(e) => updateSubtask(subtask.id, "completed", e.target.checked)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={subtask.title}
                        onChange={(e) => updateSubtask(subtask.id, "title", e.target.value)}
                        placeholder={`Subtask ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSubtask(subtask.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Initial Comments</h3>
                </div>

                <div>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                    placeholder="Add any initial comments or notes about this task..."
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Cancel</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="px-6 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Draft</span>
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center space-x-2"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>Create Task</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Enhanced Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 animate-fade-in">
          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-green-50 rounded-md flex items-center justify-center mr-3">
              <CheckSquare className="w-3 h-3 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.totalTasks}</h3>
              <p className="text-xs text-slate-500">Total Tasks</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-slate-400">+3</span>
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center mr-3">
              <Play className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.inProgressTasks}</h3>
              <p className="text-xs text-slate-500">In Progress</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-slate-400">50%</span>
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-purple-50 rounded-md flex items-center justify-center mr-3">
              <CheckCircle className="w-3 h-3 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.completedTasks}</h3>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-slate-400">+2</span>
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-orange-50 rounded-md flex items-center justify-center mr-3">
              <Clock className="w-3 h-3 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.overdueTasks}</h3>
              <p className="text-xs text-slate-500">Overdue</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-xs text-slate-400">!</span>
            </div>
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

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-white/20 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  >
                    <option value="All">All Statuses</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <FilterX className="w-4 h-4" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-200 group">
              <div className="p-6">
                {/* Task Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress and Time */}
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
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>

                {/* Task Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status as keyof typeof statusColors] || 'bg-slate-100 text-slate-700'}`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors] || 'bg-slate-100 text-slate-700'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span className="text-xs">{task.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span className="text-xs">{task.views}</span>
                    </div>
                  </div>
                </div>

                {/* Assignee and Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">{task.dueDate}</span>
                  </div>
                </div>

                {/* Project */}
                <div className="flex items-center gap-2 mb-4">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">{task.project}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                    Show Details
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No tasks found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or create a new task.</p>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Create First Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 