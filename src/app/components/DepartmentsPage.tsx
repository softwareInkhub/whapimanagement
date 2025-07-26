import { useState } from "react";
import { 
  X, 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Users,
  Building,
  Edit,
  Trash2,
  Archive,
  Copy,
  Share2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  UserPlus,
  Settings
} from "lucide-react";

// Sample department data
const initialDepartments = [
  {
    id: 1,
    name: "Engineering",
    manager: "Sarah Johnson",
    members: 45,
    projects: 8,
    budget: "$1.2M",
    status: "Active",
    location: "San Francisco",
    email: "engineering@company.com",
    phone: "+1-555-0101",
    description: "Software development and technical operations",
    created: "2024-01-15",
    lastActivity: "2 hours ago",
    archived: false,
    subdepartments: [
      {
        id: 1,
        name: "Frontend Engineering",
        manager: "Mike Chen",
        members: 18,
        projects: 4,
        budget: "$500K",
        status: "Active"
      },
      {
        id: 2,
        name: "Backend Engineering",
        manager: "David Kim",
        members: 15,
        projects: 3,
        budget: "$400K",
        status: "Active"
      },
      {
        id: 3,
        name: "DevOps & Infrastructure",
        manager: "Emma Wilson",
        members: 8,
        projects: 2,
        budget: "$300K",
        status: "Active"
      },
      {
        id: 4,
        name: "Quality Assurance",
        manager: "Alex Rodriguez",
        members: 4,
        projects: 1,
        budget: "$100K",
        status: "Active"
      }
    ]
  },
  {
    id: 2,
    name: "Product",
    manager: "Lisa Chen",
    members: 12,
    projects: 6,
    budget: "$800K",
    status: "Active",
    location: "New York",
    email: "product@company.com",
    phone: "+1-555-0102",
    description: "Product strategy and management",
    created: "2024-01-20",
    lastActivity: "1 hour ago",
    archived: false,
    subdepartments: [
      {
        id: 5,
        name: "Product Strategy",
        manager: "Lisa Chen",
        members: 4,
        projects: 3,
        budget: "$300K",
        status: "Active"
      },
      {
        id: 6,
        name: "Product Operations",
        manager: "James Brown",
        members: 4,
        projects: 3,
        budget: "$300K",
        status: "Active"
      },
      {
        id: 7,
        name: "User Research",
        manager: "Maria Garcia",
        members: 4,
        projects: 2,
        budget: "$200K",
        status: "Active"
      }
    ]
  },
  {
    id: 3,
    name: "Design",
    manager: "Alex Rodriguez",
    members: 8,
    projects: 4,
    budget: "$600K",
    status: "Active",
    location: "San Francisco",
    email: "design@company.com",
    phone: "+1-555-0103",
    description: "UI/UX design and creative services",
    created: "2024-02-01",
    lastActivity: "30 minutes ago",
    archived: false,
    subdepartments: [
      {
        id: 8,
        name: "UI/UX Design",
        manager: "Alex Rodriguez",
        members: 5,
        projects: 3,
        budget: "$400K",
        status: "Active"
      },
      {
        id: 9,
        name: "Visual Design",
        manager: "Rachel Green",
        members: 3,
        projects: 1,
        budget: "$200K",
        status: "Active"
      }
    ]
  },
  {
    id: 4,
    name: "Marketing",
    manager: "John Smith",
    members: 15,
    projects: 3,
    budget: "$900K",
    status: "Active",
    location: "New York",
    email: "marketing@company.com",
    phone: "+1-555-0104",
    description: "Digital marketing and brand management",
    created: "2024-01-10",
    lastActivity: "3 hours ago",
    archived: false,
    subdepartments: [
      {
        id: 10,
        name: "Digital Marketing",
        manager: "John Smith",
        members: 8,
        projects: 2,
        budget: "$500K",
        status: "Active"
      },
      {
        id: 11,
        name: "Content Marketing",
        manager: "Rachel Green",
        members: 4,
        projects: 1,
        budget: "$250K",
        status: "Active"
      },
      {
        id: 12,
        name: "Growth Marketing",
        manager: "Chris Lee",
        members: 3,
        projects: 1,
        budget: "$150K",
        status: "Active"
      }
    ]
  },
  {
    id: 5,
    name: "Human Resources",
    manager: "Jennifer Davis",
    members: 6,
    projects: 2,
    budget: "$400K",
    status: "Active",
    location: "San Francisco",
    email: "hr@company.com",
    phone: "+1-555-0105",
    description: "HR operations and talent management",
    created: "2024-01-05",
    lastActivity: "5 hours ago",
    archived: false,
    subdepartments: [
      {
        id: 13,
        name: "Talent Acquisition",
        manager: "Jennifer Davis",
        members: 3,
        projects: 1,
        budget: "$200K",
        status: "Active"
      },
      {
        id: 14,
        name: "Employee Experience",
        manager: "Tom Anderson",
        members: 3,
        projects: 1,
        budget: "$200K",
        status: "Active"
      }
    ]
  }
];

