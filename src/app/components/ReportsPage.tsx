import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Users,
  Target,
  Clock,
  CheckCircle,
  Download,
  RefreshCw,
  Eye,
  Share2,
  MoreHorizontal,
  Plus,
  Filter,
  Search,
  Edit,
  Trash2,
  Archive,
  Copy,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

// Sample report data
const initialReports = [
  {
    id: 1,
    title: "Project Performance Report",
    description: "Comprehensive analysis of project completion rates and team productivity",
    type: "Performance",
    lastUpdated: "2024-02-15",
    views: 124,
    downloads: 45,
    status: "Active",
    archived: false
  },
  {
    id: 2,
    title: "Team Productivity Analytics",
    description: "Detailed breakdown of team member contributions and efficiency metrics",
    type: "Productivity",
    lastUpdated: "2024-02-14",
    views: 89,
    downloads: 32,
    status: "Active",
    archived: false
  },
  {
    id: 3,
    title: "Resource Allocation Summary",
    description: "Analysis of resource distribution across projects and departments",
    type: "Resources",
    lastUpdated: "2024-02-13",
    views: 67,
    downloads: 28,
    status: "Active",
    archived: false
  },
  {
    id: 4,
    title: "Budget vs Actual Report",
    description: "Financial comparison of planned vs actual project expenditures",
    type: "Financial",
    lastUpdated: "2024-02-12",
    views: 156,
    downloads: 78,
    status: "Active",
    archived: false
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
  teamProductivity: 94
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
}

export default function ReportsPage({ onOpenTab }: { onOpenTab?: (type: string, title?: string) => void }) {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [timeRange, setTimeRange] = useState("30d");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Report actions
  const deleteReport = (reportId: number) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
    setShowMoreMenu(null);
  };

  const archiveReport = (reportId: number) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, archived: true } : report
    ));
    setShowMoreMenu(null);
  };

  const duplicateReport = (report: Report) => {
    const newReport = {
      ...report,
      id: Math.max(...reports.map(r => r.id)) + 1,
      title: `${report.title} (Copy)`,
      views: 0,
      downloads: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setReports(prev => [...prev, newReport]);
    setShowMoreMenu(null);
  };

  const downloadReport = (report: Report) => {
    // Simulate report download
    const reportData = {
      title: report.title,
      description: report.description,
      type: report.type,
      generatedAt: new Date().toISOString(),
      metrics: metrics,
      chartData: chartData
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    // Update download count
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r
    ));
  };

  const shareReport = (report: Report) => {
    const reportDetails = `
Report: ${report.title}
Type: ${report.type}
Description: ${report.description}
Last Updated: ${report.lastUpdated}
Views: ${report.views}
Downloads: ${report.downloads}
    `.trim();
    
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: reportDetails
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(reportDetails);
      alert('Report details copied to clipboard!');
    }
    setShowMoreMenu(null);
  };

  const viewReport = (report: Report) => {
    setSelectedReport(report);
    // Update view count
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, views: r.views + 1 } : r
    ));
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm;

  // Filter reports based on search
  const filteredReports = reports.filter(report => 
    !report.archived && (
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Reports & Analytics</h1>
            <p className="text-neutral-600">Comprehensive insights into your project performance and team productivity.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
              onClick={() => setTimeRange(timeRange === "30d" ? "7d" : timeRange === "7d" ? "90d" : "30d")}
            >
              <RefreshCw className="w-4 h-4" />
              {timeRange === "7d" ? "7 Days" : timeRange === "30d" ? "30 Days" : "90 Days"}
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => onOpenTab && onOpenTab("create-report", "Create Report")}
            >
              <Plus size={16} />
              New Report
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reports by title, description, or type..."
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
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Report Type</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Types</option>
                    <option>Performance</option>
                    <option>Productivity</option>
                    <option>Resources</option>
                    <option>Financial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Sort By</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>Last Updated</option>
                    <option>Most Viewed</option>
                    <option>Most Downloaded</option>
                    <option>Title A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metrics.totalProjects}</h3>
          <p className="text-neutral-600 text-sm">Total Projects</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metrics.completedProjects}</h3>
          <p className="text-neutral-600 text-sm">Completed Projects</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metrics.activeTeams}</h3>
          <p className="text-neutral-600 text-sm">Active Teams</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metrics.overdueTasks}</h3>
          <p className="text-neutral-600 text-sm">Overdue Tasks</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Project Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Project Progress</h3>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {chartData.projectProgress.map((project, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700">{project.name}</span>
                  <span className="text-sm text-neutral-500">{project.completed}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.completed}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Tasks Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Monthly Tasks</h3>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {chartData.monthlyTasks.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{month.month}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-neutral-500">{month.completed} completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-neutral-500">{month.created} created</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">All Reports ({filteredReports.length})</h2>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      report.type === "Performance" ? "bg-blue-100 text-blue-700" :
                      report.type === "Productivity" ? "bg-green-100 text-green-700" :
                      report.type === "Resources" ? "bg-purple-100 text-purple-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {report.type}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      report.status === "Active" ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-700"
                    }`}>
                      {report.status}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">{report.title}</h3>
                  
                  <p className="text-neutral-600 mb-3">{report.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Updated: {report.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{report.views} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button 
                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => viewReport(report)}
                    title="View Report"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => downloadReport(report)}
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    onClick={() => setShowMoreMenu(showMoreMenu === report.id ? null : report.id)}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  
                  {/* Report Actions Menu */}
                  {showMoreMenu === report.id && (
                    <div className="absolute right-0 top-12 z-10 bg-white border border-neutral-200 rounded shadow-lg min-w-[160px]">
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                        onClick={() => onOpenTab && onOpenTab("edit-report", `Edit: ${report.title}`)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit Report
                      </button>
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                        onClick={() => duplicateReport(report)}
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate Report
                      </button>
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                        onClick={() => shareReport(report)}
                      >
                        <Share2 className="w-4 h-4" />
                        Share Report
                      </button>
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-yellow-50 text-yellow-600 text-left"
                        onClick={() => archiveReport(report.id)}
                      >
                        <Archive className="w-4 h-4" />
                        Archive Report
                      </button>
                      <hr className="my-1" />
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-red-600 text-left"
                        onClick={() => deleteReport(report.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No reports found</h3>
            <p className="text-neutral-600 mb-4">Try adjusting your search or create a new report.</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => onOpenTab && onOpenTab("create-report", "Create Report")}
            >
              Create Your First Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 