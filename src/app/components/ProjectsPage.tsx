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
  GitBranch,
  BarChart3,
  Zap,
  Award,
  TrendingDown,
  FilterX,
  SortAsc,
  Grid3X3,
  List,
  Bell,
  MessageSquare,
  Heart,
  ExternalLink,
  GitCommit,
  Activity,
  DollarSign,
  CalendarDays,
  UserCheck,
  Timer,
  Flag,
  Layers,
  ChevronDown,
  Save,
  ArrowLeft,
  Building,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Globe,
  UserPlus,
  Settings
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
    likes: 24,
    comments: 8,
    views: 156,
    health: "excellent",
    velocity: 87,
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
        assignee: "Lisa Wang"
      }
    ]
  },
  {
    id: 2,
    name: "Data Analytics Dashboard",
    status: "Active",
    priority: "Medium",
    assignee: "Alex Rodriguez",
    team: "Data Science",
    startDate: "2024-02-15",
    endDate: "2024-05-30",
    progress: 45,
    tasks: 32,
    completed: 14,
    budget: "$200K",
    description: "Comprehensive analytics dashboard for business intelligence and reporting",
    created: "2024-02-15",
    lastActivity: "1 day ago",
    archived: false,
    tags: ["Data", "Analytics", "BI"],
    repository: "github.com/company/analytics-dashboard",
    likes: 18,
    comments: 12,
    views: 89,
    health: "good",
    velocity: 72,
    subprojects: [
      {
        id: 1,
        name: "Data Pipeline",
        status: "Completed",
        progress: 100,
        tasks: 8,
        completed: 8,
        assignee: "Alex Rodriguez"
      },
      {
        id: 2,
        name: "Visualization Layer",
        status: "In Progress",
        progress: 60,
        tasks: 15,
        completed: 9,
        assignee: "Maria Garcia"
      },
      {
        id: 3,
        name: "API Development",
        status: "Planning",
        progress: 0,
        tasks: 9,
        completed: 0,
        assignee: "James Wilson"
      }
    ]
  },
  {
    id: 3,
    name: "Mobile Banking App",
    status: "Planning",
    priority: "Critical",
    assignee: "Emily Chen",
    team: "Mobile Development",
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    progress: 15,
    tasks: 56,
    completed: 8,
    budget: "$300K",
    description: "Secure mobile banking application with biometric authentication",
    created: "2024-03-01",
    lastActivity: "3 days ago",
    archived: false,
    tags: ["Mobile", "Banking", "Security"],
    repository: "github.com/company/mobile-banking",
    likes: 32,
    comments: 15,
    views: 203,
    health: "excellent",
    velocity: 85,
    subprojects: [
      {
        id: 1,
        name: "Security Framework",
        status: "In Progress",
        progress: 80,
        tasks: 12,
        completed: 10,
        assignee: "Emily Chen"
      },
      {
        id: 2,
        name: "UI/UX Design",
        status: "Planning",
        progress: 0,
        tasks: 20,
        completed: 0,
        assignee: "Sophie Lee"
      },
      {
        id: 3,
        name: "Backend API",
        status: "Planning",
        progress: 0,
        tasks: 24,
        completed: 0,
        assignee: "Ryan Thompson"
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
  likes: number;
  comments: number;
  views: number;
  health: string;
  velocity: number;
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
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form states for inline form
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [projectStatus, setProjectStatus] = useState("Planning");
  const [projectPriority, setProjectPriority] = useState("Medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showNewCompanyModal, setShowNewCompanyModal] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");

  const companies = ["Whapi Corp", "Inkhub", "Acme Corp", "Globex Inc."];
  const statuses = ["Planning", "Active", "Completed", "On Hold", "Cancelled"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const availableMembers = ["Alice Johnson", "Bob Smith", "Charlie Davis", "Diana Wilson", "Emma Chen", "Frank Miller"];

  const toggleMember = (member: string) => {
    setSelectedMembers(prev => 
      prev.includes(member) 
        ? prev.filter(m => m !== member) 
        : [...prev, member]
    );
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName && selectedCompany) {
      try {
        // Create new project object
        const newProject: Project = {
          id: Math.max(...projects.map(p => p.id)) + 1,
          name: projectName,
          description: projectDescription,
          status: projectStatus,
          priority: projectPriority,
          assignee: selectedMembers[0] || "Unassigned",
          team: selectedMembers.join(", "),
          startDate: startDate,
          endDate: endDate,
          progress: 0,
          tasks: 0,
          completed: 0,
          budget: budget,
          created: new Date().toISOString().split('T')[0],
          lastActivity: "Just now",
          archived: false,
          tags: [selectedCompany],
          repository: "",
          likes: 0,
          comments: 0,
          views: 0,
          health: "excellent",
          velocity: 0,
          subprojects: []
        };
        
        setProjects([...projects, newProject]);
        
        // Reset form
        setProjectName("");
        setProjectDescription("");
        setSelectedCompany("");
        setProjectStatus("Planning");
        setProjectPriority("Medium");
        setStartDate("");
        setEndDate("");
        setBudget("");
        setSelectedMembers([]);
        setShowCreateForm(false);
      } catch (error) {
        console.error('Error creating project:', error);
      }
    }
  };

  const handleCreateNewCompany = () => {
    if (newCompanyName.trim()) {
      const newCompany = newCompanyName.trim();
      setSelectedCompany(newCompany);
      if (!companies.includes(newCompany)) {
        companies.push(newCompany);
      }
      setNewCompanyName("");
      setNewCompanyDescription("");
      setShowNewCompanyModal(false);
      setShowCompanyDropdown(false);
    }
  };

  const cancelCreate = () => {
    setShowCreateForm(false);
    // Reset form
    setProjectName("");
    setProjectDescription("");
    setSelectedCompany("");
    setProjectStatus("Planning");
    setProjectPriority("Medium");
    setStartDate("");
    setEndDate("");
    setBudget("");
    setSelectedMembers([]);
  };

  const deleteProject = (projectId: number) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const archiveProject = (projectId: number) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, archived: !p.archived } : p
    ));
  };

  const duplicateProject = (project: Project) => {
    const newProject = {
      ...project,
      id: Math.max(...projects.map(p => p.id)) + 1,
      name: `${project.name} (Copy)`,
      status: "Planning",
      progress: 0,
      completed: 0,
      created: new Date().toISOString().split('T')[0],
      lastActivity: "Just now",
      likes: 0,
      comments: 0,
      views: 0
    };
    setProjects([...projects, newProject]);
  };

  const exportProject = (project: Project) => {
    const dataStr = JSON.stringify(project, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadProjectReport = (project: Project) => {
    const report = `
Project Report: ${project.name}
Status: ${project.status}
Progress: ${project.progress}%
Tasks: ${project.completed}/${project.tasks}
Budget: ${project.budget}
Team: ${project.team}
Assignee: ${project.assignee}
Start Date: ${project.startDate}
End Date: ${project.endDate}
Description: ${project.description}
Last Activity: ${project.lastActivity}
    `;
    
    const dataBlob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name.replace(/\s+/g, '_')}_report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleProject = (projectId: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setTeamFilter("All");
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Completed":
        return { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle };
      case "In Progress":
        return { color: "text-blue-600", bg: "bg-blue-100", icon: Clock };
      case "Planning":
        return { color: "text-yellow-600", bg: "bg-yellow-100", icon: AlertCircle };
      case "On Hold":
        return { color: "text-red-600", bg: "bg-red-100", icon: AlertCircle };
      default:
        return { color: "text-neutral-600", bg: "bg-neutral-100", icon: Clock };
    }
  };

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

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-neutral-600 bg-neutral-100";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || project.priority === priorityFilter;
    const matchesTeam = teamFilter === "All" || project.team === teamFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTeam;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let aValue: string | number | Date, bValue: string | number | Date;
    
    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "progress":
        aValue = a.progress;
        bValue = b.progress;
        break;
      case "priority":
        aValue = a.priority === "High" ? 3 : a.priority === "Medium" ? 2 : 1;
        bValue = b.priority === "High" ? 3 : b.priority === "Medium" ? 2 : 1;
        break;
      case "created":
        aValue = new Date(a.created);
        bValue = new Date(b.created);
        break;
      case "velocity":
        aValue = a.velocity;
        bValue = b.velocity;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (!open) return null;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-600">Manage and track all your projects</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring"
          >
            <Download size={16} />
            Export All
          </button>
          <button 
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            New Project
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Professional Inline Create Project Form */}
        {showCreateForm && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Create New Project</h2>
                <p className="text-slate-600">Fill in the details below to create a new project</p>
              </div>
              <button 
                onClick={cancelCreate}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProject} className="space-y-8">
              {/* Project Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Project Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Project Name *</label>
                    <input 
                      value={projectName} 
                      onChange={e => setProjectName(e.target.value)} 
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <span className={selectedCompany ? "text-slate-900" : "text-slate-500"}>
                          {selectedCompany || "Select a company"}
                        </span>
                        <ChevronDown size={16} className="text-slate-400" />
                      </button>
                      
                      {showCompanyDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {companies.map((company) => (
                            <button
                              key={company}
                              type="button"
                              onClick={() => {
                                setSelectedCompany(company);
                                setShowCompanyDropdown(false);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm transition-colors"
                            >
                              {company}
                            </button>
                          ))}
                          <div className="border-t border-slate-200">
                            <button
                              type="button"
                              onClick={() => setShowNewCompanyModal(true)}
                              className="w-full text-left px-4 py-3 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors"
                            >
                              + Add New Company
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Inline New Company Form */}
                      {showNewCompanyModal && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-slate-900">Add New Company</h4>
                            <button 
                              onClick={() => setShowNewCompanyModal(false)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Company Name *</label>
                              <input
                                type="text"
                                value={newCompanyName}
                                onChange={(e) => setNewCompanyName(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                placeholder="Enter company name"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Description (Optional)</label>
                              <textarea
                                value={newCompanyDescription}
                                onChange={(e) => setNewCompanyDescription(e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                                placeholder="Brief company description..."
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => setShowNewCompanyModal(false)}
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={handleCreateNewCompany}
                                disabled={!newCompanyName.trim()}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Add Company
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea 
                    value={projectDescription} 
                    onChange={e => setProjectDescription(e.target.value)} 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
                    rows={3}
                    placeholder="Describe the project goals, objectives, and key deliverables..."
                  />
                </div>
              </div>

              {/* Project Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Settings className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Project Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <span className="text-slate-900">{projectStatus}</span>
                        <ChevronDown size={16} className="text-slate-400" />
                      </button>
                      
                      {showStatusDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {statuses.map((statusOption) => (
                            <button
                              key={statusOption}
                              type="button"
                              onClick={() => {
                                setProjectStatus(statusOption);
                                setShowStatusDropdown(false);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm transition-colors"
                            >
                              {statusOption}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <span className="text-slate-900">{projectPriority}</span>
                        <ChevronDown size={16} className="text-slate-400" />
                      </button>
                      
                      {showPriorityDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {priorities.map((priorityOption) => (
                            <button
                              key={priorityOption}
                              type="button"
                              onClick={() => {
                                setProjectPriority(priorityOption);
                                setShowPriorityDropdown(false);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm transition-colors"
                            >
                              {priorityOption}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Budget</label>
                    <input 
                      value={budget} 
                      onChange={e => setBudget(e.target.value)} 
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="e.g., $50,000"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date *</label>
                    <input 
                      type="date"
                      value={startDate} 
                      onChange={e => setStartDate(e.target.value)} 
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">End Date *</label>
                    <input 
                      type="date"
                      value={endDate} 
                      onChange={e => setEndDate(e.target.value)} 
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Team Members Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Team Members</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableMembers.map(member => (
                      <button
                        key={member}
                        type="button"
                        onClick={() => toggleMember(member)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedMembers.includes(member) 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium">
                            {member.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium">{member}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button 
                  type="button"
                  onClick={cancelCreate}
                  className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!projectName || !selectedCompany} 
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {project.description}
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

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{project.progress}%</div>
                    <div className="text-xs text-slate-500">Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{project.velocity}</div>
                    <div className="text-xs text-slate-500">Velocity</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                {/* Status and Priority */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const statusInfo = getStatusInfo(project.status);
                      const StatusIcon = statusInfo.icon;
                      return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                          <StatusIcon size={12} className="inline mr-1" />
                          {project.status}
                        </span>
                      );
                    })()}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(project.health)}`}>
                    {project.health}
                  </span>
                </div>

                {/* Project Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {project.assignee}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {project.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {project.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={12} />
                      {project.comments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Actions */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => toggleProject(project.id)}
                  >
                    <Layers size={14} />
                    {expandedProjects.has(project.id) ? 'Hide' : 'Show'} Details
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
              {expandedProjects.has(project.id) && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="font-semibold text-slate-900 mb-3">Subprojects</h4>
                    <div className="space-y-3">
                      {project.subprojects.map((subproject) => (
                        <div key={subproject.id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{subproject.name}</div>
                            <div className="text-sm text-slate-500">{subproject.assignee}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-900">{subproject.progress}%</div>
                            <div className="text-xs text-slate-500">{subproject.completed}/{subproject.tasks} tasks</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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