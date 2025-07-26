import { useState } from "react";
import { 
  X, 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  User,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Archive,
  Copy,
  Share2,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  Tag,
  GitBranch
} from "lucide-react";

// Sample task data
const initialTasks = [
  {
    id: 1,
    name: "Implement User Authentication",
    status: "Completed",
    priority: "High",
    assignee: "Sarah Johnson",
    reporter: "Mike Chen",
    storyPoints: 3,
    story: "User Authentication System",
    sprint: "Sprint 1 - Q1 2024",
    epic: "User Management",
    description: "Create login and registration forms with JWT token authentication",
    acceptanceCriteria: [
      "Login form validates credentials",
      "Registration form creates new user",
      "JWT tokens are generated and stored",
      "Password hashing is implemented"
    ],
    created: "2024-01-01",
    updated: "2024-01-05",
    dueDate: "2024-01-10",
    completedDate: "2024-01-05",
    archived: false,
    tags: ["Authentication", "Frontend", "Security"],
    timeSpent: "16h",
    timeEstimate: "12h",
    comments: [
      {
        id: 1,
        author: "Mike Chen",
        content: "Great work on the authentication implementation!",
        timestamp: "2024-01-05 16:30"
      }
    ]
  },
  {
    id: 2,
    name: "Design Dashboard Layout",
    status: "In Progress",
    priority: "High",
    assignee: "Mike Chen",
    reporter: "Lisa Chen",
    storyPoints: 2,
    story: "Dashboard Layout",
    sprint: "Sprint 1 - Q1 2024",
    epic: "User Interface",
    description: "Create responsive dashboard layout with grid system and widgets",
    acceptanceCriteria: [
      "Dashboard is responsive on mobile and desktop",
      "Grid system supports multiple layouts",
      "Widgets can be resized and moved",
      "Theme colors are consistent"
    ],
    created: "2024-01-02",
    updated: "2024-01-12",
    dueDate: "2024-01-15",
    completedDate: null,
    archived: false,
    tags: ["Frontend", "UI/UX", "Dashboard"],
    timeSpent: "8h",
    timeEstimate: "10h",
    comments: [
      {
        id: 2,
        author: "Lisa Chen",
        content: "The layout looks great! Can we add more widget options?",
        timestamp: "2024-01-12 10:15"
      },
      {
        id: 3,
        author: "Mike Chen",
        content: "Working on adding more widget types now.",
        timestamp: "2024-01-12 14:20"
      }
    ]
  },
  {
    id: 3,
    name: "Setup Stripe Payment Gateway",
    status: "In Progress",
    priority: "High",
    assignee: "David Kim",
    reporter: "Alex Rodriguez",
    storyPoints: 5,
    story: "Payment Integration",
    sprint: "Sprint 2 - Q1 2024",
    epic: "E-commerce",
    description: "Integrate Stripe payment gateway for secure online transactions",
    acceptanceCriteria: [
      "Stripe API keys are configured",
      "Payment processing works for all card types",
      "Webhook handling is implemented",
      "Error handling is robust"
    ],
    created: "2024-01-05",
    updated: "2024-01-13",
    dueDate: "2024-01-20",
    completedDate: null,
    archived: false,
    tags: ["Payment", "Stripe", "Backend"],
    timeSpent: "12h",
    timeEstimate: "16h",
    comments: [
      {
        id: 4,
        author: "Alex Rodriguez",
        content: "Stripe integration is progressing well. Need to test with sandbox environment.",
        timestamp: "2024-01-13 16:20"
      }
    ]
  },
  {
    id: 4,
    name: "Create Mobile Navigation",
    status: "To Do",
    priority: "Medium",
    assignee: "Alex Rodriguez",
    reporter: "Emma Wilson",
    storyPoints: 3,
    story: "Mobile App Navigation",
    sprint: "Sprint 2 - Q1 2024",
    epic: "Mobile Development",
    description: "Implement bottom navigation and gesture-based navigation for mobile app",
    acceptanceCriteria: [
      "Bottom navigation is smooth and responsive",
      "Gesture navigation works intuitively",
      "Navigation state is preserved",
      "Accessibility features are implemented"
    ],
    created: "2024-01-08",
    updated: "2024-01-08",
    dueDate: "2024-01-25",
    completedDate: null,
    archived: false,
    tags: ["Mobile", "Navigation", "UI/UX"],
    timeSpent: "0h",
    timeEstimate: "8h",
    comments: []
  },
  {
    id: 5,
    name: "Build Analytics Charts",
    status: "Planning",
    priority: "Medium",
    assignee: "Emma Wilson",
    reporter: "James Brown",
    storyPoints: 4,
    story: "Data Analytics Dashboard",
    sprint: "Sprint 3 - Q1 2024",
    epic: "Analytics",
    description: "Create interactive charts and data visualization components",
    acceptanceCriteria: [
      "Charts are responsive and interactive",
      "Data updates in real-time",
      "Export functionality works",
      "Custom date ranges can be selected"
    ],
    created: "2024-01-10",
    updated: "2024-01-10",
    dueDate: "2024-02-10",
    completedDate: null,
    archived: false,
    tags: ["Analytics", "Charts", "Frontend"],
    timeSpent: "0h",
    timeEstimate: "12h",
    comments: []
  }
];

