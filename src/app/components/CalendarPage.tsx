import { useState } from "react";
import { 
  Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Bell, CheckCircle, Clock, MapPin, Users, MoreHorizontal, Edit, Trash2, Copy, Share2, Filter, Search, CalendarDays, Star, Eye, Download, FilterX, Grid3X3, List, Heart, ExternalLink, GitCommit, DollarSign, UserCheck, Timer, Flag, Layers, Zap, TrendingDown, SortAsc, CheckSquare, Square, Play, Pause, StopCircle, RotateCcw, BarChart3, PieChart, LineChart, Crown, Shield, Trophy, Medal, Users2, UserX, UserCheck2, UserMinus, UserPlus2, Settings, Globe, Building, Briefcase, Video, Phone, MessageSquare, Mail, AlertCircle, Info, Award, TrendingUp, Paperclip
} from "lucide-react";

// Sample calendar events
const initialEvents = [
  {
    id: 1,
    title: "Project Review Meeting",
    description: "Weekly review of Whapi Project Management progress with stakeholders and team leads",
    date: "2024-02-15",
    time: "10:00 AM",
    duration: "1 hour",
    type: "Meeting",
    attendees: ["Sarah Johnson", "Mike Chen", "Alex Rodriguez"],
    location: "Conference Room A",
    priority: "High",
    completed: false,
    recurring: "Weekly",
    reminder: "15 min before",
    notes: "Prepare progress report and demo",
    tags: ["Review", "Stakeholders", "Progress"],
    color: "blue",
    notifications: 3,
    attachments: 2
  },
  {
    id: 2,
    title: "Client Presentation",
    description: "Present final deliverables to client with live demo and Q&A session",
    date: "2024-02-16",
    time: "2:00 PM",
    duration: "2 hours",
    type: "Presentation",
    attendees: ["Emma Wilson", "David Kim", "Lisa Chen"],
    location: "Virtual Meeting",
    priority: "High",
    completed: false,
    recurring: "One-time",
    reminder: "30 min before",
    notes: "Prepare slides and demo environment",
    tags: ["Client", "Demo", "Delivery"],
    color: "purple",
    notifications: 5,
    attachments: 4
  },
  {
    id: 3,
    title: "Team Standup",
    description: "Daily standup for Frontend Development team with progress updates",
    date: "2024-02-15",
    time: "9:00 AM",
    duration: "30 min",
    type: "Standup",
    attendees: ["Sarah Johnson", "Mike Chen", "Emma Wilson"],
    location: "Team Room",
    priority: "Medium",
    completed: false,
    recurring: "Daily",
    reminder: "5 min before",
    notes: "Update on sprint progress",
    tags: ["Daily", "Team", "Progress"],
    color: "green",
    notifications: 1,
    attachments: 0
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review authentication system implementation with security focus",
    date: "2024-02-17",
    time: "11:00 AM",
    duration: "1 hour",
    type: "Review",
    attendees: ["Alex Rodriguez", "David Kim"],
    location: "Development Lab",
    priority: "Medium",
    completed: false,
    recurring: "As needed",
    reminder: "10 min before",
    notes: "Focus on security implementation",
    tags: ["Code", "Security", "Review"],
    color: "orange",
    notifications: 2,
    attachments: 1
  },
  {
    id: 5,
    title: "Sprint Planning",
    description: "Plan next sprint with team capacity and story point estimation",
    date: "2024-02-18",
    time: "1:00 PM",
    duration: "2 hours",
    type: "Planning",
    attendees: ["Sarah Johnson", "Mike Chen", "Alex Rodriguez", "Emma Wilson"],
    location: "Planning Room",
    priority: "High",
    completed: false,
    recurring: "Bi-weekly",
    reminder: "1 hour before",
    notes: "Prepare backlog and capacity planning",
    tags: ["Planning", "Sprint", "Capacity"],
    color: "indigo",
    notifications: 4,
    attachments: 3
  },
  {
    id: 6,
    title: "Retrospective",
    description: "Team retrospective to discuss improvements and action items",
    date: "2024-02-19",
    time: "3:00 PM",
    duration: "1 hour",
    type: "Retrospective",
    attendees: ["All Team Members"],
    location: "Team Room",
    priority: "Medium",
    completed: false,
    recurring: "Bi-weekly",
    reminder: "15 min before",
    notes: "Prepare feedback and improvement suggestions",
    tags: ["Retro", "Improvement", "Team"],
    color: "teal",
    notifications: 2,
    attachments: 1
  }
];

