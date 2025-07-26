import { useState } from "react";
import {
  Building2,
  Building,
  ChevronRight,
  ChevronDown,
  Plus,
  Users,
  User,
  FolderKanban,
  Calendar,
  BarChart3,
  Settings,
  Search,
  MoreHorizontal,
  TrendingUp,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit,
  Eye,
  Download,
  BookOpen,
  CheckSquare
} from "lucide-react";

export default function CompaniesPage() {
  const [selectedCompany, setSelectedCompany] = useState(1);
  const [view, setView] = useState("overview");
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);
  const [expandedTeams, setExpandedTeams] = useState<number[]>([]);
  const [expandedSprints, setExpandedSprints] = useState<number[]>([]);
  const [expandedStories, setExpandedStories] = useState<number[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [expandedSubprojects, setExpandedSubprojects] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "whapi project management",
      description: "Leading project management solutions for enterprise teams",
      status: "Active",
      type: "Technology",
      industry: "Software Development",
      founded: "2020",
      employees: 150,
      location: "San Francisco, CA",
      website: "https://whapi.com",
      email: "contact@whapi.com",
      phone: "+1 (555) 123-4567",
      totalProjects: 12,
      activeProjects: 8,
      completedProjects: 4,
      totalTeams: 6,
      members: 89,
      revenue: "$2.5M",
      growth: "+15%",
      lastActivity: "2 hours ago",
      tags: ["AI", "Enterprise", "SaaS"],
      archived: false,
      projects: [
        {
          id: 1,
          name: "Whapi Project Management Platform",
          status: "Active",
          progress: 75,
          team: "Core Development",
          deadline: "2024-06-30",
          priority: "High",
          budget: "$500K",
          manager: "Sarah Johnson",
          description: "Enterprise-grade project management platform with advanced analytics and team collaboration features",
          subprojects: [
            {
              id: 1,
              name: "User Authentication Module",
              status: "Completed",
              progress: 100,
              team: "Core Development",
              deadline: "2024-03-15",
              priority: "High",
              budget: "$80K",
              manager: "David Kim",
              tasks: [
                {
                  id: 1,
                  name: "OAuth Integration",
                  status: "Completed",
                  assignee: "Mike Chen",
                  timeSpent: "40h",
                  timeEstimate: "35h",
                  priority: "High"
                },
                {
                  id: 2,
                  name: "Password Reset Flow",
                  status: "Completed",
                  assignee: "Emma Wilson",
                  timeSpent: "25h",
                  timeEstimate: "30h",
                  priority: "Medium"
                }
              ]
            },
            {
              id: 2,
              name: "Dashboard Analytics",
              status: "In Progress",
              progress: 60,
              team: "Core Development",
              deadline: "2024-04-30",
              priority: "Medium",
              budget: "$120K",
              manager: "Alex Rodriguez",
              tasks: [
                {
                  id: 3,
                  name: "Chart Components",
                  status: "In Progress",
                  assignee: "Sarah Johnson",
                  timeSpent: "35h",
                  timeEstimate: "40h",
                  priority: "High"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "Client Portal",
          status: "Planning",
          progress: 25,
          team: "Frontend Development",
          deadline: "2024-08-31",
          priority: "Medium",
          budget: "$300K",
          manager: "Emma Wilson",
          description: "Customer-facing portal for client management and communication",
          subprojects: []
        }
      ],
      departments: [
        {
          id: 1,
          name: "Engineering",
          manager: "Sarah Johnson",
          members: 45,
          projects: 8,
          budget: "$1.2M",
          employees: 45,
          status: "Active",
          subdepartments: [
            {
              id: 1,
              name: "Frontend Engineering",
              manager: "Sarah Johnson",
              employees: 18,
              projects: 4,
              budget: "$500K",
              status: "Active"
            },
            {
              id: 2,
              name: "Backend Engineering",
              manager: "Mike Chen",
              employees: 15,
              projects: 3,
              budget: "$400K",
              status: "Active"
            }
          ]
        },
        {
          id: 2,
          name: "Product",
          manager: "Alex Rodriguez",
          members: 12,
          projects: 4,
          budget: "$400K",
          employees: 12,
          status: "Active",
          subdepartments: []
        }
      ],
      teams: [
        {
          id: 1,
          name: "Core Development",
          members: 15,
          projects: 3,
          lead: "David Kim",
          performance: 92,
          department: "Engineering",
          subteams: [
            {
              id: 1,
              name: "React Team",
              members: 6,
              lead: "David Kim",
              projects: 2,
              performance: 94,
              focus: "Frontend Development"
            },
            {
              id: 2,
              name: "Node.js Team",
              members: 5,
              lead: "Mike Chen",
              projects: 2,
              performance: 89,
              focus: "Backend Development"
            }
          ]
        },
        {
          id: 2,
          name: "Frontend Development",
          members: 12,
          projects: 2,
          lead: "Emma Wilson",
          performance: 88,
          department: "Engineering",
          subteams: [
            {
              id: 3,
              name: "UI Components",
              members: 3,
              lead: "Alex Rodriguez",
              projects: 1,
              performance: 91,
              focus: "Component Library"
            }
          ]
        }
      ],
      sprints: [
        {
          id: 1,
          name: "Sprint 1",
          status: "Completed",
          startDate: "2024-01-01",
          endDate: "2024-01-14",
          tasks: 24,
          completed: 22,
          team: "Core Development",
          velocity: 85,
          calendar: {
            totalEvents: 45,
            upcomingEvents: 12,
            completedEvents: 33,
            todayEvents: 3
          },
          stories: [
            {
              id: 1,
              name: "User Authentication System",
              status: "Completed",
              priority: "High",
              assignee: "David Kim",
              storyPoints: 8,
              tasks: [
                {
                  id: 1,
                  name: "Design login UI components",
                  status: "Completed",
                  assignee: "Alex Rodriguez",
                  timeSpent: "4h",
                  timeEstimate: "4h",
                  priority: "Medium"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "Sprint 2",
          status: "Active",
          startDate: "2024-01-15",
          endDate: "2024-01-28",
          tasks: 28,
          completed: 18,
          team: "Frontend Development",
          velocity: 78,
          calendar: {
            totalEvents: 38,
            upcomingEvents: 15,
            completedEvents: 23,
            todayEvents: 5
          },
          stories: [
            {
              id: 2,
              name: "Dashboard Implementation",
              status: "In Progress",
              priority: "Medium",
              assignee: "Emma Wilson",
              storyPoints: 5,
              tasks: [
                {
                  id: 2,
                  name: "Create chart components",
                  status: "In Progress",
                  assignee: "Emma Wilson",
                  timeSpent: "8h",
                  timeEstimate: "10h",
                  priority: "Medium"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Inkhub",
      description: "Documentation and knowledge management platform",
      status: "Active",
      type: "Technology",
      industry: "Software Development",
      founded: "2021",
      employees: 75,
      location: "New York, NY",
      website: "https://inkhub.com",
      email: "hello@inkhub.com",
      phone: "+1 (555) 987-6543",
      totalProjects: 6,
      activeProjects: 4,
      completedProjects: 2,
      totalTeams: 4,
      members: 45,
      revenue: "$1.8M",
      growth: "+22%",
      lastActivity: "1 hour ago",
      tags: ["Documentation", "Knowledge Management", "SaaS"],
      archived: false,
      projects: [],
      departments: [],
      teams: [],
      sprints: []
    }
  ]);

  // Company actions
  const deleteCompany = (companyId: number) => {
    setCompanies(prev => prev.filter(company => company.id !== companyId));
  };

  const archiveCompany = (companyId: number) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId ? { ...company, archived: true } : company
    ));
  };

  const duplicateCompany = (company: typeof companies[0]) => {
    const newCompany = {
      ...company,
      id: Math.max(...companies.map(c => c.id)) + 1,
      name: `${company.name} (Copy)`,
      status: "Planning"
    };
    setCompanies(prev => [...prev, newCompany]);
  };

  const exportCompany = (company: typeof companies[0]) => {
    const dataStr = JSON.stringify(company, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${company.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Project actions
  const deleteProject = (companyId: number, projectId: number) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { ...company, projects: company.projects.filter(p => p.id !== projectId) }
        : company
    ));
  };

  const archiveProject = (companyId: number, projectId: number) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { 
            ...company, 
            projects: company.projects.map(p => 
              p.id === projectId ? { ...p, status: "Archived" } : p
            )
          }
        : company
    ));
  };

  // Toggle expansion functions
  const toggleDepartment = (deptId: number) => {
    setExpandedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const toggleTeam = (teamId: number) => {
    setExpandedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const toggleSprint = (sprintId: number) => {
    setExpandedSprints(prev => 
      prev.includes(sprintId) 
        ? prev.filter(id => id !== sprintId)
        : [...prev, sprintId]
    );
  };

  const toggleProject = (projectId: number) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleSubproject = (subprojectId: number) => {
    setExpandedSubprojects(prev => 
      prev.includes(subprojectId) 
        ? prev.filter(id => id !== subprojectId)
        : [...prev, subprojectId]
    );
  };

  // Contact actions
  const contactCompany = (company: typeof companies[0], method: 'email' | 'phone' | 'website') => {
    switch (method) {
      case 'email':
        window.open(`mailto:${company.email}`);
        break;
      case 'phone':
        window.open(`tel:${company.phone}`);
        break;
      case 'website':
        window.open(company.website, '_blank');
        break;
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
  };

  const hasActiveFilters = searchTerm;

  const selectedCompanyData = companies.find(c => c.id === selectedCompany);

  const analytics = {
    totalCompanies: companies.length,
    activeCompanies: companies.filter(c => c.status === "Active").length,
    totalProjects: companies.reduce((sum, c) => sum + c.projects.length, 0),
    totalTeams: companies.reduce((sum, c) => sum + c.teams.length, 0),
    totalMembers: companies.reduce((sum, c) => sum + c.members, 0)
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalCompanies}</h3>
          <p className="text-neutral-600 text-sm">Total Companies</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <FolderKanban className="w-6 h-6 text-green-600" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalProjects}</h3>
          <p className="text-neutral-600 text-sm">Total Projects</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalTeams}</h3>
          <p className="text-neutral-600 text-sm">Total Teams</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalMembers}</h3>
          <p className="text-neutral-600 text-sm">Total Members</p>
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Company Details</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{selectedCompanyData?.name}</h3>
                  <p className="text-neutral-600">{selectedCompanyData?.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedCompanyData?.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {selectedCompanyData?.status}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {selectedCompanyData?.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-500">Industry:</span>
                  <p className="font-medium">{selectedCompanyData?.industry}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Founded:</span>
                  <p className="font-medium">{selectedCompanyData?.founded}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Employees:</span>
                  <p className="font-medium">{selectedCompanyData?.employees}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Revenue:</span>
                  <p className="font-medium">{selectedCompanyData?.revenue}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm">{selectedCompanyData?.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm">{selectedCompanyData?.website}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm">{selectedCompanyData?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm">{selectedCompanyData?.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Recent Projects</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {selectedCompanyData?.projects.slice(0, 3).map((project) => (
            <div key={project.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium text-neutral-900">{project.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.priority === "High" ? "bg-red-100 text-red-700" :
                    project.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {project.priority}
                  </span>
                  <button className="p-1 text-neutral-400 hover:text-neutral-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <div className="flex items-center gap-4">
                  <span>{project.team}</span>
                  <span>Due: {project.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{project.progress}%</span>
                  <div className="w-20 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Project Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Projects</p>
              <p className="text-2xl font-bold text-neutral-900">{selectedCompanyData?.projects.length}</p>
            </div>
            <FolderKanban className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Projects</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedCompanyData?.projects.filter(p => p.status === "Active").length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((selectedCompanyData?.projects?.reduce((acc, p) => acc + p.progress, 0) || 0) / (selectedCompanyData?.projects?.length || 1))}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Budget</p>
              <p className="text-2xl font-bold text-purple-600">
                ${(selectedCompanyData?.projects?.reduce((acc, p) => acc + parseInt(p.budget.replace(/[^0-9]/g, '')), 0) || 0) / 1000}M
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Project Management */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Project Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            New Project
          </button>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {selectedCompanyData?.projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setExpandedProjects(prev => 
                        prev.includes(project.id) 
                          ? prev.filter(id => id !== project.id)
                          : [...prev, project.id]
                      );
                    }}
                    className="p-1 rounded hover:bg-neutral-100 transition-colors"
                  >
                    {expandedProjects.includes(project.id) ? (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  <FolderKanban className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-neutral-900">{project.name}</h3>
                    <p className="text-sm text-neutral-600">Manager: {project.manager} • {project.team}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">{project.progress}%</p>
                    <p className="text-xs text-neutral-500">Progress</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{project.budget}</p>
                    <p className="text-xs text-neutral-500">Budget</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === "Active" ? "bg-green-100 text-green-700" :
                    project.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                    "bg-neutral-100 text-neutral-700"
                  }`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.priority === "High" ? "bg-red-100 text-red-700" :
                    project.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {project.priority}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Project Description */}
              <div className="mb-4 text-sm text-neutral-600">
                {project.description}
              </div>
              
              {/* Project Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="text-neutral-500">Deadline:</span>
                  <p className="font-medium">{project.deadline}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Progress:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Sub-projects:</span>
                  <p className="font-medium">{project.subprojects?.length || 0}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Total Tasks:</span>
                  <p className="font-medium">
                    {project.subprojects?.reduce((acc, sp) => acc + (sp.tasks?.length || 0), 0) || 0}
                  </p>
                </div>
              </div>
              
              {/* Sub-projects */}
              {expandedProjects.includes(project.id) && project.subprojects && (
                <div className="ml-10 space-y-4">
                  {project.subprojects.map((subproject) => (
                    <div key={subproject.id} className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setExpandedSubprojects(prev => 
                                prev.includes(subproject.id) 
                                  ? prev.filter(id => id !== subproject.id)
                                  : [...prev, subproject.id]
                              );
                            }}
                            className="p-1 rounded hover:bg-neutral-200 transition-colors"
                          >
                            {expandedSubprojects.includes(subproject.id) ? (
                              <ChevronDown className="w-3 h-3 text-neutral-400" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-neutral-400" />
                            )}
                          </button>
                          <FolderKanban className="w-4 h-4 text-blue-400" />
                          <div>
                            <h4 className="font-medium text-neutral-800 text-sm">{subproject.name}</h4>
                            <p className="text-xs text-neutral-600">Manager: {subproject.manager} • {subproject.team}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-center">
                            <p className="text-xs font-medium">{subproject.progress}%</p>
                            <p className="text-xs text-neutral-500">Progress</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-medium">{subproject.budget}</p>
                            <p className="text-xs text-neutral-500">Budget</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subproject.status === "Completed" ? "bg-green-100 text-green-700" :
                            subproject.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                            subproject.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                            "bg-neutral-100 text-neutral-700"
                          }`}>
                            {subproject.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            subproject.priority === "High" ? "bg-red-100 text-red-700" :
                            subproject.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {subproject.priority}
                          </span>
                        </div>
                      </div>
                      
                      {/* Tasks */}
                      {expandedSubprojects.includes(subproject.id) && subproject.tasks && (
                        <div className="ml-6 space-y-2">
                          {subproject.tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded border border-neutral-200">
                              <div className="flex items-center gap-3">
                                <CheckSquare className="w-4 h-4 text-blue-500" />
                                <div>
                                  <h5 className="font-medium text-neutral-800 text-sm">{task.name}</h5>
                                  <p className="text-xs text-neutral-600">Assignee: {task.assignee}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-xs font-medium">{task.timeSpent}</p>
                                  <p className="text-xs text-neutral-500">Spent</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs font-medium">{task.timeEstimate}</p>
                                  <p className="text-xs text-neutral-500">Estimate</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.status === "Completed" ? "bg-green-100 text-green-700" :
                                  task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                  "bg-neutral-100 text-neutral-700"
                                }`}>
                                  {task.status}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.priority === "High" ? "bg-red-100 text-red-700" :
                                  task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                  "bg-green-100 text-green-700"
                                }`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeams = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">All Teams</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            New Team
          </button>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {selectedCompanyData?.teams.map((team) => (
            <div key={team.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setExpandedTeams(prev => 
                        prev.includes(team.id) 
                          ? prev.filter(id => id !== team.id)
                          : [...prev, team.id]
                      );
                    }}
                    className="p-1 rounded hover:bg-neutral-100 transition-colors"
                  >
                    {expandedTeams.includes(team.id) ? (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  <Users className="w-6 h-6 text-purple-500" />
                  <div>
                    <h3 className="font-medium text-neutral-900">{team.name}</h3>
                    <p className="text-sm text-neutral-600">Lead: {team.lead} • {team.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{team.members}</p>
                    <p className="text-xs text-neutral-500">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{team.projects}</p>
                    <p className="text-xs text-neutral-500">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{team.performance}%</p>
                    <p className="text-xs text-neutral-500">Performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Sub-teams */}
              {expandedTeams.includes(team.id) && team.subteams && (
                <div className="ml-10 mt-4 space-y-3">
                  {team.subteams.map((subteam) => (
                    <div key={subteam.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-purple-400" />
                        <div>
                          <h4 className="font-medium text-neutral-800 text-sm">{subteam.name}</h4>
                          <p className="text-xs text-neutral-600">Lead: {subteam.lead} • {subteam.focus}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs font-medium">{subteam.members}</p>
                          <p className="text-xs text-neutral-500">Members</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium">{subteam.projects}</p>
                          <p className="text-xs text-neutral-500">Projects</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium">{subteam.performance}%</p>
                          <p className="text-xs text-neutral-500">Performance</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">All Departments</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            New Department
          </button>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {selectedCompanyData?.departments.map((department) => (
            <div key={department.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setExpandedDepartments(prev => 
                        prev.includes(department.id) 
                          ? prev.filter(id => id !== department.id)
                          : [...prev, department.id]
                      );
                    }}
                    className="p-1 rounded hover:bg-neutral-100 transition-colors"
                  >
                    {expandedDepartments.includes(department.id) ? (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  <Building2 className="w-6 h-6 text-indigo-500" />
                  <div>
                    <h3 className="font-medium text-neutral-900">{department.name}</h3>
                    <p className="text-sm text-neutral-600">Manager: {department.manager}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{department.employees}</p>
                    <p className="text-xs text-neutral-500">Employees</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{department.projects}</p>
                    <p className="text-xs text-neutral-500">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{department.budget}</p>
                    <p className="text-xs text-neutral-500">Budget</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      department.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {department.status}
                    </span>
                    <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Sub-departments */}
              {expandedDepartments.includes(department.id) && department.subdepartments && (
                <div className="ml-10 mt-4 space-y-3">
                  {department.subdepartments.map((subdept) => (
                    <div key={subdept.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-indigo-400" />
                        <div>
                          <h4 className="font-medium text-neutral-800 text-sm">{subdept.name}</h4>
                          <p className="text-xs text-neutral-600">Manager: {subdept.manager}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs font-medium">{subdept.employees}</p>
                          <p className="text-xs text-neutral-500">Employees</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium">{subdept.projects}</p>
                          <p className="text-xs text-neutral-500">Projects</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium">{subdept.budget}</p>
                          <p className="text-xs text-neutral-500">Budget</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          subdept.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {subdept.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSprints = () => (
    <div className="space-y-6">
      {/* Sprint Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Sprints</p>
              <p className="text-2xl font-bold text-neutral-900">{selectedCompanyData?.sprints.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Active Sprints</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedCompanyData?.sprints.filter(s => s.status === "Active").length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {selectedCompanyData?.sprints.filter(s => s.status === "Completed").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg Velocity</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((selectedCompanyData?.sprints?.reduce((acc, s) => acc + s.velocity, 0) || 0) / (selectedCompanyData?.sprints?.length || 1))}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Sprint Calendar Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Sprint Calendar Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedCompanyData?.sprints.map((sprint) => (
              <div key={sprint.id} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-neutral-900 text-sm">{sprint.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sprint.status === "Completed" ? "bg-green-100 text-green-700" :
                    sprint.status === "Active" ? "bg-blue-100 text-blue-700" :
                    sprint.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                    "bg-neutral-100 text-neutral-700"
                  }`}>
                    {sprint.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Events:</span>
                    <span className="font-medium">{sprint.calendar.totalEvents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Today:</span>
                    <span className="font-medium">{sprint.calendar.todayEvents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Upcoming:</span>
                    <span className="font-medium">{sprint.calendar.upcomingEvents}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Sprint Management */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Sprint Management</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            New Sprint
          </button>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {selectedCompanyData?.sprints.map((sprint) => (
            <div key={sprint.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setExpandedSprints(prev => 
                        prev.includes(sprint.id) 
                          ? prev.filter(id => id !== sprint.id)
                          : [...prev, sprint.id]
                      );
                    }}
                    className="p-1 rounded hover:bg-neutral-100 transition-colors"
                  >
                    {expandedSprints.includes(sprint.id) ? (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  <Calendar className="w-6 h-6 text-pink-500" />
                  <div>
                    <h3 className="font-medium text-neutral-900">{sprint.name}</h3>
                    <p className="text-sm text-neutral-600">{sprint.team}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">{sprint.completed}/{sprint.tasks}</p>
                    <p className="text-xs text-neutral-500">Tasks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{sprint.velocity}</p>
                    <p className="text-xs text-neutral-500">Velocity</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sprint.status === "Completed" ? "bg-green-100 text-green-700" :
                    sprint.status === "Active" ? "bg-blue-100 text-blue-700" :
                    sprint.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                    "bg-neutral-100 text-neutral-700"
                  }`}>
                    {sprint.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Sprint Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="text-neutral-500">Duration:</span>
                  <p className="font-medium">{sprint.startDate} - {sprint.endDate}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Progress:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500 rounded-full" 
                        style={{ width: `${(sprint.completed / sprint.tasks) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{Math.round((sprint.completed / sprint.tasks) * 100)}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-neutral-500">Calendar Events:</span>
                  <p className="font-medium">{sprint.calendar.totalEvents}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Stories:</span>
                  <p className="font-medium">{sprint.stories.length}</p>
                </div>
              </div>
              
              {/* Stories and Tasks */}
              {expandedSprints.includes(sprint.id) && (
                <div className="ml-10 space-y-4">
                  {sprint.stories.map((story) => (
                    <div key={story.id} className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setExpandedStories(prev => 
                                prev.includes(story.id) 
                                  ? prev.filter(id => id !== story.id)
                                  : [...prev, story.id]
                              );
                            }}
                            className="p-1 rounded hover:bg-neutral-200 transition-colors"
                          >
                            {expandedStories.includes(story.id) ? (
                              <ChevronDown className="w-3 h-3 text-neutral-400" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-neutral-400" />
                            )}
                          </button>
                          <BookOpen className="w-4 h-4 text-green-500" />
                          <div>
                            <h4 className="font-medium text-neutral-800 text-sm">{story.name}</h4>
                            <p className="text-xs text-neutral-600">Assignee: {story.assignee} • {story.storyPoints} SP</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            story.status === "Completed" ? "bg-green-100 text-green-700" :
                            story.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                            story.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                            "bg-neutral-100 text-neutral-700"
                          }`}>
                            {story.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            story.priority === "High" ? "bg-red-100 text-red-700" :
                            story.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {story.priority}
                          </span>
                        </div>
                      </div>
                      
                      {/* Tasks */}
                      {expandedStories.includes(story.id) && story.tasks && (
                        <div className="ml-6 space-y-2">
                          {story.tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded border border-neutral-200">
                              <div className="flex items-center gap-3">
                                <CheckSquare className="w-4 h-4 text-blue-500" />
                                <div>
                                  <h5 className="font-medium text-neutral-800 text-sm">{task.name}</h5>
                                  <p className="text-xs text-neutral-600">Assignee: {task.assignee}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <p className="text-xs font-medium">{task.timeSpent}</p>
                                  <p className="text-xs text-neutral-500">Spent</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs font-medium">{task.timeEstimate}</p>
                                  <p className="text-xs text-neutral-500">Estimate</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.status === "Completed" ? "bg-green-100 text-green-700" :
                                  task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                  "bg-neutral-100 text-neutral-700"
                                }`}>
                                  {task.status}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.priority === "High" ? "bg-red-100 text-red-700" :
                                  task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                  "bg-green-100 text-green-700"
                                }`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Companies</h1>
            <p className="text-neutral-600">Manage your companies, projects, and teams in one place.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              Add Company
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Industries</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
            </select>
            <select className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Company List Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-800">Companies</h2>
            </div>
            
            <div className="p-2">
              {companies.map((company) => (
                <div 
                  key={company.id} 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-neutral-700 hover:bg-neutral-50 relative group ${
                    selectedCompany === company.id ? "bg-blue-50 text-blue-700" : ""
                  }`}
                  onClick={() => setSelectedCompany(company.id)}
                >
                  <button className="p-1 rounded hover:bg-neutral-100 transition-colors">
                    <ChevronRight size={16} className="text-neutral-400" />
                  </button>
                  <Building2 size={18} className="text-blue-500" />
                  <span className="text-sm font-semibold text-neutral-800 flex-1 truncate">{company.name}</span>
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-600">AI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* View Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 mb-6">
            <div className="flex border-b border-neutral-200 overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "projects", label: "Projects", icon: FolderKanban },
                { id: "departments", label: "Departments", icon: Building2 },
                { id: "teams", label: "Teams", icon: Users },
                { id: "sprints", label: "Sprints", icon: Calendar },
                { id: "settings", label: "Settings", icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                      view === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          {view === "overview" && renderOverview()}
          {view === "projects" && renderProjects()}
          {view === "departments" && renderDepartments()}
          {view === "teams" && renderTeams()}
          {view === "sprints" && renderSprints()}
          {view === "settings" && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Company Settings</h2>
              <p className="text-neutral-600">Settings and configuration options will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 