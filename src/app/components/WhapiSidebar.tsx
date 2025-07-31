"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  X, 
  Users, 
  MessageSquare, 
  Building2, 
  User,
  Plus,
  Filter,
  Check,
  MoreHorizontal,
  Star,
  Clock,
  AlertCircle,
  Grid
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Entity {
  id: string;
  name: string;
  type: 'group' | 'community' | 'user';
  avatar?: string;
  description?: string;
  memberCount?: number;
  status?: 'online' | 'offline' | 'away';
  priority?: 'high' | 'medium' | 'low';
  tags?: string[];
  lastActive?: string;
}

interface SelectedEntities {
  groups: Entity[];
  communities: Entity[];
  users: Entity[];
}

interface WhapiSidebarProps {
  onSelectionChange: (selected: SelectedEntities) => void;
  onSendMessage: (message: string, selected: SelectedEntities) => void;
  onGridLayout?: (type: 'groups' | 'communities' | 'users' | 'workspace') => void;
  selectedEntities?: SelectedEntities;
}

export default function WhapiSidebar({ 
  onSelectionChange, 
  onSendMessage,
  onGridLayout,
  selectedEntities: externalSelectedEntities
}: WhapiSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'groups' | 'communities' | 'users'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'group' | 'community' | 'user'>('group');
  
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    selected: true,
    groups: true,
    communities: true,
    users: true
  });

  // Selected entities state - use external if provided, otherwise use internal
  const [internalSelectedEntities, setInternalSelectedEntities] = useState<SelectedEntities>({
    groups: [],
    communities: [],
    users: []
  });

  // Use external selected entities if provided, otherwise use internal
  const selectedEntities = externalSelectedEntities || internalSelectedEntities;

  // Sync internal state with external changes
  useEffect(() => {
    if (externalSelectedEntities) {
      setInternalSelectedEntities(externalSelectedEntities);
    }
  }, [externalSelectedEntities]);

  // Mock data
  const mockGroups: Entity[] = [
    { id: '1', name: 'Development Team', type: 'group', memberCount: 12, status: 'online', priority: 'high', tags: ['tech', 'active'], lastActive: '2 min ago' },
    { id: '2', name: 'Marketing Squad', type: 'group', memberCount: 8, status: 'online', priority: 'medium', tags: ['marketing'], lastActive: '5 min ago' },
    { id: '3', name: 'Support Team', type: 'group', memberCount: 15, status: 'away', priority: 'low', tags: ['support'], lastActive: '10 min ago' },
    { id: '4', name: 'Design Team', type: 'group', memberCount: 6, status: 'offline', priority: 'medium', tags: ['design'], lastActive: '1 hour ago' },
  ];

  const mockCommunities: Entity[] = [
    { id: '1', name: 'Tech Innovators', type: 'community', memberCount: 45, status: 'online', priority: 'high', tags: ['innovation', 'tech'], lastActive: '1 min ago' },
    { id: '2', name: 'Startup Founders', type: 'community', memberCount: 32, status: 'online', priority: 'high', tags: ['startup', 'founders'], lastActive: '3 min ago' },
    { id: '3', name: 'Digital Marketing', type: 'community', memberCount: 28, status: 'away', priority: 'medium', tags: ['marketing'], lastActive: '15 min ago' },
  ];

  const mockUsers: Entity[] = [
    { id: '1', name: 'John Doe', type: 'user', status: 'online', priority: 'high', tags: ['admin', 'developer'], lastActive: 'now' },
    { id: '2', name: 'Jane Smith', type: 'user', status: 'online', priority: 'medium', tags: ['designer'], lastActive: '2 min ago' },
    { id: '3', name: 'Mike Johnson', type: 'user', status: 'away', priority: 'low', tags: ['support'], lastActive: '10 min ago' },
    { id: '4', name: 'Sarah Wilson', type: 'user', status: 'offline', priority: 'medium', tags: ['marketing'], lastActive: '1 hour ago' },
    { id: '5', name: 'Alex Brown', type: 'user', status: 'online', priority: 'high', tags: ['admin'], lastActive: 'now' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleEntitySelection = (entity: Entity) => {
    const newSelected = { ...selectedEntities };
    const entityType = `${entity.type}s` as keyof SelectedEntities;
    const entityList = newSelected[entityType] || [];
    const index = entityList.findIndex(e => e.id === entity.id);
    
    if (index > -1) {
      entityList.splice(index, 1);
    } else {
      entityList.push(entity);
    }
    
    // Update both internal and external state
    setInternalSelectedEntities(newSelected);
    onSelectionChange(newSelected);
  };

  const clearAllSelections = () => {
    const cleared = { groups: [], communities: [], users: [] };
    setInternalSelectedEntities(cleared);
    onSelectionChange(cleared);
  };

  const filteredEntities = (entities: Entity[]) => {
    return entities.filter(entity => {
      const matchesSearch = entity.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || entity.type === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const totalSelected = selectedEntities.groups.length + selectedEntities.communities.length + selectedEntities.users.length;

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Whapi Management</h2>
          <button
            onClick={() => setBulkSelectMode(!bulkSelectMode)}
            className={`p-2 rounded-lg transition-colors ${
              bulkSelectMode 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Check className="w-4 h-4" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search entities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                showFilters 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </div>

          {showFilters && (
            <div className="flex gap-2">
              {['all', 'groups', 'communities', 'users'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as any)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filterType === type
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Panel - TOP SECTION */}
      {totalSelected > 0 && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Selected ({totalSelected})</h3>
            <button
              onClick={clearAllSelections}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {selectedEntities.groups.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Groups ({selectedEntities.groups.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedEntities.groups.map((group) => (
                    <span
                      key={group.id}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {group.name}
                      <button
                        onClick={() => toggleEntitySelection(group)}
                        className="hover:text-blue-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedEntities.communities.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-medium text-gray-700">Communities ({selectedEntities.communities.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedEntities.communities.map((community) => (
                    <span
                      key={community.id}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {community.name}
                      <button
                        onClick={() => toggleEntitySelection(community)}
                        className="hover:text-purple-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedEntities.users.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-gray-700">Users ({selectedEntities.users.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedEntities.users.map((user) => (
                    <span
                      key={user.id}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      {user.name}
                      <button
                        onClick={() => toggleEntitySelection(user)}
                        className="hover:text-green-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scrollable Content - BOTTOM SECTIONS */}
      <div className="flex-1 overflow-y-auto">
        {/* All Groups Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('groups')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">All Groups</span>
              <span className="text-sm text-gray-500">({mockGroups.length})</span>
            </div>
            {expandedSections.groups ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.groups && (
            <div className="px-4 pb-4 space-y-2">
              {filteredEntities(mockGroups).map((group) => {
                const isSelected = selectedEntities.groups.some(g => g.id === group.id);
                return (
                  <div
                    key={group.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleEntitySelection(group)}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{group.name}</h4>
                        {group.priority && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(group.priority)}`}>
                            {group.priority}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{group.memberCount} members</span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(group.status || 'offline')}`}></div>
                          <span className="text-xs text-gray-500">{group.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Communities Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('communities')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">All Communities</span>
              <span className="text-sm text-gray-500">({mockCommunities.length})</span>
            </div>
            {expandedSections.communities ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.communities && (
            <div className="px-4 pb-4 space-y-2">
              {filteredEntities(mockCommunities).map((community) => {
                const isSelected = selectedEntities.communities.some(c => c.id === community.id);
                return (
                  <div
                    key={community.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleEntitySelection(community)}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{community.name}</h4>
                        {community.priority && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(community.priority)}`}>
                            {community.priority}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{community.memberCount} members</span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(community.status || 'offline')}`}></div>
                          <span className="text-xs text-gray-500">{community.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All Users Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection('users')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">All Users</span>
              <span className="text-sm text-gray-500">({mockUsers.length})</span>
            </div>
            {expandedSections.users ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {expandedSections.users && (
            <div className="px-4 pb-4 space-y-2">
              {filteredEntities(mockUsers).map((user) => {
                const isSelected = selectedEntities.users.some(u => u.id === user.id);
                return (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleEntitySelection(user)}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{user.name}</h4>
                        {user.priority && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(user.priority)}`}>
                            {user.priority}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status || 'offline')}`}></div>
                          <span className="text-xs text-gray-500">{user.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected && <Check className="w-4 h-4 text-green-600" />}
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout Buttons */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2">
          <button
            onClick={() => {
              const totalSelected = selectedEntities.groups.length + selectedEntities.communities.length + selectedEntities.users.length;
              if (totalSelected > 0) {
                onGridLayout?.('workspace');
                toast.success(`Opening ${totalSelected} selected items in workspace`);
              } else {
                toast.error('Please select at least one item to open in workspace');
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Grid className="w-4 h-4" />
            Open in Workspace
            <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
              {selectedEntities.groups.length + selectedEntities.communities.length + selectedEntities.users.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 