import { useState } from "react";
import { 
  TrendingUp, TrendingDown, Calendar, Users, Target, Clock, CheckCircle, Download, RefreshCw, Eye, Share2, MoreHorizontal, Plus, Filter, Search, Edit, Trash2, Archive, Copy, BarChart3, PieChart, Activity, Star, FilterX, Grid3X3, List, Heart, ExternalLink, DollarSign, UserCheck, Timer, Flag, Layers, Zap, SortAsc, CheckSquare, Square, Play, Pause, StopCircle, RotateCcw, LineChart, Crown, Shield, Trophy, Medal, Users2, UserX, UserCheck2, UserMinus, UserPlus2, Settings, Globe, Building, Briefcase, Video, Phone, MessageSquare, Mail, AlertCircle, Info, Award, Paperclip, FileText, BarChart, Gauge
} from "lucide-react";

// Sample report data
const initialReports = [
  {
    id: 1,
    title: "Project Performance Report",
    description: "Comprehensive analysis of project completion rates and team productivity with detailed metrics and insights",
    type: "Performance",
    lastUpdated: "2024-02-15",
    views: 124,
    downloads: 45,
    status: "Active",
    archived: false,
    author: "Sarah Johnson",
    department: "Project Management",
    priority: "High",
    tags: ["Performance", "Analytics", "Productivity"],
    size: "2.4 MB",
    format: "PDF",
    scheduled: "Weekly",
    recipients: ["Management", "Team Leads"],
    insights: 12,
    recommendations: 8,
    dataPoints: 1250,
    accuracy: 98.5
  },
  {
    id: 2,
    title: "Team Productivity Analytics",
    description: "Detailed breakdown of team member contributions and efficiency metrics with performance trends",
    type: "Productivity",
    lastUpdated: "2024-02-14",
    views: 89,
    downloads: 32,
    status: "Active",
    archived: false,
    author: "Mike Chen",
    department: "HR Analytics",
    priority: "Medium",
    tags: ["Team", "Productivity", "HR"],
    size: "1.8 MB",
    format: "Excel",
    scheduled: "Bi-weekly",
    recipients: ["HR", "Team Managers"],
    insights: 9,
    recommendations: 6,
    dataPoints: 890,
    accuracy: 96.2
  },
  {
    id: 3,
    title: "Resource Allocation Summary",
    description: "Analysis of resource distribution across projects and departments with optimization recommendations",
    type: "Resources",
    lastUpdated: "2024-02-13",
    views: 67,
    downloads: 28,
    status: "Active",
    archived: false,
    author: "Alex Rodriguez",
    department: "Operations",
    priority: "High",
    tags: ["Resources", "Allocation", "Optimization"],
    size: "3.1 MB",
    format: "PowerPoint",
    scheduled: "Monthly",
    recipients: ["Operations", "Finance"],
    insights: 15,
    recommendations: 10,
    dataPoints: 2100,
    accuracy: 99.1
  },
  {
    id: 4,
    title: "Budget vs Actual Report",
    description: "Financial comparison of planned vs actual project expenditures with variance analysis",
    type: "Financial",
    lastUpdated: "2024-02-12",
    views: 156,
    downloads: 78,
    status: "Active",
    archived: false,
    author: "Emma Wilson",
    department: "Finance",
    priority: "High",
    tags: ["Budget", "Financial", "Analysis"],
    size: "4.2 MB",
    format: "PDF",
    scheduled: "Monthly",
    recipients: ["Finance", "Management"],
    insights: 18,
    recommendations: 12,
    dataPoints: 3400,
    accuracy: 99.8
  },
  {
    id: 5,
    title: "Customer Satisfaction Survey",
    description: "Analysis of customer feedback and satisfaction scores with improvement recommendations",
    type: "Customer",
    lastUpdated: "2024-02-11",
    views: 203,
    downloads: 95,
    status: "Active",
    archived: false,
    author: "Lisa Chen",
    department: "Customer Success",
    priority: "Medium",
    tags: ["Customer", "Feedback", "Satisfaction"],
    size: "2.1 MB",
    format: "PDF",
    scheduled: "Quarterly",
    recipients: ["Customer Success", "Product"],
    insights: 11,
    recommendations: 7,
    dataPoints: 1560,
    accuracy: 97.3
  },
  {
    id: 6,
    title: "Technology Stack Analysis",
    description: "Comprehensive review of technology stack performance and modernization opportunities",
    type: "Technology",
    lastUpdated: "2024-02-10",
    views: 78,
    downloads: 34,
    status: "Active",
    archived: false,
    author: "David Kim",
    department: "Engineering",
    priority: "Medium",
    tags: ["Technology", "Stack", "Modernization"],
    size: "5.6 MB",
    format: "Markdown",
    scheduled: "Quarterly",
    recipients: ["Engineering", "Architecture"],
    insights: 14,
    recommendations: 9,
    dataPoints: 2800,
    accuracy: 98.7
  }
];

