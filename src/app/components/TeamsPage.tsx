import { useEffect, useState } from "react";
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
  BarChart3,
  Edit,
  Trash2,
  Archive,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Star,
  Eye,
  Share2,
  Download,
  FilterX,
  Grid3X3,
  List,
  Bell,
  Heart,
  ExternalLink,
  GitCommit,
  DollarSign,
  CalendarDays,
  UserCheck,
  Timer,
  Flag,
  Layers,
  Zap,
  TrendingDown,
  SortAsc,
  CheckCircle,
  Square,
  Play,
  Pause,
  StopCircle,
  RotateCcw,
  PieChart,
  LineChart,
  Crown,
  Shield,
  Trophy,
  Medal,
  Users2,
  UserX,
  UserCheck2,
  UserMinus,
  UserPlus2,
  Settings,
  Globe,
  MapPin,
  Building,
  Briefcase
} from "lucide-react";
import CreateTeamModal from "./CreateTeamModal";

// Sample team data
const initialTeams = [
  {
    id: 1,
    name: "Frontend Development",
    description: "Responsible for user interface and user experience with modern design patterns",
    members: [
      { id: 1, name: "Sarah Johnson", role: "Team Lead", avatar: "SJ", email: "sarah@company.com", status: "Online", phone: "+1-555-0123", skills: ["React", "TypeScript", "UI/UX"], experience: "5 years", projects: 12 },
      { id: 2, name: "Mike Chen", role: "Senior Developer", avatar: "MC", email: "mike@company.com", status: "Online", phone: "+1-555-0124", skills: ["Vue.js", "JavaScript", "CSS"], experience: "4 years", projects: 8 },
      { id: 3, name: "Emma Wilson", role: "UI/UX Designer", avatar: "EW", email: "emma@company.com", status: "Away", phone: "+1-555-0125", skills: ["Figma", "Adobe XD", "Prototyping"], experience: "3 years", projects: 15 }
    ],
    project: "Whapi Project Management",
    tasksCompleted: 45,
    totalTasks: 60,
    performance: 92,
    velocity: 87,
    health: "excellent",
    budget: "$85K",
    startDate: "2024-01-01",
    archived: false,
    tags: ["Frontend", "Design", "React"],
    achievements: ["Best Team Q1", "100% On-time Delivery"],
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Server-side development and database management with scalable architecture",
    members: [
      { id: 4, name: "Alex Rodriguez", role: "Team Lead", avatar: "AR", email: "alex@company.com", status: "Online", phone: "+1-555-0126", skills: ["Node.js", "Python", "AWS"], experience: "6 years", projects: 18 },
      { id: 5, name: "David Kim", role: "Senior Developer", avatar: "DK", email: "david@company.com", status: "Offline", phone: "+1-555-0127", skills: ["Java", "Spring", "Docker"], experience: "5 years", projects: 10 }
    ],
    project: "Whapi Project Management",
    tasksCompleted: 38,
    totalTasks: 50,
    performance: 88,
    velocity: 75,
    health: "good",
    budget: "$120K",
    startDate: "2024-01-15",
    archived: false,
    tags: ["Backend", "API", "Database"],
    achievements: ["Performance Award", "Security Excellence"],
    lastActivity: "4 hours ago"
  },
  {
    id: 3,
    name: "Quality Assurance",
    description: "Testing and quality control for all projects with automated testing",
    members: [
      { id: 6, name: "Lisa Thompson", role: "QA Lead", avatar: "LT", email: "lisa@company.com", status: "Online", phone: "+1-555-0128", skills: ["Selenium", "Jest", "Cypress"], experience: "4 years", projects: 20 },
      { id: 7, name: "James Brown", role: "Test Engineer", avatar: "JB", email: "james@company.com", status: "Online", phone: "+1-555-0129", skills: ["Manual Testing", "API Testing", "Performance"], experience: "3 years", projects: 12 },
      { id: 8, name: "Maria Garcia", role: "Automation Engineer", avatar: "MG", email: "maria@company.com", status: "Away", phone: "+1-555-0130", skills: ["Playwright", "Python", "CI/CD"], experience: "5 years", projects: 16 }
    ],
    project: "Client Portal",
    tasksCompleted: 52,
    totalTasks: 65,
    performance: 95,
    velocity: 92,
    health: "excellent",
    budget: "$95K",
    startDate: "2024-02-01",
    archived: false,
    tags: ["Testing", "Automation", "Quality"],
    achievements: ["Zero Bug Release", "Test Coverage Award"],
    lastActivity: "1 hour ago"
  },
  {
    id: 4,
    name: "DevOps & Infrastructure",
    description: "Infrastructure management and deployment automation",
    members: [
      { id: 9, name: "Chris Lee", role: "DevOps Engineer", avatar: "CL", email: "chris@company.com", status: "Online", phone: "+1-555-0131", skills: ["Docker", "Kubernetes", "AWS"], experience: "4 years", projects: 14 },
      { id: 10, name: "Rachel Green", role: "Infrastructure Lead", avatar: "RG", email: "rachel@company.com", status: "Online", phone: "+1-555-0132", skills: ["Terraform", "Ansible", "Linux"], experience: "6 years", projects: 22 }
    ],
    project: "Analytics Platform",
    tasksCompleted: 28,
    totalTasks: 35,
    performance: 82,
    velocity: 78,
    health: "good",
    budget: "$110K",
    startDate: "2024-01-20",
    archived: false,
    tags: ["DevOps", "Infrastructure", "Cloud"],
    achievements: ["Infrastructure Award", "Uptime Excellence"],
    lastActivity: "30 minutes ago"
  }
];

