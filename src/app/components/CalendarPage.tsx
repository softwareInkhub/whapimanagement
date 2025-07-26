import { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  MoreHorizontal
} from "lucide-react";

// Sample calendar events
const events = [
  {
    id: 1,
    title: "Project Review Meeting",
    description: "Weekly review of Whapi Project Management progress",
    date: "2024-02-15",
    time: "10:00 AM",
    duration: "1 hour",
    type: "Meeting",
    attendees: ["Sarah Johnson", "Mike Chen", "Alex Rodriguez"],
    location: "Conference Room A",
    priority: "High"
  },
  {
    id: 2,
    title: "Client Presentation",
    description: "Present final deliverables to client",
    date: "2024-02-16",
    time: "2:00 PM",
    duration: "2 hours",
    type: "Presentation",
    attendees: ["Emma Wilson", "David Kim"],
    location: "Virtual Meeting",
    priority: "High"
  },
  {
    id: 3,
    title: "Team Standup",
    description: "Daily standup for Frontend Development team",
    date: "2024-02-15",
    time: "9:00 AM",
    duration: "30 min",
    type: "Standup",
    attendees: ["Sarah Johnson", "Mike Chen", "Emma Wilson"],
    location: "Team Room",
    priority: "Medium"
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review authentication system implementation",
    date: "2024-02-17",
    time: "11:00 AM",
    duration: "1 hour",
    type: "Review",
    attendees: ["Alex Rodriguez", "David Kim"],
    location: "Development Lab",
    priority: "Medium"
  }
];

const eventTypes = {
  "Meeting": "bg-blue-100 text-blue-700",
  "Presentation": "bg-purple-100 text-purple-700",
  "Standup": "bg-green-100 text-green-700",
  "Review": "bg-orange-100 text-orange-700"
};

const priorityColors = {
  "High": "bg-red-100 text-red-700",
  "Medium": "bg-yellow-100 text-yellow-700",
  "Low": "bg-green-100 text-green-700"
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week");


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

  const getEventsForDate = (date) => {
    return events.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  const weekDays = getDaysInWeek(currentDate);

  const analytics = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
    completedEvents: events.filter(e => new Date(e.date) < new Date()).length,
    todayEvents: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Calendar</h1>
            <p className="text-neutral-600">Manage your schedule, meetings, and important events.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            Add Event
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalEvents}</h3>
            <p className="text-neutral-600 text-sm">Total Events</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <AlertCircle className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.upcomingEvents}</h3>
            <p className="text-neutral-600 text-sm">Upcoming Events</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.completedEvents}</h3>
            <p className="text-neutral-600 text-sm">Completed Events</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.todayEvents}</h3>
            <p className="text-neutral-600 text-sm">Today&apos;s Events</p>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-semibold text-neutral-900">
                {weekDays[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              
              <button 
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {["day", "week", "month"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    view === v
                      ? "bg-blue-100 text-blue-700"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 bg-neutral-50 border-b border-neutral-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-4 text-center">
              <span className="text-sm font-medium text-neutral-600">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {weekDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={index} 
                className={`min-h-[120px] p-3 border-r border-b border-neutral-200 ${
                  isToday ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isToday ? "text-blue-700" : "text-neutral-900"
                  }`}>
                    {day.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="p-2 bg-blue-100 rounded text-xs cursor-pointer hover:bg-blue-200 transition-colors"
                    >
                      <div className="font-medium text-blue-900 truncate">{event.title}</div>
                      <div className="text-blue-700">{event.time}</div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-neutral-500 text-center">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Upcoming Events</h2>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5)
            .map((event) => (
            <div key={event.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-neutral-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${eventTypes[event.type]}`}>
                      {event.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[event.priority]}`}>
                      {event.priority}
                    </span>
                  </div>
                  
                  <p className="text-neutral-600 mb-3">{event.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees.length} attendees</span>
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
      </div>
    </div>
  );
} 