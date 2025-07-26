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
  BarChart3,
  TrendingUp,
  Activity,
  Target
} from "lucide-react";

// Sample task data
const tasks = [
  {
    id: 1,
    title: "Design User Interface Components",
    description: "Create reusable UI components for the dashboard",
    status: "In Progress",
    priority: "High",
    assignee: "Sarah Johnson",
    dueDate: "2024-02-15",
    project: "Whapi Project Management",
    tags: ["Design", "Frontend"],
    progress: 75
  },
  {
    id: 2,
    title: "Implement Authentication System",
    description: "Set up JWT authentication with role-based access",
    status: "To Do",
    priority: "High",
    assignee: "Mike Chen",
    dueDate: "2024-02-20",
    project: "Whapi Project Management",
    tags: ["Backend", "Security"],
    progress: 0
  },
  {
    id: 3,
    title: "Database Schema Optimization",
    description: "Optimize database queries and indexes",
    status: "Done",
    priority: "Medium",
    assignee: "Alex Rodriguez",
    dueDate: "2024-02-10",
    project: "Whapi Project Management",
    tags: ["Database", "Performance"],
    progress: 100
  },
  {
    id: 4,
    title: "API Documentation",
    description: "Create comprehensive API documentation",
    status: "In Progress",
    priority: "Low",
    assignee: "Emma Wilson",
    dueDate: "2024-02-25",
    project: "Client Portal",
    tags: ["Documentation", "API"],
    progress: 40
  },
  {
    id: 5,
    title: "Mobile App Testing",
    description: "Perform comprehensive testing on mobile devices",
    status: "To Do",
    priority: "Medium",
    assignee: "David Kim",
    dueDate: "2024-02-28",
    project: "Client Portal",
    tags: ["Testing", "Mobile"],
    progress: 0
  }
];

const statusColors = {
  "To Do": "bg-neutral-100 text-neutral-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Done": "bg-green-100 text-green-700"
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const analytics = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "Done").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Done").length
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Tasks</h1>
            <p className="text-neutral-600">View and manage all your tasks. Track progress and deadlines.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            Create Task
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.total}</h3>
            <p className="text-neutral-600 text-sm">Total Tasks</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.completed}</h3>
            <p className="text-neutral-600 text-sm">Completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.inProgress}</h3>
            <p className="text-neutral-600 text-sm">In Progress</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.overdue}</h3>
            <p className="text-neutral-600 text-sm">Overdue</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">All Tasks ({filteredTasks.length})</h2>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-neutral-900">{task.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <p className="text-neutral-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>{task.project}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mt-3">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No tasks found</h3>
            <p className="text-neutral-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 