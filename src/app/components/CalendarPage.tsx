import { useState } from "react";
import { 
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Bell,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Share2,
  Filter,
  Search
} from "lucide-react";

// Sample calendar events
const initialEvents = [
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
    priority: "High",
    completed: false
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
    priority: "High",
    completed: false
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
    priority: "Medium",
    completed: false
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
    priority: "Medium",
    completed: false
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
}

export default function CalendarPage({ onOpenTab }: { onOpenTab?: (type: string, title?: string) => void }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);

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
    return events.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Event actions
  const deleteEvent = (eventId: number) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowMoreMenu(null);
  };

  const duplicateEvent = (event: Event) => {
    const newEvent = {
      ...event,
      id: Math.max(...events.map(e => e.id)) + 1,
      title: `${event.title} (Copy)`,
      date: new Date().toISOString().split('T')[0]
    };
    setEvents(prev => [...prev, newEvent]);
    setShowMoreMenu(null);
  };

  const toggleEventCompletion = (eventId: number) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, completed: !event.completed } : event
    ));
  };

  const shareEvent = (event: Event) => {
    const eventDetails = `
Event: ${event.title}
Date: ${event.date} at ${event.time}
Duration: ${event.duration}
Location: ${event.location}
Description: ${event.description}
Attendees: ${event.attendees.join(', ')}
    `.trim();
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: eventDetails
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(eventDetails);
      alert('Event details copied to clipboard!');
    }
    setShowMoreMenu(null);
  };

  // Contact actions
  const contactAttendee = (attendee: string, method: 'email' | 'message') => {
    switch (method) {
      case 'email':
        window.open(`mailto:${attendee.toLowerCase().replace(' ', '.')}@company.com`);
        break;
      case 'message':
        console.log(`Opening chat with ${attendee}`);
        break;
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm;

  // Filter events based on search
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.attendees.some(attendee => attendee.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const weekDays = getDaysInWeek(currentDate);

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Calendar</h1>
            <p className="text-neutral-600">Manage your schedule, meetings, and important events.</p>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => onOpenTab && onOpenTab("create-event", "Create Event")}
          >
            <Plus size={16} />
            New Event
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events, attendees, or locations..."
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
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Event Type</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Types</option>
                    <option>Meeting</option>
                    <option>Presentation</option>
                    <option>Standup</option>
                    <option>Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Events</option>
                    <option>Upcoming</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-px bg-neutral-200">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="bg-white p-4 text-center">
              <div className="text-sm font-medium text-neutral-600">{day}</div>
              <div className={`text-lg font-semibold mt-1 ${
                weekDays[index].toDateString() === new Date().toDateString() 
                  ? 'text-blue-600' 
                  : 'text-neutral-900'
              }`}>
                {weekDays[index].getDate()}
              </div>
            </div>
          ))}

          {/* Day Content */}
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={dayIndex} 
                className={`bg-white min-h-[200px] p-2 ${
                  isToday ? 'bg-blue-50' : ''
                }`}
              >
                <div className="space-y-2">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded-lg text-xs cursor-pointer transition-all ${
                        event.completed ? 'opacity-60' : ''
                      } ${eventTypes[event.type as keyof typeof eventTypes] || 'bg-neutral-100'}`}
                      onClick={() => {}}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-75">{event.time}</div>
                      {event.completed && (
                        <CheckCircle className="w-3 h-3 mt-1 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">All Events ({filteredEvents.length})</h2>
        </div>
        
        <div className="divide-y divide-neutral-200">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-6 hover:bg-neutral-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${eventTypes[event.type as keyof typeof eventTypes] || 'bg-neutral-100'}`}>
                      {event.type}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[event.priority as keyof typeof priorityColors] || 'bg-neutral-100'}`}>
                      {event.priority}
                    </div>
                    {event.completed && (
                      <div className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                        Completed
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`text-lg font-semibold text-neutral-900 mb-1 ${event.completed ? 'line-through' : ''}`}>
                    {event.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-3">{event.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.duration}</span>
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

                  {/* Attendees */}
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-3">Attendees</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.attendees.map((attendee, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-neutral-100 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-700">
                              {attendee.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm text-neutral-700">{attendee}</span>
                          <div className="flex gap-1">
                            <button 
                              className="p-1 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              onClick={() => contactAttendee(attendee, 'email')}
                              title="Send Email"
                            >
                              <Bell className="w-3 h-3" />
                            </button>
                            <button 
                              className="p-1 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                              onClick={() => contactAttendee(attendee, 'message')}
                              title="Send Message"
                            >
                              <Users className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button 
                    className={`p-2 rounded-lg transition-colors ${
                      event.completed 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-neutral-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                    onClick={() => toggleEventCompletion(event.id)}
                    title={event.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    onClick={() => setShowMoreMenu(showMoreMenu === event.id ? null : event.id)}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  
                  {/* Event Actions Menu */}
                  {showMoreMenu === event.id && (
                    <div className="absolute right-0 top-12 z-10 bg-white border border-neutral-200 rounded shadow-lg min-w-[160px]">
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                        onClick={() => onOpenTab && onOpenTab("edit-event", `Edit: ${event.title}`)}
                      >
                        <Edit className="w-4 h-4" />
                        Edit Event
                      </button>
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                        onClick={() => duplicateEvent(event)}
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate Event
                      </button>
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                        onClick={() => shareEvent(event)}
                      >
                        <Share2 className="w-4 h-4" />
                        Share Event
                      </button>
                      <hr className="my-1" />
                      <button 
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-red-600 text-left"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Event
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No events found</h3>
            <p className="text-neutral-600 mb-4">Try adjusting your search or create a new event.</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => onOpenTab && onOpenTab("create-event", "Create Event")}
            >
              Create Your First Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 