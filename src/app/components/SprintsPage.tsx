import { useState } from "react";
import { 
  X, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Archive,
  Copy,
  Share2,
  Download,
  Eye,
  TrendingUp,
  Target,
  Users,
  Zap
} from "lucide-react";

// Sample sprint data
const initialSprints = [
  {
    id: 1,
    name: "Sprint 1 - Q1 2024",
    status: "In Progress",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    tasks: 24,
    completed: 18,
    velocity: 85,
    team: "Frontend Development",
    description: "Initial sprint focusing on core UI components and user authentication",
    created: "2024-01-01",
    lastActivity: "2 hours ago",
    archived: false,
    stories: [
      {
        id: 1,
        name: "User Authentication System",
        status: "Completed",
        priority: "High",
        assignee: "Sarah Johnson",
        storyPoints: 8,
        tasks: 5,
        completed: 5
      },
      {
        id: 2,
        name: "Dashboard Layout",
        status: "In Progress",
        priority: "High",
        assignee: "Mike Chen",
        storyPoints: 5,
        tasks: 3,
        completed: 2
      },
      {
        id: 3,
        name: "Navigation Component",
        status: "Completed",
        priority: "Medium",
        assignee: "Alex Rodriguez",
        storyPoints: 3,
        tasks: 2,
        completed: 2
      }
    ]
  },
  {
    id: 2,
    name: "Sprint 2 - Q1 2024",
    status: "Planning",
    startDate: "2024-01-16",
    endDate: "2024-01-30",
    tasks: 32,
    completed: 0,
    velocity: 0,
    team: "Backend Development",
    description: "Backend API development and database schema implementation",
    created: "2024-01-10",
    lastActivity: "1 day ago",
    archived: false,
    stories: [
      {
        id: 4,
        name: "API Authentication",
        status: "To Do",
        priority: "High",
        assignee: "David Kim",
        storyPoints: 8,
        tasks: 4,
        completed: 0
      },
      {
        id: 5,
        name: "Database Schema",
        status: "To Do",
        priority: "High",
        assignee: "Tom Anderson",
        storyPoints: 6,
        tasks: 3,
        completed: 0
      },
      {
        id: 6,
        name: "User Management API",
        status: "To Do",
        priority: "Medium",
        assignee: "Emma Wilson",
        storyPoints: 5,
        tasks: 3,
        completed: 0
      }
    ]
  },
  {
    id: 3,
    name: "Sprint 3 - Q1 2024",
    status: "Completed",
    startDate: "2023-12-15",
    endDate: "2023-12-29",
    tasks: 28,
    completed: 28,
    velocity: 100,
    team: "UI/UX Design",
    description: "Design system implementation and component library",
    created: "2023-12-10",
    lastActivity: "1 week ago",
    archived: false,
    stories: [
      {
        id: 7,
        name: "Design System",
        status: "Completed",
        priority: "High",
        assignee: "Alex Rodriguez",
        storyPoints: 10,
        tasks: 6,
        completed: 6
      },
      {
        id: 8,
        name: "Component Library",
        status: "Completed",
        priority: "High",
        assignee: "Maria Garcia",
        storyPoints: 8,
        tasks: 4,
        completed: 4
      },
      {
        id: 9,
        name: "Style Guide",
        status: "Completed",
        priority: "Medium",
        assignee: "Rachel Green",
        storyPoints: 3,
        tasks: 2,
        completed: 2
      }
    ]
  },
  {
    id: 4,
    name: "Sprint 4 - Q1 2024",
    status: "In Progress",
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    tasks: 20,
    completed: 8,
    velocity: 40,
    team: "Quality Assurance",
    description: "Testing automation and quality assurance processes",
    created: "2024-01-25",
    lastActivity: "30 minutes ago",
    archived: false,
    stories: [
      {
        id: 10,
        name: "Test Automation Setup",
        status: "In Progress",
        priority: "High",
        assignee: "Lisa Thompson",
        storyPoints: 6,
        tasks: 3,
        completed: 2
      },
      {
        id: 11,
        name: "Manual Testing",
        status: "In Progress",
        priority: "Medium",
        assignee: "James Brown",
        storyPoints: 4,
        tasks: 2,
        completed: 1
      },
      {
        id: 12,
        name: "Performance Testing",
        status: "To Do",
        priority: "Medium",
        assignee: "Chris Lee",
        storyPoints: 5,
        tasks: 2,
        completed: 0
      }
    ]
  },
  {
    id: 5,
    name: "Sprint 5 - Q1 2024",
    status: "Planning",
    startDate: "2024-02-16",
    endDate: "2024-03-01",
    tasks: 18,
    completed: 0,
    velocity: 0,
    team: "Product Strategy",
    description: "Product roadmap planning and feature prioritization",
    created: "2024-02-01",
    lastActivity: "2 days ago",
    archived: false,
    stories: [
      {
        id: 13,
        name: "Market Research",
        status: "To Do",
        priority: "High",
        assignee: "Lisa Chen",
        storyPoints: 5,
        tasks: 3,
        completed: 0
      },
      {
        id: 14,
        name: "Feature Prioritization",
        status: "To Do",
        priority: "High",
        assignee: "James Brown",
        storyPoints: 4,
        tasks: 2,
        completed: 0
      },
      {
        id: 15,
        name: "Roadmap Planning",
        status: "To Do",
        priority: "Medium",
        assignee: "Rachel Green",
        storyPoints: 3,
        tasks: 2,
        completed: 0
      }
    ]
  }
];