const metrics = {
  totalProjects: 12,
  completedProjects: 8,
  activeTeams: 6,
  totalTasks: 245,
  completedTasks: 189,
  overdueTasks: 12,
  avgCompletionTime: "18 days",
  teamProductivity: 94,
  totalReports: 24,
  activeReports: 18,
  avgAccuracy: 98.2,
  totalInsights: 89
};

const chartData = {
  projectProgress: [
    { name: "Whapi PM", completed: 85, total: 100 },
    { name: "Client Portal", completed: 65, total: 100 },
    { name: "Mobile App", completed: 45, total: 100 },
    { name: "API Integration", completed: 90, total: 100 }
  ],
  monthlyTasks: [
    { month: "Jan", completed: 45, created: 52 },
    { month: "Feb", completed: 38, created: 41 },
    { month: "Mar", completed: 52, created: 48 },
    { month: "Apr", completed: 41, created: 45 }
  ]
};

const reportTypes = {
  "Performance": { color: "bg-blue-100 text-blue-700", icon: TrendingUp },
  "Productivity": { color: "bg-green-100 text-green-700", icon: Activity },
  "Resources": { color: "bg-purple-100 text-purple-700", icon: Users },
  "Financial": { color: "bg-orange-100 text-orange-700", icon: DollarSign },
  "Customer": { color: "bg-pink-100 text-pink-700", icon: MessageSquare },
  "Technology": { color: "bg-indigo-100 text-indigo-700", icon: Settings }
};

const priorityColors = {
  "High": "bg-red-100 text-red-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Low": "bg-green-100 text-green-700"
};

interface Report {
  id: number;
  title: string;
  description: string;
  type: string;
  lastUpdated: string;
  views: number;
  downloads: number;
  status: string;
  archived: boolean;
  author: string;
  department: string;
  priority: string;
  tags: string[];
  size: string;
  format: string;
  scheduled: string;
  recipients: string[];
  insights: number;
  recommendations: number;
  dataPoints: number;
  accuracy: number;
}