interface Task {
  id: number;
  name: string;
  status: string;
  priority: string;
  assignee: string;
  reporter: string;
  storyPoints: number;
  story: string;
  sprint: string;
  epic: string;
  description: string;
  acceptanceCriteria: string[];
  created: string;
  updated: string;
  dueDate: string;
  completedDate: string | null;
  archived: boolean;
  tags: string[];
  timeSpent: string;
  timeEstimate: string;
  comments: Array<{
    id: number;
    author: string;
    content: string;
    timestamp: string;
  }>;
}

export default function TasksPageSheet({ open, onClose, onOpenTab }: { 
  open: boolean, 
  onClose: () => void,
  onOpenTab?: (type: string, title?: string) => void 
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Task actions
  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setShowMoreMenu(null);
  };

  const archiveTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, archived: true } : task
    ));
    setShowMoreMenu(null);
  };

  const duplicateTask = (task: Task) => {
    const newTask = {
      ...task,
      id: Math.max(...tasks.map(t => t.id)) + 1,
      name: `${task.name} (Copy)`,
      status: "To Do",
      completedDate: null,
      timeSpent: "0h"
    };
    setTasks(prev => [...prev, newTask]);
    setShowMoreMenu(null);
  };

  const exportTask = (task: Task) => {
    const dataStr = JSON.stringify(task, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${task.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadTaskReport = (task: Task) => {
    const report = `
Task Report: ${task.name}
Status: ${task.status}
Priority: ${task.priority}
Assignee: ${task.assignee}
Reporter: ${task.reporter}
Story: ${task.story}
Sprint: ${task.sprint}
Epic: ${task.epic}
Story Points: ${task.storyPoints}
Due Date: ${task.dueDate}
Time Spent: ${task.timeSpent}
Time Estimate: ${task.timeEstimate}

Description: ${task.description}

Acceptance Criteria:
${task.acceptanceCriteria.map(criteria => `- ${criteria}`).join('\n')}

Comments:
${task.comments.map(comment => `[${comment.timestamp}] ${comment.author}: ${comment.content}`).join('\n')}
    `;
    const dataBlob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${task.name}-report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Toggle expansion
  const toggleTask = (taskId: number) => {
    setExpandedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm;

  // Filter tasks
  const filteredTasks = tasks.filter(task => 
    !task.archived && (
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.story.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.epic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  // Analytics
  const analytics = {
    totalTasks: tasks.filter(t => !t.archived).length,
    completedTasks: tasks.filter(t => !t.archived && t.status === "Completed").length,
    inProgressTasks: tasks.filter(t => !t.archived && t.status === "In Progress").length,
    totalStoryPoints: tasks.filter(t => !t.archived).reduce((sum, task) => sum + task.storyPoints, 0)
  };

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "In Progress":
        return { icon: Clock, color: "text-blue-600", bg: "bg-blue-100" };
      case "Completed":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" };
      case "To Do":
        return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-100" };
      case "Planning":
        return { icon: AlertCircle, color: "text-purple-600", bg: "bg-purple-100" };
      default:
        return { icon: Clock, color: "text-neutral-600", bg: "bg-neutral-100" };
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-neutral-600 bg-neutral-100";
    }
  };

  if (!open) return null;

  return (
    <div className="w-full h-full bg-neutral-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-blue-50 text-blue-700 font-semibold">
            <CheckSquare className="text-blue-500 mr-1" size={20} />
            <span>Tasks</span>
          </div>
          <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => onOpenTab && onOpenTab("create-task", "Create Task")}
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      <div className="p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckSquare className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalTasks}</h3>
            <p className="text-neutral-600 text-sm">Total Tasks</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.completedTasks}</h3>
            <p className="text-neutral-600 text-sm">Completed Tasks</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.inProgressTasks}</h3>
            <p className="text-neutral-600 text-sm">In Progress</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalStoryPoints}</h3>
            <p className="text-neutral-600 text-sm">Total Story Points</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks, assignees, or stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button 
              className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              More Filters
            </button>

            {hasActiveFilters && (
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-red-50 text-red-700 transition-colors"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Status</option>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Planning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Sort By</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>Name A-Z</option>
                    <option>Story Points</option>
                    <option>Due Date</option>
                    <option>Created Date</option>
                    <option>Assignee</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">All Tasks ({filteredTasks.length})</h2>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {filteredTasks.map((task) => {
              const StatusIcon = getStatusInfo(task.status).icon;
              const statusColor = getStatusInfo(task.status).color;
              const statusBg = getStatusInfo(task.status).bg;
              
              return (
                <div key={task.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="p-1 rounded hover:bg-neutral-100 transition-colors"
                        >
                          {expandedTasks.includes(task.id) ? (
                            <span className="text-neutral-400">▼</span>
                          ) : (
                            <span className="text-neutral-400">▶</span>
                          )}
                        </button>
                        <CheckSquare className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-neutral-900">{task.name}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${statusBg} ${statusColor}`}>
                          {task.status}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 mb-3">{task.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Assignee: {task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Reporter: {task.reporter}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <span>{task.storyPoints} points</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{task.timeSpent}/{task.timeEstimate}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Story and Sprint */}
                      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>Story: {task.story}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Sprint: {task.sprint}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>Epic: {task.epic}</span>
                        </div>
                      </div>

                      {/* Acceptance Criteria and Comments */}
                      {expandedTasks.includes(task.id) && (
                        <div className="ml-8 mt-4 space-y-4">
                          {/* Acceptance Criteria */}
                          <div>
                            <h4 className="text-sm font-medium text-neutral-700 mb-2">Acceptance Criteria</h4>
                            <div className="space-y-2">
                              {task.acceptanceCriteria.map((criteria, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-sm text-neutral-700">{criteria}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Comments */}
                          <div>
                            <h4 className="text-sm font-medium text-neutral-700 mb-2">Comments ({task.comments.length})</h4>
                            <div className="space-y-3">
                              {task.comments.map((comment) => (
                                <div key={comment.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                                  <div className="flex items-center gap-2 mb-1">
                                    <User className="w-4 h-4 text-neutral-400" />
                                    <span className="text-sm font-medium text-neutral-800">{comment.author}</span>
                                    <span className="text-xs text-neutral-500">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-neutral-700">{comment.content}</p>
                                </div>
                              ))}
                              {task.comments.length === 0 && (
                                <p className="text-sm text-neutral-500 italic">No comments yet</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => onOpenTab && onOpenTab("edit-task", `Edit: ${task.name}`)}
                        title="Edit Task"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => downloadTaskReport(task)}
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        onClick={() => setShowMoreMenu(showMoreMenu === task.id ? null : task.id)}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {/* Task Actions Menu */}
                      {showMoreMenu === task.id && (
                        <div className="absolute right-0 top-12 z-10 bg-white border border-neutral-200 rounded shadow-lg min-w-[160px]">
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => onOpenTab && onOpenTab("edit-task", `Edit: ${task.name}`)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit Task
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => onOpenTab && onOpenTab("view-task", `View: ${task.name}`)}
                          >
                            <Eye className="w-4 h-4" />
                            View Task
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => duplicateTask(task)}
                          >
                            <Copy className="w-4 h-4" />
                            Duplicate Task
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => exportTask(task)}
                          >
                            <Share2 className="w-4 h-4" />
                            Export Task
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-green-50 text-green-600 text-left"
                            onClick={() => downloadTaskReport(task)}
                          >
                            <Download className="w-4 h-4" />
                            Download Report
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-yellow-50 text-yellow-600 text-left"
                            onClick={() => archiveTask(task.id)}
                          >
                            <Archive className="w-4 h-4" />
                            Archive Task
                          </button>
                          <hr className="my-1" />
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-red-600 text-left"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Task
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No tasks found</h3>
              <p className="text-neutral-600 mb-4">Try adjusting your search or create a new task.</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => onOpenTab && onOpenTab("create-task", "Create Task")}
              >
                Create Your First Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 