const statusColors = {
  "Online": "bg-emerald-500",
  "Away": "bg-yellow-500",
  "Offline": "bg-slate-400",
  "Busy": "bg-red-500"
};

const healthColors = {
  "excellent": "text-emerald-600 bg-emerald-100",
  "good": "text-blue-600 bg-blue-100",
  "warning": "text-yellow-600 bg-yellow-100",
  "critical": "text-red-600 bg-red-100"
};

interface Team {
  id: number;
  name: string;
  description: string;
  members: Array<{
    id: number;
    name: string;
    role: string;
    avatar: string;
    email: string;
    status: string;
    phone: string;
    skills: string[];
    experience: string;
    projects: number;
  }>;
  project: string;
  tasksCompleted: number;
  totalTasks: number;
  performance: number;
  velocity: number;
  health: string;
  budget: string;
  startDate: string;
  archived: boolean;
  tags: string[];
  achievements: string[];
  lastActivity: string;
}

export default function TeamsPage({ onOpenTab }: { onOpenTab?: (type: string, title?: string) => void }) {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedTeams, setExpandedTeams] = useState<Set<number>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateTeam = async (team: { 
    name: string; 
    description: string; 
    members: string[];
    whatsappGroupId?: string;
    whatsappGroupName?: string;
  }) => {
    try {
      // Create the team locally
      const newTeam: Team = {
        id: Math.max(...teams.map(t => t.id)) + 1,
        name: team.name,
        description: team.description,
        members: team.members.map((member, index) => ({
          id: Math.max(...teams.flatMap(t => t.members.map(m => m.id))) + index + 1,
          name: member,
          role: "Member",
          avatar: member.split(' ').map(n => n[0]).join(''),
          email: `${member.toLowerCase().replace(' ', '.')}@company.com`,
          status: "Online",
          phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          skills: ["General"],
          experience: "1 year",
          projects: 1
        })),
        project: "Whapi Project Management",
        tasksCompleted: 0,
        totalTasks: 0,
        performance: 85,
        velocity: 80,
        health: "good",
        budget: "$50K",
        startDate: new Date().toISOString().split('T')[0],
        archived: false,
        tags: ["New Team"],
        achievements: [],
        lastActivity: "Just now"
      };
      
      setTeams([...teams, newTeam]);
      setShowCreateModal(false);
      
      console.log('Team created successfully:', newTeam);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const analytics = {
    totalTeams: Array.isArray(teams) ? teams.length : 0,
    totalMembers: Array.isArray(teams) ? teams.reduce((sum, team) => sum + (Array.isArray(team.members) ? team.members.length : 0), 0) : 0,
    avgPerformance: Array.isArray(teams) && teams.length > 0 ? Math.round(teams.reduce((sum, team) => sum + (typeof team.performance === 'number' ? team.performance : 0), 0) / teams.length) : 0,
    avgVelocity: Array.isArray(teams) && teams.length > 0 ? Math.round(teams.reduce((sum, team) => sum + (typeof team.velocity === 'number' ? team.velocity : 0), 0) / teams.length) : 0,
    totalTasks: Array.isArray(teams) ? teams.reduce((sum, team) => sum + (typeof team.totalTasks === 'number' ? team.totalTasks : 0), 0) : 0,
    completedTasks: Array.isArray(teams) ? teams.reduce((sum, team) => sum + (typeof team.tasksCompleted === 'number' ? team.tasksCompleted : 0), 0) : 0
  };

  const deleteTeam = (teamId: number) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const archiveTeam = (teamId: number) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, archived: !team.archived } : team
    ));
  };

  const duplicateTeam = (team: Team) => {
    const newTeam = {
      ...team,
      id: Math.max(...teams.map(t => t.id)) + 1,
      name: `${team.name} (Copy)`,
      archived: false,
      lastActivity: "Just now"
    };
    setTeams([...teams, newTeam]);
  };

  const contactMember = (member: Team['members'][0], method: 'email' | 'phone' | 'message') => {
    switch (method) {
      case 'email':
        window.open(`mailto:${member.email}`);
        break;
      case 'phone':
        window.open(`tel:${member.phone}`);
        break;
      case 'message':
        // Open messaging interface
        console.log(`Open messaging for ${member.name}`);
        break;
    }
  };

  const removeMember = (teamId: number, memberId: number) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, members: team.members.filter(member => member.id !== memberId) }
        : team
    ));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setProjectFilter("All");
  };

  const toggleTeam = (teamId: number) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId);
    } else {
      newExpanded.add(teamId);
    }
    setExpandedTeams(newExpanded);
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = projectFilter === "All" || team.project === projectFilter;
    
    return matchesSearch && matchesProject;
  });

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg">
            <Users className="text-white mr-1" size={20} />
            <span>Teams</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 hover:bg-white/90 text-slate-700 font-medium transition-all duration-200 hover:scale-105 focus-ring"
          >
            <Download size={16} />
            Export
          </button>
          <button 
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            New Team
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Enhanced Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalTeams}</h3>
            <p className="text-slate-600 text-sm font-medium">Total Teams</p>
            <div className="mt-2 text-xs text-slate-500">+1 this month</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <UserPlus className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalMembers}</h3>
            <p className="text-slate-600 text-sm font-medium">Team Members</p>
            <div className="mt-2 text-xs text-slate-500">+3 this week</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.avgPerformance}%</h3>
            <p className="text-slate-600 text-sm font-medium">Avg Performance</p>
            <div className="mt-2 text-xs text-slate-500">+5% from last month</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.avgVelocity}</h3>
            <p className="text-slate-600 text-sm font-medium">Avg Velocity</p>
            <div className="mt-2 text-xs text-slate-500">+8% from last sprint</div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search teams, members, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
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
                      ? "bg-purple-100 text-purple-600" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-purple-100 text-purple-600" 
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All">All Projects</option>
                  <option value="Whapi Project Management">Whapi Project Management</option>
                  <option value="Client Portal">Client Portal</option>
                  <option value="Analytics Platform">Analytics Platform</option>
                </select>

                <select className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>All Performance</option>
                  <option>Excellent (90%+)</option>
                  <option>Good (80-89%)</option>
                  <option>Average (70-79%)</option>
                  <option>Below Average (&lt;70%)</option>
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

        {/* Teams Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredTeams.map((team, index) => (
            <div 
              key={team.id} 
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Team Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {team.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {team.description}
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

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{typeof team.performance === 'number' ? team.performance : 0}%</div>
                    <div className="text-xs text-slate-500">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{typeof team.velocity === 'number' ? team.velocity : 0}</div>
                    <div className="text-xs text-slate-500">Velocity</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(typeof team.tasksCompleted === 'number' ? team.tasksCompleted : 0) / (typeof team.totalTasks === 'number' ? team.totalTasks : 0) * 100}%` }}
                  ></div>
                </div>

                {/* Team Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${healthColors[team.health as keyof typeof healthColors]}`}>
                      {team.health}
                    </span>
                    <span className="text-xs text-slate-500">
                      {typeof team.tasksCompleted === 'number' ? team.tasksCompleted : 0}/{typeof team.totalTasks === 'number' ? team.totalTasks : 0} tasks
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {Array.isArray(team.members) ? team.members.length : 0} members
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {team.lastActivity}
                    </span>
                  </div>
                </div>

                {/* Team Tags */}
                <div className="flex items-center gap-2 mb-4">
                  {Array.isArray(team.tags) ? team.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {tag}
                    </span>
                  )) : null}
                  {Array.isArray(team.tags) && team.tags.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      +{Array.isArray(team.tags) ? team.tags.length - 3 : 0}
                    </span>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} />
                    {team.project}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={12} />
                    {team.budget}
                  </span>
                </div>
              </div>

              {/* Team Actions */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
                    onClick={() => toggleTeam(team.id)}
                  >
                    <Layers size={14} />
                    {expandedTeams.has(team.id) ? 'Hide' : 'Show'} Members
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

              {/* Expanded Members */}
              {expandedTeams.has(team.id) && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="font-semibold text-slate-900 mb-3">Team Members</h4>
                    <div className="space-y-3">
                      {Array.isArray(team.members) ? team.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 text-white text-sm font-semibold flex items-center justify-center">
                                {member.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusColors[member.status as keyof typeof statusColors]}`}></div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900">{member.name}</div>
                              <div className="text-sm text-slate-600">{member.role}</div>
                              <div className="text-xs text-slate-500">{member.experience} • {member.projects} projects</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                              onClick={() => contactMember(member, 'email')}
                            >
                              <Mail size={14} />
                            </button>
                            <button 
                              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                              onClick={() => contactMember(member, 'message')}
                            >
                              <MessageSquare size={14} />
                            </button>
                          </div>
                        </div>
                      )) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No teams found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
            <button 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <CreateTeamModal open={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={handleCreateTeam} />
    </div>
  );
} 