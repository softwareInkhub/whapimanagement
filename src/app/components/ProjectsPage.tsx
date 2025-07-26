import { useState } from "react";
import { 
  X, 
  FolderOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Users,
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
  GitBranch
} from "lucide-react";

// Sample project data
const initialProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    status: "In Progress",
    priority: "High",
    assignee: "Sarah Johnson",
    team: "Frontend Development",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    progress: 65,
    tasks: 48,
    completed: 31,
    budget: "$150K",
    description: "Modern e-commerce platform with advanced features and mobile optimization",
    created: "2024-01-01",
    lastActivity: "2 hours ago",
    archived: false,
    tags: ["Frontend", "E-commerce", "Mobile"],
    repository: "github.com/company/ecommerce-platform",
    subprojects: [
      {
        id: 1,
        name: "User Interface",
        status: "Completed",
        progress: 100,
        tasks: 15,
        completed: 15,
        assignee: "Mike Chen"
      },
      {
        id: 2,
        name: "Payment Integration",
        status: "In Progress",
        progress: 75,
        tasks: 12,
        completed: 9,
        assignee: "David Kim"
      },
      {
        id: 3,
        name: "Mobile App",
        status: "Planning",
        progress: 0,
        tasks: 8,
        completed: 0,
        assignee: "Alex Rodriguez"
      }
    ]
  },
  {
    id: 2,
    name: "CRM System",
    status: "Planning",
    priority: "Medium",
    assignee: "Lisa Chen",
    team: "Backend Development",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    progress: 15,
    tasks: 36,
    completed: 5,
    budget: "$200K",
    description: "Customer relationship management system with analytics and reporting",
    created: "2024-01-15",
    lastActivity: "1 day ago",
    archived: false,
    tags: ["Backend", "CRM", "Analytics"],
    repository: "github.com/company/crm-system",
    subprojects: [
      {
        id: 4,
        name: "Database Design",
        status: "In Progress",
        progress: 60,
        tasks: 8,
        completed: 5,
        assignee: "Tom Anderson"
      },
      {
        id: 5,
        name: "API Development",
        status: "Planning",
        progress: 0,
        tasks: 10,
        completed: 0,
        assignee: "Emma Wilson"
      }
    ]
  },
  {
    id: 3,
    name: "Design System",
    status: "Completed",
    priority: "High",
    assignee: "Alex Rodriguez",
    team: "UI/UX Design",
    startDate: "2023-12-01",
    endDate: "2024-01-31",
    progress: 100,
    tasks: 24,
    completed: 24,
    budget: "$80K",
    description: "Comprehensive design system with component library and documentation",
    created: "2023-11-15",
    lastActivity: "1 week ago",
    archived: false,
    tags: ["Design", "Components", "Documentation"],
    repository: "github.com/company/design-system",
    subprojects: [
      {
        id: 6,
        name: "Component Library",
        status: "Completed",
        progress: 100,
        tasks: 12,
        completed: 12,
        assignee: "Maria Garcia"
      },
      {
        id: 7,
        name: "Style Guide",
        status: "Completed",
        progress: 100,
        tasks: 8,
        completed: 8,
        assignee: "Rachel Green"
      }
    ]
  },
  {
    id: 4,
    name: "Mobile App",
    status: "In Progress",
    priority: "High",
    assignee: "David Kim",
    team: "Mobile Development",
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    progress: 40,
    tasks: 42,
    completed: 17,
    budget: "$120K",
    description: "Cross-platform mobile application for iOS and Android",
    created: "2024-01-10",
    lastActivity: "30 minutes ago",
    archived: false,
    tags: ["Mobile", "iOS", "Android"],
    repository: "github.com/company/mobile-app",
    subprojects: [
      {
        id: 8,
        name: "iOS Development",
        status: "In Progress",
        progress: 55,
        tasks: 18,
        completed: 10,
        assignee: "James Brown"
      },
      {
        id: 9,
        name: "Android Development",
        status: "In Progress",
        progress: 35,
        tasks: 16,
        completed: 6,
        assignee: "Chris Lee"
      }
    ]
  },
  {
    id: 5,
    name: "Analytics Dashboard",
    status: "Planning",
    priority: "Medium",
    assignee: "Emma Wilson",
    team: "Data Science",
    startDate: "2024-03-01",
    endDate: "2024-06-30",
    progress: 5,
    tasks: 28,
    completed: 1,
    budget: "$90K",
    description: "Real-time analytics dashboard with data visualization and reporting",
    created: "2024-02-01",
    lastActivity: "2 days ago",
    archived: false,
    tags: ["Analytics", "Dashboard", "Data"],
    repository: "github.com/company/analytics-dashboard",
    subprojects: [
      {
        id: 10,
        name: "Data Pipeline",
        status: "Planning",
        progress: 0,
        tasks: 6,
        completed: 0,
        assignee: "Emma Wilson"
      },
      {
        id: 11,
        name: "Visualization Components",
        status: "Planning",
        progress: 0,
        tasks: 8,
        completed: 0,
        assignee: "Lisa Thompson"
      }
    ]
  }
];