interface Sprint {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  tasks: number;
  completed: number;
  velocity: number;
  team: string;
  description: string;
  created: string;
  lastActivity: string;
  archived: boolean;
  stories: Array<{
    id: number;
    name: string;
    status: string;
    priority: string;
    assignee: string;
    storyPoints: number;
    tasks: number;
    completed: number;
  }>;
}

export default function SprintsPage({ open, onClose, onOpenTab }: { 
  open: boolean, 
  onClose: () => void,
  onOpenTab?: (type: string, title?: string) => void 
}) {
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [expandedSprints, setExpandedSprints] = useState<number[]>([]);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);

  // Sprint actions
  const deleteSprint = (sprintId: number) => {
    setSprints(prev => prev.filter(sprint => sprint.id !== sprintId));
    setShowMoreMenu(null);
  };

  const archiveSprint = (sprintId: number) => {
    setSprints(prev => prev.map(sprint => 
      sprint.id === sprintId ? { ...sprint, archived: true } : sprint
    ));
    setShowMoreMenu(null);
  };

  const duplicateSprint = (sprint: Sprint) => {
    const newSprint = {
      ...sprint,
      id: Math.max(...sprints.map(s => s.id)) + 1,
      name: `${sprint.name} (Copy)`,
      status: "Planning",
      completed: 0,
      velocity: 0
    };
    setSprints(prev => [...prev, newSprint]);
    setShowMoreMenu(null);
  };

  const exportSprint = (sprint: Sprint) => {
    const dataStr = JSON.stringify(sprint, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sprint.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadSprintReport = (sprint: Sprint) => {
    const report = `
Sprint Report: ${sprint.name}
Team: ${sprint.team}
Status: ${sprint.status}
Duration: ${sprint.startDate} to ${sprint.endDate}
Tasks: ${sprint.completed}/${sprint.tasks} (${sprint.velocity}% complete)
Velocity: ${sprint.velocity}%

Stories:
${sprint.stories.map(story => `- ${story.name} (${story.status}) - ${story.assignee}`).join('\n')}
    `;
    const dataBlob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sprint.name}-report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Toggle expansion
  const toggleSprint = (sprintId: number) => {
    setExpandedSprints(prev => 
      prev.includes(sprintId) 
        ? prev.filter(id => id !== sprintId)
        : [...prev, sprintId]
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm;

  // Filter sprints
  const filteredSprints = sprints.filter(sprint => 
    !sprint.archived && (
      sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sprint.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sprint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sprint.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Analytics
  const analytics = {
    totalSprints: sprints.filter(s => !s.archived).length,
    activeSprints: sprints.filter(s => !s.archived && s.status === "In Progress").length,
    completedSprints: sprints.filter(s => !s.archived && s.status === "Completed").length,
    avgVelocity: Math.round(sprints.filter(s => !s.archived && s.status === "Completed").reduce((sum, sprint) => sum + sprint.velocity, 0) / sprints.filter(s => !s.archived && s.status === "Completed").length || 0)
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

  if (!open) return null;

  return (
    <div className="w-full h-full bg-neutral-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-blue-50 text-blue-700 font-semibold">
            <Calendar className="text-blue-500 mr-1" size={20} />
            <span>Sprints</span>
          </div>
          <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => onOpenTab && onOpenTab("create-sprint", "Create Sprint")}
        >
          <Plus size={16} />
          New Sprint
        </button>
      </div>

      <div className="p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalSprints}</h3>
            <p className="text-neutral-600 text-sm">Total Sprints</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.activeSprints}</h3>
            <p className="text-neutral-600 text-sm">Active Sprints</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.completedSprints}</h3>
            <p className="text-neutral-600 text-sm">Completed Sprints</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.avgVelocity}%</h3>
            <p className="text-neutral-600 text-sm">Avg Velocity</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sprints, teams, or status..."
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
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Team</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Teams</option>
                    <option>Frontend Development</option>
                    <option>Backend Development</option>
                    <option>UI/UX Design</option>
                    <option>Quality Assurance</option>
                    <option>Product Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Sort By</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>Name A-Z</option>
                    <option>Start Date</option>
                    <option>End Date</option>
                    <option>Highest Velocity</option>
                    <option>Most Tasks</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sprints List */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">All Sprints ({filteredSprints.length})</h2>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {filteredSprints.map((sprint) => {
              const StatusIcon = getStatusInfo(sprint.status).icon;
              const statusColor = getStatusInfo(sprint.status).color;
              const statusBg = getStatusInfo(sprint.status).bg;
              
              return (
                <div key={sprint.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleSprint(sprint.id)}
                          className="p-1 rounded hover:bg-neutral-100 transition-colors"
                        >
                          {expandedSprints.includes(sprint.id) ? (
                            <span className="text-neutral-400">▼</span>
                          ) : (
                            <span className="text-neutral-400">▶</span>
                          )}
                        </button>
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-neutral-900">{sprint.name}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${statusBg} ${statusColor}`}>
                          {sprint.status}
                        </div>
                      </div>
                      
                      <p className="text-neutral-600 mb-3">{sprint.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{sprint.team}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{sprint.startDate} - {sprint.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          <span>{sprint.completed}/{sprint.tasks} tasks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>{sprint.velocity}% velocity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Created {sprint.created}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-neutral-600 mb-1">
                          <span>Progress</span>
                          <span>{sprint.completed}/{sprint.tasks} ({sprint.velocity}%)</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${sprint.velocity}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Stories */}
                      {expandedSprints.includes(sprint.id) && (
                        <div className="ml-8 mt-4 space-y-3">
                          <h4 className="text-sm font-medium text-neutral-700 mb-3">Stories ({sprint.stories.length})</h4>
                          {sprint.stories.map((story) => (
                            <div key={story.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  story.priority === "High" ? "bg-red-500" :
                                  story.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"
                                }`}></div>
                                <div>
                                  <h5 className="font-medium text-neutral-800 text-sm">{story.name}</h5>
                                  <p className="text-xs text-neutral-600">Assignee: {story.assignee} • {story.storyPoints} points</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-xs font-medium">{story.completed}/{story.tasks}</p>
                                  <p className="text-xs text-neutral-500">Tasks</p>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${
                                  story.status === "Completed" ? "bg-green-100 text-green-700" :
                                  story.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                  "bg-neutral-100 text-neutral-700"
                                }`}>
                                  {story.status}
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
                        onClick={() => onOpenTab && onOpenTab("edit-sprint", `Edit: ${sprint.name}`)}
                        title="Edit Sprint"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => downloadSprintReport(sprint)}
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        onClick={() => setShowMoreMenu(showMoreMenu === sprint.id ? null : sprint.id)}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {/* Sprint Actions Menu */}
                      {showMoreMenu === sprint.id && (
                        <div className="absolute right-0 top-12 z-10 bg-white border border-neutral-200 rounded shadow-lg min-w-[160px]">
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => onOpenTab && onOpenTab("edit-sprint", `Edit: ${sprint.name}`)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit Sprint
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => onOpenTab && onOpenTab("view-sprint", `View: ${sprint.name}`)}
                          >
                            <Eye className="w-4 h-4" />
                            View Sprint
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => duplicateSprint(sprint)}
                          >
                            <Copy className="w-4 h-4" />
                            Duplicate Sprint
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                            onClick={() => exportSprint(sprint)}
                          >
                            <Share2 className="w-4 h-4" />
                            Export Sprint
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-green-50 text-green-600 text-left"
                            onClick={() => downloadSprintReport(sprint)}
                          >
                            <Download className="w-4 h-4" />
                            Download Report
                          </button>
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-yellow-50 text-yellow-600 text-left"
                            onClick={() => archiveSprint(sprint.id)}
                          >
                            <Archive className="w-4 h-4" />
                            Archive Sprint
                          </button>
                          <hr className="my-1" />
                          <button 
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-red-600 text-left"
                            onClick={() => deleteSprint(sprint.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Sprint
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSprints.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No sprints found</h3>
              <p className="text-neutral-600 mb-4">Try adjusting your search or create a new sprint.</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => onOpenTab && onOpenTab("create-sprint", "Create Sprint")}
              >
                Create Your First Sprint
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 