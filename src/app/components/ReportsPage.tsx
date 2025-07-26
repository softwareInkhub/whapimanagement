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
  MoreHorizontal
} from "lucide-react";

// Sample report data
const reports = [
  {
    id: 1,
    title: "Project Performance Report",
    description: "Comprehensive analysis of project completion rates and team productivity",
    type: "Performance",
    lastUpdated: "2024-02-15",
    views: 124,
    downloads: 45,
    status: "Active"
  },
  {
    id: 2,
    title: "Team Productivity Analytics",
    description: "Detailed breakdown of team member contributions and efficiency metrics",
    type: "Productivity",
    lastUpdated: "2024-02-14",
    views: 89,
    downloads: 32,
    status: "Active"
  },
  {
    id: 3,
    title: "Resource Allocation Summary",
    description: "Analysis of resource distribution across projects and departments",
    type: "Resources",
    lastUpdated: "2024-02-13",
    views: 67,
    downloads: 28,
    status: "Active"
  },
  {
    id: 4,
    title: "Budget vs Actual Report",
    description: "Financial comparison of planned vs actual project expenditures",
    type: "Financial",
    lastUpdated: "2024-02-12",
    views: 156,
    downloads: 78,
    status: "Active"
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

export default function ReportsPage() {

  const [timeRange, setTimeRange] = useState("30d");

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
            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export All
            </button>
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
            <p className="text-green-600 text-xs mt-1">+12% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metrics.completedTasks}</h3>
            <p className="text-neutral-600 text-sm">Completed Tasks</p>
            <p className="text-green-600 text-xs mt-1">+8% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metrics.teamProductivity}%</h3>
            <p className="text-neutral-600 text-sm">Team Productivity</p>
            <p className="text-green-600 text-xs mt-1">+5% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metrics.avgCompletionTime}</h3>
            <p className="text-neutral-600 text-sm">Avg Completion Time</p>
            <p className="text-red-600 text-xs mt-1">-2 days from last month</p>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Time Range</h2>
            <div className="flex items-center gap-2">
              {["7d", "30d", "90d", "1y"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? "bg-blue-100 text-blue-700"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Project Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Project Progress</h3>
            <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
              <MoreHorizontal className="w-4 h-4" />
            </button>
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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Monthly Task Activity</h3>
            <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {chartData.monthlyTasks.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{month.month}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-neutral-600">{month.completed} completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-neutral-600">{month.created} created</span>
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
          <h2 className="text-lg font-semibold text-neutral-900">Available Reports</h2>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-neutral-900">{report.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {report.type}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {report.status}
                    </span>
                  </div>
                  
                  <p className="text-neutral-600 mb-3">{report.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Updated {new Date(report.lastUpdated).toLocaleDateString()}</span>
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
                  <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 