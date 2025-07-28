import { useState } from "react";
import {
  Building2, Building, ChevronRight, ChevronDown, Plus, Users, User, FolderKanban, Calendar, BarChart3, Settings, Search, MoreHorizontal, TrendingUp, Clock, CheckCircle, Mail, Phone, MapPin, Globe, Edit, Eye, Download, BookOpen, CheckSquare, Star, FilterX, Grid3X3, List, Heart, ExternalLink, GitCommit, DollarSign, UserCheck, Timer, Flag, Layers, Zap, SortAsc, Square, Play, Pause, StopCircle, RotateCcw, LineChart, Crown, Shield, Trophy, Medal, Users2, UserX, UserCheck2, UserMinus, UserPlus2, Briefcase, Video, MessageSquare, AlertCircle, Info, Award, Paperclip, FileText, BarChart, PieChart, ScatterChart, AreaChart, Gauge, Target, TrendingDown, Activity, Filter, Share2, Archive, Copy, Trash2, ArrowUpRight, ArrowDownRight, Minus
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
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Whapi Project Management",
      description: "Leading project management solutions for enterprise teams with AI-powered insights and advanced collaboration features",
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
      tags: ["AI", "Enterprise", "SaaS", "Cloud"],
      archived: false,
      priority: "High",
      health: "Excellent",
      velocity: 85,
      satisfaction: 94,
      engagement: 92,
      retention: 88,
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
          health: "Good",
          velocity: 78,
          tasks: 45,
          completedTasks: 34,
          archived: false,
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
              health: "Excellent",
              velocity: 95,
              totalTasks: 12,
              completedTasks: 12,
              archived: false,
              taskList: [
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
                  assignee: "Alex Rodriguez",
                  timeSpent: "25h",
                  timeEstimate: "30h",
                  priority: "Medium"
                }
              ]
            }
          ]
        }
      ],
      teams: [
        {
          id: 1,
          name: "Core Development",
          members: 12,
          lead: "Sarah Johnson",
          status: "Active",
          performance: 92,
          velocity: 85,
          projects: 3,
          lastActivity: "1 hour ago"
        }
      ],
      departments: [
        {
          id: 1,
          name: "Engineering",
          employees: 45,
          manager: "David Kim",
          status: "Active",
          budget: "$1.2M",
          projects: 8
        }
      ],
      sprints: [
        {
          id: 1,
          name: "Sprint 24",
          status: "Active",
          startDate: "2024-02-01",
          endDate: "2024-02-14",
          progress: 65,
          tasks: 24,
          completedTasks: 16,
          team: "Core Development"
            }
          ]
        },
        {
          id: 2,
      name: "TechCorp Solutions",
      description: "Innovative technology solutions for modern businesses with focus on digital transformation",
      status: "Active",
      type: "Technology",
      industry: "IT Services",
      founded: "2018",
      employees: 85,
      location: "Austin, TX",
      website: "https://techcorp.com",
      email: "info@techcorp.com",
      phone: "+1 (555) 987-6543",
      totalProjects: 8,
      activeProjects: 5,
      completedProjects: 3,
      totalTeams: 4,
      members: 52,
      revenue: "$1.8M",
      growth: "+12%",
      lastActivity: "4 hours ago",
      tags: ["Digital", "Cloud", "Consulting"],
      archived: false,
      priority: "Medium",
      health: "Good",
      velocity: 72,
      satisfaction: 87,
      engagement: 89,
      retention: 85,
      projects: [],
      teams: [],
      departments: [],
      sprints: []
    },
    {
      id: 3,
      name: "InnovateLab",
      description: "Research and development company specializing in cutting-edge technologies and innovation",
      status: "Active",
      type: "Research",
      industry: "R&D",
      founded: "2021",
      employees: 65,
      location: "Boston, MA",
      website: "https://innovatelab.com",
      email: "hello@innovatelab.com",
      phone: "+1 (555) 456-7890",
      totalProjects: 15,
      activeProjects: 10,
      completedProjects: 5,
      totalTeams: 5,
      members: 38,
      revenue: "$3.2M",
      growth: "+25%",
      lastActivity: "30 minutes ago",
      tags: ["Research", "Innovation", "AI"],
      archived: false,
      priority: "High",
      health: "Excellent",
      velocity: 91,
      satisfaction: 96,
      engagement: 94,
      retention: 92,
      projects: [],
      teams: [],
      departments: [],
      sprints: []
    }
  ]);

  const analytics = {
    totalCompanies: companies.length,
    activeCompanies: companies.filter(c => c.status === "Active").length,
    totalProjects: companies.reduce((sum, c) => sum + c.totalProjects, 0),
    totalTeams: companies.reduce((sum, c) => sum + c.totalTeams, 0),
    totalMembers: companies.reduce((sum, c) => sum + c.members, 0),
    avgRevenue: "$2.5M",
    avgGrowth: "+17%",
    avgSatisfaction: Math.round(companies.reduce((sum, c) => sum + c.satisfaction, 0) / companies.length)
  };

  const deleteCompany = (companyId: number) => {
    setCompanies(companies.filter(company => company.id !== companyId));
  };

  const archiveCompany = (companyId: number) => {
    setCompanies(companies.map(company => 
      company.id === companyId ? { ...company, archived: !company.archived } : company
    ));
  };

  const duplicateCompany = (company: typeof companies[0]) => {
    const newCompany = {
      ...company,
      id: Math.max(...companies.map(c => c.id)) + 1,
      name: `${company.name} (Copy)`,
      lastActivity: "Just now"
    };
    setCompanies([...companies, newCompany]);
  };

  const exportCompany = (company: typeof companies[0]) => {
    const companyData = `
Company: ${company.name}
Status: ${company.status}
Type: ${company.type}
Industry: ${company.industry}
Employees: ${company.employees}
Location: ${company.location}
Revenue: ${company.revenue}
Growth: ${company.growth}
Projects: ${company.totalProjects}
Teams: ${company.totalTeams}
Members: ${company.members}
    `;
    
    const dataBlob = new Blob([companyData], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${company.name.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteProject = (companyId: number, projectId: number) => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { ...company, projects: company.projects.filter(p => p.id !== projectId) }
        : company
    ));
  };

  const archiveProject = (companyId: number, projectId: number) => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { 
            ...company, 
            projects: company.projects.map(p => 
              p.id === projectId ? { ...p, archived: !p.archived } : p
            )
          }
        : company
    ));
  };

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

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("All");
    setStatusFilter("All");
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "All" || company.type === typeFilter;
    const matchesStatus = statusFilter === "All" || company.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const selectedCompanyData = companies.find(c => c.id === selectedCompany);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Enhanced Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalCompanies}</h3>
          <p className="text-slate-600 text-sm font-medium">Total Companies</p>
          <div className="mt-2 text-xs text-slate-500">+2 this quarter</div>
        </div>

        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <FolderKanban className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalProjects}</h3>
          <p className="text-slate-600 text-sm font-medium">Total Projects</p>
          <div className="mt-2 text-xs text-slate-500">+8 this month</div>
        </div>

        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalMembers}</h3>
          <p className="text-slate-600 text-sm font-medium">Total Members</p>
          <div className="mt-2 text-xs text-slate-500">+12 this month</div>
        </div>

        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
              <Target className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.avgSatisfaction}%</h3>
          <p className="text-slate-600 text-sm font-medium">Avg Satisfaction</p>
          <div className="mt-2 text-xs text-slate-500">+3% from last month</div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className={`grid gap-6 ${
        viewMode === "grid" 
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {filteredCompanies.map((company, index) => (
          <div 
            key={company.id}
            className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            {/* Company Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {company.description}
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

              {/* Company Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{company.totalProjects}</div>
                  <div className="text-xs text-slate-500">Projects</div>
                  </div>
                  <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{company.members}</div>
                  <div className="text-xs text-slate-500">Members</div>
                </div>
              </div>
              
              {/* Company Meta */}
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    company.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                          }`}>
                    {company.status}
                          </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {company.type}
                          </span>
                        </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={12} />
                    {company.growth}
                  </span>
                      </div>
                                </div>

              {/* Company Details */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                              <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {company.location}
                                </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {company.employees} employees
                                </span>
                              </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {company.lastActivity}
                  </span>
                            </div>
                        </div>
                    </div>

            {/* Company Actions */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <button
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={() => setSelectedCompany(company.id)}
                >
                  <Eye size={14} />
                  View Details
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
                    </div>
                  ))}
                </div>

      {/* Empty State */}
      {filteredCompanies.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-slate-400" />
        </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
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
  );

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg">
            <Building2 className="text-white mr-1" size={20} />
            <span>Companies</span>
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
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            New Company
                  </button>
                </div>
              </div>
              
      <div className="p-6 space-y-6">
        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search companies, descriptions, or industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
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
                      ? "bg-blue-100 text-blue-600" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Grid3X3 size={18} />
            </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-blue-100 text-blue-600" 
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
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Types</option>
                  <option value="Technology">Technology</option>
                  <option value="Research">Research</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Manufacturing">Manufacturing</option>
            </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
            </select>

                <select className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Industries</option>
                  <option>Software Development</option>
                  <option>IT Services</option>
                  <option>R&D</option>
                  <option>Consulting</option>
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

          {/* View Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
          <div className="flex space-x-1">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "projects", label: "Projects", icon: FolderKanban },
                { id: "teams", label: "Teams", icon: Users },
              { id: "departments", label: "Departments", icon: Building },
              { id: "sprints", label: "Sprints", icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      view === tab.id
                      ? "bg-blue-100 text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                  <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          {view === "overview" && renderOverview()}
        {view === "projects" && <div className="text-center py-12 text-slate-600">Projects view coming soon...</div>}
        {view === "teams" && <div className="text-center py-12 text-slate-600">Teams view coming soon...</div>}
        {view === "departments" && <div className="text-center py-12 text-slate-600">Departments view coming soon...</div>}
        {view === "sprints" && <div className="text-center py-12 text-slate-600">Sprints view coming soon...</div>}
      </div>
    </div>
  );
} 