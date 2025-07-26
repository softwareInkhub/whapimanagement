import { useState } from "react";
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Search,
  MoreHorizontal,
  Clock,
  User,
  Tag,
  Settings,
  Trash2
} from "lucide-react";

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "Task Completed",
    message: "Sarah Johnson completed the 'Design UI Components' task",
    type: "success",
    category: "task",
    timestamp: "2 hours ago",
    read: false,
    priority: "medium",
    sender: "Sarah Johnson",
    project: "Whapi Project Management"
  },
  {
    id: 2,
    title: "Project Deadline Reminder",
    message: "Client Portal project deadline is approaching in 3 days",
    type: "warning",
    category: "deadline",
    timestamp: "4 hours ago",
    read: false,
    priority: "high",
    sender: "System",
    project: "Client Portal"
  },
  {
    id: 3,
    title: "New Team Member",
    message: "David Kim joined the Backend Development team",
    type: "info",
    category: "team",
    timestamp: "1 day ago",
    read: true,
    priority: "low",
    sender: "System",
    project: "Whapi Project Management"
  },
  {
    id: 4,
    title: "Code Review Request",
    message: "Alex Rodriguez requested a review for authentication system",
    type: "info",
    category: "review",
    timestamp: "1 day ago",
    read: true,
    priority: "medium",
    sender: "Alex Rodriguez",
    project: "Whapi Project Management"
  },
  {
    id: 5,
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight at 2:00 AM",
    type: "warning",
    category: "system",
    timestamp: "2 days ago",
    read: true,
    priority: "medium",
    sender: "System",
    project: "System"
  },
  {
    id: 6,
    title: "Weekly Report Available",
    message: "Your weekly project progress report is ready to view",
    type: "success",
    category: "report",
    timestamp: "3 days ago",
    read: true,
    priority: "low",
    sender: "System",
    project: "All Projects"
  }
];

const notificationTypes = {
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  warning: { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-100" },
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-100" }
};

const categories = [
  { id: "all", label: "All", count: notifications.length },
  { id: "task", label: "Tasks", count: notifications.filter(n => n.category === "task").length },
  { id: "deadline", label: "Deadlines", count: notifications.filter(n => n.category === "deadline").length },
  { id: "team", label: "Team", count: notifications.filter(n => n.category === "team").length },
  { id: "review", label: "Reviews", count: notifications.filter(n => n.category === "review").length },
  { id: "system", label: "System", count: notifications.filter(n => n.category === "system").length },
  { id: "report", label: "Reports", count: notifications.filter(n => n.category === "report").length }
];

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [showRead, setShowRead] = useState(true);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory;
    const matchesPriority = selectedPriority === "all" || notification.priority === selectedPriority;
    const matchesRead = showRead || !notification.read;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const analytics = {
    total: notifications.length,
    unread: unreadCount,
    today: notifications.filter(n => n.timestamp.includes("hours ago") || n.timestamp.includes("1 day ago")).length,
    highPriority: notifications.filter(n => n.priority === "high").length
  };

  const markAsRead = (id) => {
    // In a real app, this would update the notification status
    console.log(`Marked notification ${id} as read`);
  };

  const deleteNotification = (id) => {
    // In a real app, this would remove the notification
    console.log(`Deleted notification ${id}`);
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Notifications</h1>
            <p className="text-neutral-600">Stay updated with project activities and important alerts.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Bell className="w-4 h-4" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">{analytics.total}</span>
            </div>
            <h3 className="text-neutral-600 text-sm">Total Notifications</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">{analytics.unread}</span>
            </div>
            <h3 className="text-neutral-600 text-sm">Unread</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">{analytics.today}</span>
            </div>
            <h3 className="text-neutral-600 text-sm">Today</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">{analytics.highPriority}</span>
            </div>
            <h3 className="text-neutral-600 text-sm">High Priority</h3>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <label className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={showRead}
                onChange={(e) => setShowRead(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm">Show Read</span>
            </label>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">
            Notifications ({filteredNotifications.length})
          </h2>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {filteredNotifications.map((notification) => {
            const typeConfig = notificationTypes[notification.type];
            const TypeIcon = typeConfig.icon;
            
            return (
              <div 
                key={notification.id} 
                className={`p-6 hover:bg-neutral-50 transition-colors ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${typeConfig.bg}`}>
                    <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-neutral-900">{notification.title}</h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.priority === "high" ? "bg-red-100 text-red-700" :
                          notification.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {notification.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 mb-3">{notification.message}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-neutral-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{notification.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{notification.sender}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>{notification.project}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No notifications found</h3>
            <p className="text-neutral-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 