interface Department {
  id: number;
  name: string;
  manager: string;
  members: number;
  projects: number;
  budget: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  description: string;
  created: string;
  lastActivity: string;
  archived: boolean;
  subdepartments: Array<{
    id: number;
    name: string;
    manager: string;
    members: number;
    projects: number;
    budget: string;
    status: string;
  }>;
}

export default function DepartmentsPage({ open, onClose, onOpenTab }: { 
  open: boolean, 
  onClose: () => void,
  onOpenTab?: (type: string, title?: string) => void 
}) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Department actions
  const deleteDepartment = (deptId: number) => {
    setDepartments(prev => prev.filter(dept => dept.id !== deptId));
    setShowMoreMenu(null);
  };

  const archiveDepartment = (deptId: number) => {
    setDepartments(prev => prev.map(dept => 
      dept.id === deptId ? { ...dept, archived: true } : dept
    ));
    setShowMoreMenu(null);
  };

  const duplicateDepartment = (dept: Department) => {
    const newDept = {
      ...dept,
      id: Math.max(...departments.map(d => d.id)) + 1,
      name: `${dept.name} (Copy)`,
      status: "Planning"
    };
    setDepartments(prev => [...prev, newDept]);
    setShowMoreMenu(null);
  };

  const exportDepartment = (dept: Department) => {
    const dataStr = JSON.stringify(dept, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dept.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Contact actions
  const contactDepartment = (dept: Department, method: 'email' | 'phone' | 'location') => {
    switch (method) {
      case 'email':
        window.open(`mailto:${dept.email}`);
        break;
      case 'phone':
        window.open(`tel:${dept.phone}`);
        break;
      case 'location':
        window.open(`https://maps.google.com/?q=${encodeURIComponent(dept.location)}`);
        break;
    }
  };

  // Toggle expansion
  const toggleDepartment = (deptId: number) => {
    setExpandedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm;

  // Filter departments
  const filteredDepartments = departments.filter(dept => 
    !dept.archived && (
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Analytics
  const analytics = {
    totalDepartments: departments.filter(d => !d.archived).length,
    totalMembers: departments.filter(d => !d.archived).reduce((sum, dept) => sum + dept.members, 0),
    totalProjects: departments.filter(d => !d.archived).reduce((sum, dept) => sum + dept.projects, 0),
    totalBudget: departments.filter(d => !d.archived).reduce((sum, dept) => {
      const budget = parseFloat(dept.budget.replace(/[^0-9.]/g, ''));
      return sum + budget;
    }, 0)
  };

  if (!open) return null;

  return (
    <div className="w-full h-full bg-neutral-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-blue-50 text-blue-700 font-semibold">
            <Briefcase className="text-blue-500 mr-1" size={20} />
            <span>Departments</span>
          </div>
          <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-red-500" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => onOpenTab && onOpenTab("create-department", "Create Department")}
        >
          <Plus size={16} />
          New Department
        </button>
      </div>

      <div className="p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalDepartments}</h3>
            <p className="text-neutral-600 text-sm">Total Departments</p>
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
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalProjects}</h3>
            <p className="text-neutral-600 text-sm">Total Projects</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">${analytics.totalBudget}M</h3>
            <p className="text-neutral-600 text-sm">Total Budget</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search departments, managers, or locations..."
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
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Planning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>All Locations</option>
                    <option>San Francisco</option>
                    <option>New York</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Sort By</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg">
                    <option>Name A-Z</option>
                    <option>Most Members</option>
                    <option>Most Projects</option>
                    <option>Highest Budget</option>
                    <option>Recently Created</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Departments List */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">All Departments ({filteredDepartments.length})</h2>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {filteredDepartments.map((dept) => (
              <div key={dept.id} className="p-6 hover:bg-neutral-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => toggleDepartment(dept.id)}
                        className="p-1 rounded hover:bg-neutral-100 transition-colors"
                      >
                        {expandedDepartments.includes(dept.id) ? (
                          <span className="text-neutral-400">▼</span>
                        ) : (
                          <span className="text-neutral-400">▶</span>
                        )}
                      </button>
                      <Building className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-neutral-900">{dept.name}</h3>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        dept.status === "Active" ? "bg-green-100 text-green-700" : 
                        dept.status === "Planning" ? "bg-yellow-100 text-yellow-700" : 
                        "bg-neutral-100 text-neutral-700"
                      }`}>
                        {dept.status}
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 mb-3">{dept.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{dept.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{dept.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{dept.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{dept.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Created {dept.created}</span>
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex items-center gap-2 mb-4">
                      <button 
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                        onClick={() => contactDepartment(dept, 'email')}
                      >
                        <Mail className="w-3 h-3" />
                        Email
                      </button>
                      <button 
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                        onClick={() => contactDepartment(dept, 'phone')}
                      >
                        <Phone className="w-3 h-3" />
                        Call
                      </button>
                      <button 
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
                        onClick={() => contactDepartment(dept, 'location')}
                      >
                        <MapPin className="w-3 h-3" />
                        Location
                      </button>
                    </div>

                    {/* Sub-departments */}
                    {expandedDepartments.includes(dept.id) && (
                      <div className="ml-8 mt-4 space-y-3">
                        <h4 className="text-sm font-medium text-neutral-700 mb-3">Sub-departments ({dept.subdepartments.length})</h4>
                        {dept.subdepartments.map((subdept) => (
                          <div key={subdept.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                            <div className="flex items-center gap-3">
                              <Building className="w-4 h-4 text-blue-400" />
                              <div>
                                <h5 className="font-medium text-neutral-800 text-sm">{subdept.name}</h5>
                                <p className="text-xs text-neutral-600">Manager: {subdept.manager}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <p className="text-xs font-medium">{subdept.members}</p>
                                <p className="text-xs text-neutral-500">Members</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-medium">{subdept.projects}</p>
                                <p className="text-xs text-neutral-500">Projects</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-medium">{subdept.budget}</p>
                                <p className="text-xs text-neutral-500">Budget</p>
                              </div>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${
                                subdept.status === "Active" ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-700"
                              }`}>
                                {subdept.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button 
                      className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => onOpenTab && onOpenTab("edit-department", `Edit: ${dept.name}`)}
                      title="Edit Department"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                      onClick={() => setShowMoreMenu(showMoreMenu === dept.id ? null : dept.id)}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    
                    {/* Department Actions Menu */}
                    {showMoreMenu === dept.id && (
                      <div className="absolute right-0 top-12 z-10 bg-white border border-neutral-200 rounded shadow-lg min-w-[160px]">
                        <button 
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                          onClick={() => onOpenTab && onOpenTab("edit-department", `Edit: ${dept.name}`)}
                        >
                          <Edit className="w-4 h-4" />
                          Edit Department
                        </button>
                        <button 
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                          onClick={() => duplicateDepartment(dept)}
                        >
                          <Copy className="w-4 h-4" />
                          Duplicate Department
                        </button>
                        <button 
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 text-left"
                          onClick={() => exportDepartment(dept)}
                        >
                          <Share2 className="w-4 h-4" />
                          Export Department
                        </button>
                        <button 
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-yellow-50 text-yellow-600 text-left"
                          onClick={() => archiveDepartment(dept.id)}
                        >
                          <Archive className="w-4 h-4" />
                          Archive Department
                        </button>
                        <hr className="my-1" />
                        <button 
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-50 text-red-600 text-left"
                          onClick={() => deleteDepartment(dept.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Department
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No departments found</h3>
              <p className="text-neutral-600 mb-4">Try adjusting your search or create a new department.</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => onOpenTab && onOpenTab("create-department", "Create Department")}
              >
                Create Your First Department
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 