const eventTypes = {
  "Meeting": { color: "bg-blue-100 text-blue-700", icon: Users },
  "Presentation": { color: "bg-purple-100 text-purple-700", icon: Video },
  "Standup": { color: "bg-green-100 text-green-700", icon: Clock },
  "Review": { color: "bg-orange-100 text-orange-700", icon: CheckCircle },
  "Planning": { color: "bg-indigo-100 text-indigo-700", icon: CalendarDays },
  "Retrospective": { color: "bg-teal-100 text-teal-700", icon: MessageSquare }
};

const priorityColors = {
  "High": "bg-red-100 text-red-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Low": "bg-green-100 text-green-700"
};

const colorVariants = {
  "blue": "bg-blue-500",
  "purple": "bg-purple-500",
  "green": "bg-green-500",
  "orange": "bg-orange-500",
  "indigo": "bg-indigo-500",
  "teal": "bg-teal-500",
  "pink": "bg-pink-500",
  "red": "bg-red-500"
};

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  attendees: string[];
  location: string;
  priority: string;
  completed: boolean;
  recurring: string;
  reminder: string;
  notes: string;
  tags: string[];
  color: string;
  notifications: number;
  attachments: number;
}

export default function CalendarPage({ onOpenTab }: { onOpenTab?: (type: string, title?: string) => void }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<"week" | "month" | "list">("week");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());

  let avgDuration = 0;
  if (events.length > 0) {
    const totalDuration = events.reduce((sum, e) => sum + parseInt(e.duration.split(' ')[0]), 0);
    avgDuration = Math.round(totalDuration / events.length);
  }

  const analytics = {
    totalEvents: events.length,
    completedEvents: events.filter(e => e.completed).length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
    todayEvents: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
    avgDuration
  };

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const deleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const duplicateEvent = (event: Event) => {
    const newEvent = {
      ...event,
      id: Math.max(...events.map(e => e.id)) + 1,
      title: `${event.title} (Copy)`,
      date: new Date().toISOString().split('T')[0],
      completed: false
    };
    setEvents([...events, newEvent]);
  };

  const toggleEventCompletion = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, completed: !event.completed } : event
    ));
  };

  const shareEvent = (event: Event) => {
    const eventDetails = `
Event: ${event.title}
Date: ${event.date} at ${event.time}
Duration: ${event.duration}
Location: ${event.location}
Attendees: ${event.attendees.join(', ')}
Description: ${event.description}
    `;
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: eventDetails
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(eventDetails);
    }
  };

  const contactAttendee = (attendee: string, method: 'email' | 'message') => {
    switch (method) {
      case 'email':
        window.open(`mailto:${attendee.toLowerCase().replace(' ', '.')}@company.com`);
        break;
      case 'message':
        console.log(`Open messaging for ${attendee}`);
        break;
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("All");
    setPriorityFilter("All");
  };

  const toggleEvent = (eventId: number) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.attendees.some(attendee => attendee.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "All" || event.type === typeFilter;
    const matchesPriority = priorityFilter === "All" || event.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const weekDays = getDaysInWeek(currentDate);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg">
            <CalendarIcon className="text-white mr-1" size={20} />
            <span>Calendar</span>
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
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold focus-ring"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            New Event
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Enhanced Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.totalEvents}</h3>
            <p className="text-slate-600 text-sm font-medium">Total Events</p>
            <div className="mt-2 text-xs text-slate-500">+2 this week</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.completedEvents}</h3>
            <p className="text-slate-600 text-sm font-medium">Completed</p>
            <div className="mt-2 text-xs text-slate-500">85% completion rate</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.upcomingEvents}</h3>
            <p className="text-slate-600 text-sm font-medium">Upcoming</p>
            <div className="mt-2 text-xs text-slate-500">Next 7 days</div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <Timer className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{analytics.avgDuration}h</h3>
            <p className="text-slate-600 text-sm font-medium">Avg Duration</p>
            <div className="mt-2 text-xs text-slate-500">+0.5h from last week</div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events, descriptions, or attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
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
                  onClick={() => setViewMode("week")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "week" 
                      ? "bg-orange-100 text-orange-600" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <CalendarDays size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-orange-100 text-orange-600" 
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
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All Types</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Presentation">Presentation</option>
                  <option value="Standup">Standup</option>
                  <option value="Review">Review</option>
                  <option value="Planning">Planning</option>
                  <option value="Retrospective">Retrospective</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="All">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select className="px-3 py-2 border border-white/20 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>All Locations</option>
                  <option>Conference Room A</option>
                  <option>Virtual Meeting</option>
                  <option>Team Room</option>
                  <option>Development Lab</option>
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

        {/* Calendar Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-slate-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Today
            </button>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium text-slate-500 mb-2">{day}</div>
                {weekDays.map((date, dateIndex) => {
                  if (dateIndex === index) {
                    const isToday = date.toISOString().split('T')[0] === today;
                    const dayEvents = getEventsForDate(date);
                    return (
                      <div
                        key={dateIndex}
                        className={`relative min-h-[120px] p-2 rounded-lg border-2 transition-all duration-200 ${
                          isToday 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-white/20 bg-white/50'
                        }`}
                      >
                        <div className={`text-sm font-medium mb-2 ${
                          isToday ? 'text-orange-600' : 'text-slate-900'
                        }`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded cursor-pointer transition-all duration-200 hover:scale-105 ${
                                eventTypes[event.type as keyof typeof eventTypes]?.color || 'bg-slate-100 text-slate-700'
                              }`}
                              onClick={() => toggleEvent(event.id)}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-slate-500 text-center">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Events List */}
        <div className="grid gap-6">
          {filteredEvents.map((event, index) => {
            const EventTypeIcon = eventTypes[event.type as keyof typeof eventTypes]?.icon || Clock;
            return (
              <div 
                key={event.id} 
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Event Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${colorVariants[event.color as keyof typeof colorVariants]}`}></div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {event.title}
                        </h3>
                        {event.completed && (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {event.description}
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

                  {/* Event Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{event.duration}</div>
                      <div className="text-xs text-slate-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{event.attendees.length}</div>
                      <div className="text-xs text-slate-500">Attendees</div>
                    </div>
                  </div>

                  {/* Event Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventTypes[event.type as keyof typeof eventTypes]?.color}`}>
                        <EventTypeIcon size={12} className="inline mr-1" />
                        {event.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[event.priority as keyof typeof priorityColors]}`}>
                        {event.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Bell size={12} />
                        {event.notifications}
                      </span>
                      <span className="flex items-center gap-1">
                        <Paperclip size={12} />
                        {event.attachments}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {event.date} at {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {event.attendees.length} people
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Actions */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      className="flex items-center gap-2 px-3 py-2 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200"
                      onClick={() => toggleEvent(event.id)}
                    >
                      <Layers size={14} />
                      {expandedEvents.has(event.id) ? 'Hide' : 'Show'} Details
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
                {expandedEvents.has(event.id) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="border-t border-white/20 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Event Details</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Recurring:</span>
                              <span className="text-sm font-medium text-slate-900">{event.recurring}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Reminder:</span>
                              <span className="text-sm font-medium text-slate-900">{event.reminder}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Notes:</span>
                              <span className="text-sm font-medium text-slate-900">{event.notes}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Attendees</h4>
                          <div className="space-y-2">
                            {event.attendees.map((attendee, attendeeIndex) => (
                              <div key={attendeeIndex} className="flex items-center justify-between p-2 bg-slate-50/50 rounded-lg">
                                <span className="text-sm text-slate-900">{attendee}</span>
                                <div className="flex items-center gap-1">
                                  <button 
                                    className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                                    onClick={() => contactAttendee(attendee, 'email')}
                                  >
                                    <Mail size={12} />
                                  </button>
                                  <button 
                                    className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                                    onClick={() => contactAttendee(attendee, 'message')}
                                  >
                                    <MessageSquare size={12} />
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
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <CalendarIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No events found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
            <button 
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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