export default function ReportsPage({ onOpenTab }: { onOpenTab?: (type: string, title?: string) => void }) {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedReports, setExpandedReports] = useState<Set<number>>(new Set());

  const analytics = {
    totalReports: reports.length,
    activeReports: reports.filter(r => r.status === "Active").length,
    totalViews: reports.reduce((sum, r) => sum + r.views, 0),
    totalDownloads: reports.reduce((sum, r) => sum + r.downloads, 0),
    avgAccuracy: Math.round(reports.reduce((sum, r) => sum + r.accuracy, 0) / reports.length * 10) / 10,
    totalInsights: reports.reduce((sum, r) => sum + r.insights, 0)
  };

  const deleteReport = (reportId: number) => {
    setReports(reports.filter(report => report.id !== reportId));
  };

  const archiveReport = (reportId: number) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, archived: !report.archived } : report
    ));
  };

  const duplicateReport = (report: Report) => {
    const newReport = {
      ...report,
      id: Math.max(...reports.map(r => r.id)) + 1,
      title: `${report.title} (Copy)`,
      lastUpdated: new Date().toISOString().split('T')[0],
      views: 0,
      downloads: 0
    };
    setReports([...reports, newReport]);
  };

  const downloadReport = (report: Report) => {
    const reportContent = `
Report: ${report.title}
Type: ${report.type}
Author: ${report.author}
Department: ${report.department}
Last Updated: ${report.lastUpdated}
Description: ${report.description}
Format: ${report.format}
Size: ${report.size}
Accuracy: ${report.accuracy}%
Insights: ${report.insights}
Recommendations: ${report.recommendations}
Data Points: ${report.dataPoints}
    `;
    
    const dataBlob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareReport = (report: Report) => {
    const shareData = {
      title: report.title,
      text: report.description,
      url: `https://company.com/reports/${report.id}`
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${report.title}: ${report.description}`);
    }
  };

  const viewReport = (report: Report) => {
    console.log(`Viewing report: ${report.title}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("All");
    setPriorityFilter("All");
  };

  const toggleReport = (reportId: number) => {
    const newExpanded = new Set(expandedReports);
    if (newExpanded.has(reportId)) {
      newExpanded.delete(reportId);
    } else {
      newExpanded.add(reportId);
    }
    setExpandedReports(newExpanded);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "All" || report.type === typeFilter;
    const matchesPriority = priorityFilter === "All" || report.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg">
            <BarChart3 className="text-white mr-1" size={20} />
            <span>Reports</span>
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
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            New Report
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Enhanced Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalReports}</h3>
            <p className="text-slate-600 text-sm font-medium">Total Reports</p>
            <div className="mt-2 text-xs text-slate-500">+3 this month</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Eye className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalViews}</h3>
            <p className="text-slate-600 text-sm font-medium">Total Views</p>
            <div className="mt-2 text-xs text-slate-500">+15% from last week</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <Download className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalDownloads}</h3>
            <p className="text-slate-600 text-sm font-medium">Downloads</p>
            <div className="mt-2 text-xs text-slate-500">+8% from last week</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.avgAccuracy}%</h3>
            <p className="text-slate-600 text-sm font-medium">Avg Accuracy</p>
            <div className="mt-2 text-xs text-slate-500">+2% from last month</div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports, descriptions, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
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
                      ? "bg-indigo-100 text-indigo-600" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-indigo-100 text-indigo-600" 
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
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Types</option>
                  <option value="Performance">Performance</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Resources">Resources</option>
                  <option value="Financial">Financial</option>
                  <option value="Customer">Customer</option>
                  <option value="Technology">Technology</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>All Formats</option>
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>PowerPoint</option>
                  <option>Markdown</option>
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

        {/* Reports Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredReports.map((report, index) => {
            const ReportTypeIcon = reportTypes[report.type as keyof typeof reportTypes]?.icon || BarChart3;
            return (
              <div 
                key={report.id} 
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Report Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {report.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {report.description}
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

                  {/* Report Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{report.accuracy}%</div>
                      <div className="text-xs text-slate-500">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{report.insights}</div>
                      <div className="text-xs text-slate-500">Insights</div>
                    </div>
                  </div>

                  {/* Report Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${reportTypes[report.type as keyof typeof reportTypes]?.color}`}>
                        <ReportTypeIcon size={12} className="inline mr-1" />
                        {report.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[report.priority as keyof typeof priorityColors]}`}>
                        {report.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {report.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download size={12} />
                        {report.downloads}
                      </span>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FileText size={12} />
                        {report.format}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {report.lastUpdated}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {report.author}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Report Actions */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                      onClick={() => toggleReport(report.id)}
                    >
                      <Layers size={14} />
                      {expandedReports.has(report.id) ? 'Hide' : 'Show'} Details
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
                {expandedReports.has(report.id) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="border-t border-white/20 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Report Details</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Department:</span>
                              <span className="text-sm font-medium text-slate-900">{report.department}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Size:</span>
                              <span className="text-sm font-medium text-slate-900">{report.size}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Scheduled:</span>
                              <span className="text-sm font-medium text-slate-900">{report.scheduled}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Data Points:</span>
                              <span className="text-sm font-medium text-slate-900">{report.dataPoints.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Recommendations:</span>
                              <span className="text-sm font-medium text-slate-900">{report.recommendations}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Recipients</h4>
                          <div className="space-y-2">
                            {report.recipients.map((recipient, recipientIndex) => (
                              <div key={recipientIndex} className="flex items-center justify-between p-2 bg-slate-50/50 rounded-lg">
                                <span className="text-sm text-slate-900">{recipient}</span>
                                <div className="flex items-center gap-1">
                                  <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                                    <Mail size={12} />
                                  </button>
                                  <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                                    <Share2 size={12} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No reports found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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