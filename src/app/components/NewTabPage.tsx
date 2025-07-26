"use client";
import { useState } from "react";
import {
  Building2,
  FolderKanban,
  Users,
  Calendar,
  Plus,
  Search,
  ArrowRight,
  Star,
  Zap,
  Target,
  TrendingUp,
  Settings,
  Bell,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function NewTabPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All", icon: Star, count: 12 },
    { id: "companies", label: "Companies", icon: Building2, count: 3 },
    { id: "projects", label: "Projects", icon: FolderKanban, count: 4 },
    { id: "teams", label: "Teams", icon: Users, count: 2 },
    { id: "sprints", label: "Sprints", icon: Calendar, count: 3 }
  ];

  const quickActions = [
    {
      id: "new-company",
      title: "New Company",
      description: "Create a new company organization",
      icon: Building2,
      color: "blue",
      category: "companies"
    },
    {
      id: "new-project",
      title: "New Project",
      description: "Start a new project with team collaboration",
      icon: FolderKanban,
      color: "green",
      category: "projects"
    },
    {
      id: "new-team",
      title: "New Team",
      description: "Create a new team with members",
      icon: Users,
      color: "purple",
      category: "teams"
    },
    {
      id: "new-sprint",
      title: "New Sprint",
      description: "Plan a new sprint with tasks and stories",
      icon: Calendar,
      color: "pink",
      category: "sprints"
    },
    {
      id: "new-department",
      title: "New Department",
      description: "Organize teams into departments",
      icon: Target,
      color: "indigo",
      category: "companies"
    },
    {
      id: "new-task",
      title: "New Task",
      description: "Create individual tasks and assignments",
      icon: CheckCircle,
      color: "orange",
      category: "projects"
    }
  ];

  const recentItems = [
    {
      id: 1,
      title: "Whapi Project Management",
      type: "Company",
      icon: Building2,
      lastModified: "2 hours ago",
      status: "Active"
    },
    {
      id: 2,
      title: "Mobile App Development",
      type: "Project",
      icon: FolderKanban,
      lastModified: "1 day ago",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Core Development Team",
      type: "Team",
      icon: Users,
      lastModified: "3 days ago",
      status: "Active"
    },
    {
      id: 4,
      title: "Sprint 1 - Q1 2024",
      type: "Sprint",
      icon: Calendar,
      lastModified: "1 week ago",
      status: "Completed"
    }
  ];

  const filteredQuickActions = quickActions.filter(action => 
    (selectedCategory === "all" || action.category === selectedCategory) &&
    (searchQuery === "" || action.title.toLowerCase().includes(searchQuery.toLowerCase()) || action.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      pink: "bg-pink-50 text-pink-600 border-pink-200",
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200"
    };
    return colorMap[color] || "bg-neutral-50 text-neutral-600 border-neutral-200";
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create New</h1>
        <p className="text-neutral-600">Start building your project management workspace</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for templates, actions, or recent items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Quick Actions</h2>
              <div className="flex items-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuickActions.map((action) => (
                <div
                  key={action.id}
                  className="group p-4 border border-neutral-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${getColorClasses(action.color)}`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-neutral-600 mb-3">{action.description}</p>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          <Plus className="w-4 h-4" />
                          Create
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 border border-neutral-200 text-neutral-600 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredQuickActions.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600">No actions found matching your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Items & Templates */}
        <div className="space-y-6">
          {/* Recent Items */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Items</h3>
            <div className="space-y-3">
              {recentItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <item.icon className="w-4 h-4 text-neutral-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 text-sm truncate">{item.title}</p>
                    <p className="text-xs text-neutral-500">{item.type} • {item.lastModified}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === "Active" ? "bg-green-100 text-green-700" :
                    item.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    "bg-neutral-100 text-neutral-700"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Templates */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Popular Templates</h3>
            <div className="space-y-3">
              <div className="p-3 border border-neutral-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">Startup Company</p>
                    <p className="text-xs text-neutral-500">Complete startup template</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-neutral-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FolderKanban className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">Agile Project</p>
                    <p className="text-xs text-neutral-500">Scrum methodology ready</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border border-neutral-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">Development Team</p>
                    <p className="text-xs text-neutral-500">Full-stack team structure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Workspace Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Projects</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Team Members</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Completed Tasks</span>
                <span className="font-semibold">1,247</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 