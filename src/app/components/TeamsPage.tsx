import { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  UserPlus,
  TrendingUp,
  Activity,
  Target,
  Award,
  BarChart3
} from "lucide-react";

// Sample team data
const teams = [
  {
    id: 1,
    name: "Frontend Development",
    description: "Responsible for user interface and user experience",
    members: [
      { id: 1, name: "Sarah Johnson", role: "Team Lead", avatar: "SJ", email: "sarah@company.com", status: "Online" },
      { id: 2, name: "Mike Chen", role: "Senior Developer", avatar: "MC", email: "mike@company.com", status: "Online" },
      { id: 3, name: "Emma Wilson", role: "UI/UX Designer", avatar: "EW", email: "emma@company.com", status: "Away" }
    ],
    project: "Whapi Project Management",
    tasksCompleted: 45,
    totalTasks: 60,
    performance: 92
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Server-side development and database management",
    members: [
      { id: 4, name: "Alex Rodriguez", role: "Team Lead", avatar: "AR", email: "alex@company.com", status: "Online" },
      { id: 5, name: "David Kim", role: "Senior Developer", avatar: "DK", email: "david@company.com", status: "Offline" }
    ],
    project: "Whapi Project Management",
    tasksCompleted: 38,
    totalTasks: 50,
    performance: 88
  },
  {
    id: 3,
    name: "Quality Assurance",
    description: "Testing and quality control for all projects",
    members: [
      { id: 6, name: "Lisa Thompson", role: "QA Lead", avatar: "LT", email: "lisa@company.com", status: "Online" },
      { id: 7, name: "James Brown", role: "Test Engineer", avatar: "JB", email: "james@company.com", status: "Online" },
      { id: 8, name: "Maria Garcia", role: "Automation Engineer", avatar: "MG", email: "maria@company.com", status: "Away" }
    ],
    project: "Client Portal",
    tasksCompleted: 52,
    totalTasks: 65,
    performance: 95
  }
];

const statusColors = {
  "Online": "bg-green-500",
  "Away": "bg-yellow-500",
  "Offline": "bg-neutral-400"
};

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = projectFilter === "All" || team.project === projectFilter;
    
    return matchesSearch && matchesProject;
  });

  const analytics = {
    totalTeams: teams.length,
    totalMembers: teams.reduce((sum, team) => sum + team.members.length, 0),
    activeMembers: teams.reduce((sum, team) => sum + team.members.filter(m => m.status === "Online").length, 0),
    avgPerformance: Math.round(teams.reduce((sum, team) => sum + team.performance, 0) / teams.length)
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Teams</h1>
            <p className="text-neutral-600">Manage your teams, track performance, and collaborate effectively.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            Create Team
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalTeams}</h3>
            <p className="text-neutral-600 text-sm">Total Teams</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalMembers}</h3>
            <p className="text-neutral-600 text-sm">Total Members</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.activeMembers}</h3>
            <p className="text-neutral-600 text-sm">Active Members</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.avgPerformance}%</h3>
            <p className="text-neutral-600 text-sm">Avg Performance</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search teams or members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Projects</option>
              <option value="Whapi Project Management">Whapi Project Management</option>
              <option value="Client Portal">Client Portal</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Teams List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">All Teams ({filteredTeams.length})</h2>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {filteredTeams.map((team) => (
            <div key={team.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-neutral-900">{team.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {team.members.length} members
                    </span>
                  </div>
                  
                  <p className="text-neutral-600 mb-3">{team.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>{team.project}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>{team.tasksCompleted}/{team.totalTasks} tasks completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>{team.performance}% performance</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-1">
                      <span>Task Completion</span>
                      <span>{Math.round((team.tasksCompleted / team.totalTasks) * 100)}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(team.tasksCompleted / team.totalTasks) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-3">Team Members</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {team.members.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                          <div className="relative">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-700">{member.avatar}</span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusColors[member.status]}`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">{member.name}</p>
                            <p className="text-xs text-neutral-500 truncate">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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

        {filteredTeams.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No teams found</h3>
            <p className="text-neutral-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 