interface Project {
  id: number;
  name: string;
  status: string;
  priority: string;
  assignee: string;
  team: string;
  startDate: string;
  endDate: string;
  progress: number;
  tasks: number;
  completed: number;
  budget: string;
  description: string;
  created: string;
  lastActivity: string;
  archived: boolean;
  tags: string[];
  repository: string;
  subprojects: Array<{
    id: number;
    name: string;
    status: string;
    progress: number;
    tasks: number;
    completed: number;
    assignee: string;
  }>;
}

export default function ProjectsPage({ open, onClose, onOpenTab }: { 
  open: boolean, 
  onClose: () => void,
  onOpenTab?: (type: string, title?: string) => void 
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Project actions
  const deleteProject = (projectId: number) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    setShowMoreMenu(null);
  };

  const archiveProject = (projectId: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, archived: true } : project
    ));
    setShowMoreMenu(null);
  };

  const duplicateProject = (project: Project) => {
    const newProject = {
      ...project,
      id: Math.max(...projects.map(p => p.id)) + 1,
      name: `${project.name} (Copy)`,
      status: "Planning",
      progress: 0,
      completed: 0
    };
    setProjects(prev => [...prev, newProject]);
    setShowMoreMenu(null);
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

  const downloadProjectReport = (project: Project) => {
    const report = `
Project Report: ${project.name}
Team: ${project.team}
Status: ${project.status}
Priority: ${project.priority}
Assignee: ${project.assignee}
Duration: ${project.startDate} to ${project.endDate}
Progress: ${project.completed}/${project.tasks} tasks (${project.progress}% complete)
Budget: ${project.budget}

Description: ${project.description}

Subprojects:
${project.subprojects.map(sub => `- ${sub.name} (${sub.status}) - ${sub.progress}% complete`).join('\n')}
    `;
    const dataBlob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name}-report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Toggle expansion
  const toggleProject = (projectId: number) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm;

  // Filter projects
  const filteredProjects = projects.filter(project => 
    !project.archived && (
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  // Analytics
  const analytics = {
    totalProjects: projects.filter(p => !p.archived).length,
    activeProjects: projects.filter(p => !p.archived && p.status === "In Progress").length,
    completedProjects: projects.filter(p => !p.archived && p.status === "Completed").length,
    avgProgress: Math.round(projects.filter(p => !p.archived).reduce((sum, project) => sum + project.progress, 0) / projects.filter(p => !p.archived).length)
  };

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "In Progress":
        return { icon: Clock, color: "text-blue-600", bg: "bg-blue-100" };
      case "Completed":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" };
      case "Planning":
        return { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-100" };
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
            <FolderOpen className="text-blue-500 mr-1" size={20} />
            <span>Projects</span>
          </div>
          <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => onOpenTab && onOpenTab("create-project", "Create Project")}
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalProjects}</h3>
            <p className="text-neutral-600 text-sm">Total Projects</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.activeProjects}</h3>
            <p className="text-neutral-600 text-sm">Active Projects</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.completedProjects}</h3>
            <p className="text-neutral-600 text-sm">Completed Projects</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.avgProgress}%</h3>
            <p className="text-neutral-600 text-sm">Avg Progress</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects, assignees, or tags..."
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
                    <option>Start Date</option>
                    <option>End Date</option>
                    <option>Highest Progress</option>
                    <option>Most Tasks</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">All Projects ({filteredProjects.length})</h2>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {filteredProjects.map((project) => {
              const StatusIcon = getStatusInfo(project.status).icon;
              const statusColor = getStatusInfo(project.status).color;
              const statusBg = getStatusInfo(project.status).bg;
              
              return (
                <div key={project.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleProject(project.id)}
                          className="p-1 rounded hover:bg-neutral-100 transition-colors"
                        >
                          {expandedProjects.includes(project.id) ? (
                            <span className="text-neutral-400">▼</span>
                          ) : (
                            <span className="text-neutral-400">▶</span>
                          )}
                        </button>
                        <FolderOpen className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-neutral-900">{project.name}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${statusBg} ${statusColor}`}>
                          {project.status}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 mb-3">{project.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{project.team}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{project.startDate} - {project.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>{project.completed}/{project.tasks} tasks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>{project.progress}% complete</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <span>{project.budget}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-neutral-600 mb-1">
                          <span>Progress</span>
                          <span>{project.completed}/{project.tasks} tasks ({project.progress}%)</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Repository Link */}
                      <div className="flex items-center gap-2 mb-4">
                        <GitBranch className="w-4 h-4 text-neutral-400" />
                        <a 
                          href={`https://${project.repository}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {project.repository}
                        </a>
                      </div>

                      {/* Sub-projects */}
                      {expandedProjects.includes(project.id) && (
                        <div className="ml-8 mt-4 space-y-3">
                          <h4 className="text-sm font-medium text-neutral-700 mb-3">Sub-projects ({project.subprojects.length})</h4>
                          {project.subprojects.map((subproject) => (
                            <div key={subproject.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                              <div className="flex items-center gap-3">
                                <FolderOpen className="w-4 h-4 text-blue-400" />
                                <div>
                                  <h5 className="font-medium text-neutral-800 text-sm">{subproject.name}</h5>
                                  <p className="text-xs text-neutral-600">Assignee: {subproject.assignee}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-xs font-medium">{subproject.completed}/{subproject.tasks}</p>
                                  <p className="text-xs text-neutral-500">Tasks</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs font-medium">{subproject.progress}%</p>
                                  <p className="text-xs text-neutral-500">Progress</p>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${
                                  subproject.status === "Completed" ? "bg-green-100 text-green-700" :
                                  subproject.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                  "bg-neutral-100 text-neutral-700"
                                }`}>
                                  {subproject.status}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => onOpenTab && onOpenTab("edit-project", `Edit: ${project.name}`)}
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => downloadProjectReport(project)}
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        onClick={() => setShowMoreMenu(showMoreMenu === project.id ? null : project.id)}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {/* Project Actions Menu */}
                      {showMoreMenu === project.id && (
                        <div className="absolute right-0 top-12 z-10 bg-white border border-neutral-200 rounded shadow-lg min-w-[160px]">
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => onOpenTab && onOpenTab("edit-project", `Edit: ${project.name}`)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit Project
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => onOpenTab && onOpenTab("view-project", `View: ${project.name}`)}
                          >
                            <Eye className="w-4 h-4" />
                            View Project
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => duplicateProject(project)}
                          >
                            <Copy className="w-4 h-4" />
                            Duplicate Project
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => exportProject(project)}
                          >
                            <Share2 className="w-4 h-4" />
                            Export Project
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-green-50 text-green-600 text-left"
                            onClick={() => downloadProjectReport(project)}
                          >
                            <Download className="w-4 h-4" />
                            Download Report
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-yellow-50 text-yellow-600 text-left"
                            onClick={() => archiveProject(project.id)}
                          >
                            <Archive className="w-4 h-4" />
                            Archive Project
                          </button>
                          <hr className="my-1" />
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-red-600 text-left"
                            onClick={() => deleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Project
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects found</h3>
              <p className="text-neutral-600 mb-4">Try adjusting your search or create a new project.</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => onOpenTab && onOpenTab("create-project", "Create Project")}
              >
                Create Your First Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 