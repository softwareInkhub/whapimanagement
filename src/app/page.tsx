"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import WhapiSidebar from "./components/WhapiSidebar";
import WhapiChatInterface from "./components/WhapiChatInterface";
import WhapiAnalytics from "./components/WhapiAnalytics";
import GridLayoutManager from "./components/GridLayoutManager";
import MessageSheet from "./components/MessageSheet";
import TopTabBar from "./components/TopTabBar";
import { MessageSquare, BarChart3, Settings, Bell, User, Grid, Layout, X, Building2, Pin, Maximize2, Star, Clock, MoreHorizontal, Check, Users, Search, Filter, Plus, MoreVertical } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  type: 'group' | 'community' | 'user';
  avatar?: string;
  description?: string;
  memberCount?: number;
  status?: 'online' | 'away' | 'offline';
  priority?: 'high' | 'medium' | 'low';
  lastActive?: string;
  tags?: string[];
}

interface SelectedEntities {
  groups: Entity[];
  communities: Entity[];
  users: Entity[];
}

interface GridItem {
  id: string;
  title: string;
  component: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  entity?: Entity;
}

interface PinnedTab {
  id: string;
  title: string;
  entity: Entity;
  type: 'pinned';
}

interface SheetTab {
  id: string;
  title: string;
  entity: Entity;
  type: 'sheet';
}

// Grid Layout Components
const GroupsGrid = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Groups Grid View</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Group {i + 1}</h3>
              <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 5} members</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">This is a sample group description for demonstration purposes.</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
          </div>
        </div>
      ))}
    </div>
              </div>
);

const CommunitiesGrid = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Communities Grid View</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Community {i + 1}</h3>
              <p className="text-sm text-gray-500">{Math.floor(Math.random() * 200) + 20} members</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">This is a sample community description for demonstration purposes.</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Active</span>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View Details</button>
          </div>
        </div>
      ))}
        </div>
      </div>
);

const UsersGrid = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Users Grid View</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">User {i + 1}</h3>
              <p className="text-sm text-gray-500">user{i + 1}@example.com</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">This is a sample user description for demonstration purposes.</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Online</span>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">View Profile</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function WhapiManagementApp() {
  console.log('WhapiManagementApp component rendering');
  
  // Enhanced state management
  const [selectedEntities, setSelectedEntities] = useState<SelectedEntities>({
    groups: [],
    communities: [],
    users: []
  });

  // Data fetching states
  const [allGroups, setAllGroups] = useState<Entity[]>([]);
  const [allCommunities, setAllCommunities] = useState<Entity[]>([]);
  const [allUsers, setAllUsers] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'groups' | 'communities' | 'users'>('all');

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls - replace with actual API endpoints
      const mockGroups: Entity[] = [
        { id: '1', name: 'Development Team', type: 'group', memberCount: 12, status: 'online', priority: 'high', lastActive: '2 min ago', tags: ['Development', 'Active'] },
        { id: '2', name: 'Marketing Team', type: 'group', memberCount: 8, status: 'online', priority: 'medium', lastActive: '5 min ago', tags: ['Marketing', 'Campaign'] },
        { id: '3', name: 'Support Team', type: 'group', memberCount: 15, status: 'away', priority: 'high', lastActive: '10 min ago', tags: ['Support', 'Customer'] },
        { id: '4', name: 'Design Team', type: 'group', memberCount: 6, status: 'online', priority: 'medium', lastActive: '1 min ago', tags: ['Design', 'Creative'] },
        { id: '5', name: 'QA Team', type: 'group', memberCount: 10, status: 'offline', priority: 'low', lastActive: '1 hour ago', tags: ['QA', 'Testing'] },
        { id: '6', name: 'Product Team', type: 'group', memberCount: 9, status: 'online', priority: 'high', lastActive: '3 min ago', tags: ['Product', 'Strategy'] }
      ];

      const mockCommunities: Entity[] = [
        { id: '1', name: 'Tech Community', type: 'community', memberCount: 150, status: 'online', priority: 'high', lastActive: '1 min ago', tags: ['Technology', 'Innovation'] },
        { id: '2', name: 'Startup Network', type: 'community', memberCount: 89, status: 'online', priority: 'medium', lastActive: '5 min ago', tags: ['Startup', 'Networking'] },
        { id: '3', name: 'Marketing Professionals', type: 'community', memberCount: 234, status: 'away', priority: 'medium', lastActive: '15 min ago', tags: ['Marketing', 'Professional'] },
        { id: '4', name: 'Design Community', type: 'community', memberCount: 167, status: 'online', priority: 'high', lastActive: '2 min ago', tags: ['Design', 'Creative'] },
        { id: '5', name: 'Developer Hub', type: 'community', memberCount: 312, status: 'online', priority: 'high', lastActive: '30 sec ago', tags: ['Development', 'Coding'] }
      ];

      const mockUsers: Entity[] = [
        { id: '1', name: 'John Doe', type: 'user', status: 'online', priority: 'high', lastActive: '1 min ago', tags: ['Developer', 'Lead'] },
        { id: '2', name: 'Jane Smith', type: 'user', status: 'online', priority: 'medium', lastActive: '2 min ago', tags: ['Designer', 'Senior'] },
        { id: '3', name: 'Mike Johnson', type: 'user', status: 'away', priority: 'medium', lastActive: '10 min ago', tags: ['Support', 'Manager'] },
        { id: '4', name: 'Sarah Wilson', type: 'user', status: 'online', priority: 'high', lastActive: '30 sec ago', tags: ['Marketing', 'Director'] },
        { id: '5', name: 'Alex Brown', type: 'user', status: 'offline', priority: 'low', lastActive: '2 hours ago', tags: ['QA', 'Tester'] },
        { id: '6', name: 'Emily Davis', type: 'user', status: 'online', priority: 'medium', lastActive: '5 min ago', tags: ['Product', 'Manager'] },
        { id: '7', name: 'David Lee', type: 'user', status: 'online', priority: 'high', lastActive: '1 min ago', tags: ['Developer', 'Senior'] },
        { id: '8', name: 'Lisa Chen', type: 'user', status: 'away', priority: 'medium', lastActive: '20 min ago', tags: ['Designer', 'Junior'] }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAllGroups(mockGroups);
      setAllCommunities(mockCommunities);
      setAllUsers(mockUsers);
      
      toast.success('Data loaded successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState<'chat' | 'analytics' | 'settings'>('chat');
  const [gridView, setGridView] = useState<'none' | 'groups' | 'communities' | 'users'>('none');
  
  // Tab management for TopTabBar
  const [topTabs, setTopTabs] = useState([
    { id: 'chat', label: 'Chat', type: 'main' as const, canClose: false },
    { id: 'analytics', label: 'Analytics', type: 'main' as const, canClose: false },
    { id: 'settings', label: 'Settings', type: 'main' as const, canClose: false }
  ]);
  const [activeTopTab, setActiveTopTab] = useState('chat');
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [pinnedTabs, setPinnedTabs] = useState<PinnedTab[]>([]);
  const [sheetTabs, setSheetTabs] = useState<SheetTab[]>([]);
  const [activeSheetTab, setActiveSheetTab] = useState<string | null>(null);
  const [messageTabs, setMessageTabs] = useState<Array<{
    id: string;
    recipient: Entity;
    isActive: boolean;
  }>>([]);
  const [activeMessageTab, setActiveMessageTab] = useState<string | null>(null);

  const handleSelectionChange = (selected: SelectedEntities) => {
    setSelectedEntities(selected);
  };

  const handleSendMessage = (message: string, selected: SelectedEntities) => {
    const totalRecipients = selected.groups.length + selected.communities.length + selected.users.length;

    // Simulate sending message
    console.log("Sending message:", message);
    console.log("To:", selected);

    // Show success toast
    toast.success(`Message sent to ${totalRecipients} recipients!`, {
      duration: 3000,
      position: "top-right",
    });
  };

  const handleOpenEntity = (entity: Entity, mode: 'sheet' | 'workspace' = 'sheet') => {
    if (mode === 'sheet') {
      // Close any open message sheet when opening entity details
      if (activeMessageTab) {
        setActiveMessageTab(null);
      }
      
      // Open as sheet tab
      const newSheetTab: SheetTab = {
        id: `sheet-${entity.id}`,
        title: entity.name,
        entity,
        type: 'sheet'
      };
      
      // Check if already exists
      const existingTab = sheetTabs.find(tab => tab.entity.id === entity.id);
      if (!existingTab) {
        setSheetTabs(prev => [...prev, newSheetTab]);
      }
      setActiveSheetTab(`sheet-${entity.id}`);
      
      // Add to top tabs
      const tabId = `sheet-${entity.id}`;
      const existingTopTab = topTabs.find(tab => tab.id === tabId);
      if (!existingTopTab) {
        setTopTabs(prev => [...prev, {
          id: tabId,
          label: entity.name,
          type: 'sheet',
          entity,
          canClose: true
        }]);
      }
      setActiveTopTab(tabId);
      
      toast.success(`${entity.name} opened as sheet`);
    } else {
      // Open as workspace grid item
      const newItem: GridItem = {
        id: `${entity.type}-${entity.id}-${Date.now()}`,
        title: `${entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}: ${entity.name}`,
        entity,
        component: (
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                entity.type === 'group' ? 'bg-blue-100' :
                entity.type === 'community' ? 'bg-purple-100' : 'bg-green-100'
              }`}>
                {entity.type === 'group' ? <MessageSquare className="w-6 h-6 text-blue-600" /> :
                 entity.type === 'community' ? <Building2 className="w-6 h-6 text-purple-600" /> :
                 <User className="w-6 h-6 text-green-600" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{entity.name}</h3>
                <p className="text-sm text-gray-500">{entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}</p>
              </div>
            </div>

            <div className="space-y-3">
              {entity.memberCount && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Members</span>
                  <span className="text-sm text-gray-600">{entity.memberCount}</span>
                </div>
              )}
              
              {entity.status && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    entity.status === 'online' ? 'bg-green-100 text-green-700' :
                    entity.status === 'away' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {entity.status}
                  </span>
                </div>
              )}
              
              {entity.priority && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Priority</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    entity.priority === 'high' ? 'bg-red-100 text-red-700' :
                    entity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {entity.priority}
                  </span>
                </div>
              )}
              
              {entity.lastActive && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Last Active</span>
                  <span className="text-sm text-gray-600">{entity.lastActive}</span>
              </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                onClick={() => handleOpenMessageSheet(entity)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        ),
        x: 50 + (Math.random() * 100),
        y: 50 + (Math.random() * 100),
        width: 400,
        height: 500,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZIndex
      };

      setGridItems(prev => [...prev, newItem]);
      setNextZIndex(prev => prev + 1);
      toast.success(`${entity.name} opened in workspace`);
    }
  };

  const handleGridLayout = (type: 'groups' | 'communities' | 'users' | 'workspace') => {
    if (type === 'workspace') {
      // Create draggable windows for all selected entities
      const allSelected = [
        ...selectedEntities.groups.map(group => ({ ...group, originalType: 'group' })),
        ...selectedEntities.communities.map(community => ({ ...community, originalType: 'community' })),
        ...selectedEntities.users.map(user => ({ ...user, originalType: 'user' }))
      ];

      allSelected.forEach((entity, index) => {
        const newItem: GridItem = {
          id: `${entity.originalType}-${entity.id}-${Date.now()}-${index}`,
          title: `${entity.originalType.charAt(0).toUpperCase() + entity.originalType.slice(1)}: ${entity.name}`,
          component: (
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  entity.originalType === 'group' ? 'bg-blue-100' :
                  entity.originalType === 'community' ? 'bg-purple-100' : 'bg-green-100'
                }`}>
                  {entity.originalType === 'group' ? <MessageSquare className="w-6 h-6 text-blue-600" /> :
                   entity.originalType === 'community' ? <Building2 className="w-6 h-6 text-purple-600" /> :
                   <User className="w-6 h-6 text-green-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{entity.name}</h3>
                  <p className="text-sm text-gray-500">{entity.originalType.charAt(0).toUpperCase() + entity.originalType.slice(1)}</p>
        </div>
      </div>
              
              <div className="space-y-3">
                {entity.memberCount && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Members</span>
                    <span className="text-sm text-gray-600">{entity.memberCount}</span>
                  </div>
                )}
                
                {entity.status && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      entity.status === 'online' ? 'bg-green-100 text-green-700' :
                      entity.status === 'away' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {entity.status}
                    </span>
                  </div>
                )}
                
                {entity.priority && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Priority</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      entity.priority === 'high' ? 'bg-red-100 text-red-700' :
                      entity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {entity.priority}
                    </span>
                  </div>
                )}
                
                {entity.lastActive && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Last Active</span>
                    <span className="text-sm text-gray-600">{entity.lastActive}</span>
                  </div>
                )}
                </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => handleOpenMessageSheet(entity)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
                  </div>
          ),
          x: 50 + (index * 50),
          y: 50 + (index * 50),
          width: 400,
          height: 500,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex + index
        };

        setGridItems(prev => [...prev, newItem]);
      });
      
      setNextZIndex(prev => prev + allSelected.length);
      return;
    }

    // Handle individual type buttons (for backward compatibility)
    const newItem: GridItem = {
      id: `${type}-${Date.now()}`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Grid`,
      component: type === 'groups' ? <GroupsGrid /> : type === 'communities' ? <CommunitiesGrid /> : <UsersGrid />,
      x: Math.random() * 200,
      y: Math.random() * 100,
      width: 800,
      height: 600,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex
    };

    setGridItems(prev => [...prev, newItem]);
    setNextZIndex(prev => prev + 1);
    setGridView('none'); // Close the grid view to show the draggable window
  };

  const handleItemClose = (id: string) => {
    setGridItems(prev => prev.filter(item => item.id !== id));
  };

  const handleItemMinimize = (id: string) => {
    setGridItems(prev => prev.map(item => 
      item.id === id ? { ...item, isMinimized: !item.isMinimized } : item
    ));
  };

  const handleItemMaximize = (id: string) => {
    setGridItems(prev => prev.map(item => 
      item.id === id ? { ...item, isMaximized: !item.isMaximized } : item
    ));
  };

  const handleItemMove = (id: string, x: number, y: number) => {
    setGridItems(prev => prev.map(item => 
      item.id === id ? { ...item, x, y } : item
    ));
  };

  const handleItemResize = (id: string, width: number, height: number) => {
    setGridItems(prev => prev.map(item => 
      item.id === id ? { ...item, width, height } : item
    ));
  };

  const handlePinEntity = (entity: Entity) => {
    const existingTab = pinnedTabs.find(tab => tab.entity.id === entity.id);
    if (existingTab) {
      // Unpin if already pinned
      setPinnedTabs(prev => prev.filter(tab => tab.entity.id !== entity.id));
      // Also remove from top tabs
      setTopTabs(prev => prev.filter(tab => tab.id !== `pinned-${entity.id}`));
      toast.success(`${entity.name} unpinned from tab bar`);
    } else {
      // Pin the entity
      const newPinnedTab: PinnedTab = {
        id: `pinned-${entity.id}`,
        title: entity.name,
        entity,
        type: 'pinned'
      };
      setPinnedTabs(prev => [...prev, newPinnedTab]);
      
      // Add to top tabs
      setTopTabs(prev => [...prev, {
        id: `pinned-${entity.id}`,
        label: entity.name,
        type: 'pinned',
        entity,
        canClose: true
      }]);
      toast.success(`${entity.name} pinned to tab bar`);
    }
  };

  const handleUnpinTab = (tabId: string) => {
    setPinnedTabs(prev => prev.filter(tab => tab.id !== tabId));
    // Also remove from top tabs
    setTopTabs(prev => prev.filter(tab => tab.id !== tabId));
  };

  const handlePinnedTabClick = (pinnedTab: PinnedTab) => {
    // Switch to the pinned tab
    setActiveTopTab(pinnedTab.id);
  };

  const handleSheetTabClick = (sheetTab: SheetTab) => {
    setActiveSheetTab(sheetTab.id);
  };

  const handleCloseSheetTab = (tabId: string) => {
    setSheetTabs(prev => prev.filter(tab => tab.id !== tabId));
    // Also remove from top tabs
    setTopTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeSheetTab === tabId) {
      setActiveSheetTab(sheetTabs.length > 1 ? sheetTabs[0]?.id || null : null);
    }
  };

  const handlePinSheetTab = (sheetTab: SheetTab) => {
    handlePinEntity(sheetTab.entity);
  };

  // Top tab management functions
  const handleTopTabClick = (tabId: string) => {
    setActiveTopTab(tabId);
    
    // Handle different tab types
    if (tabId === 'chat' || tabId === 'analytics' || tabId === 'settings') {
      setActiveTab(tabId as 'chat' | 'analytics' | 'settings');
    } else if (tabId.startsWith('sheet-')) {
      setActiveSheetTab(tabId);
    } else if (tabId.startsWith('message-')) {
      setActiveMessageTab(tabId);
    }
  };

  const handleTopTabClose = (tabId: string) => {
    // Remove from top tabs
    setTopTabs(prev => prev.filter(tab => tab.id !== tabId));
    
    // Handle closing different tab types
    if (tabId.startsWith('sheet-')) {
      handleCloseSheetTab(tabId);
    } else if (tabId.startsWith('message-')) {
      setMessageTabs(prev => prev.filter(tab => tab.id !== tabId));
      if (activeMessageTab === tabId) {
        setActiveMessageTab(null);
      }
    }
    
    // If we're closing the active tab, switch to chat
    if (activeTopTab === tabId) {
      setActiveTopTab('chat');
      setActiveTab('chat');
    }
  };

  const handleOpenMessageSheet = (entity: Entity) => {
    // Close any active entity details sheet when opening message sheet
    if (activeSheetTab) {
      setActiveSheetTab(null);
    }
    
    const messageTabId = `message-${entity.id}`;
    
    // Check if message tab already exists
    const existingTab = messageTabs.find(tab => tab.id === messageTabId);
    
    if (!existingTab) {
      // Create new message tab
      setMessageTabs(prev => [...prev, {
        id: messageTabId,
        recipient: entity,
        isActive: true
      }]);
    } else {
      // Update existing tab to be active
      setMessageTabs(prev => prev.map(tab => ({
        ...tab,
        isActive: tab.id === messageTabId
      })));
    }
    
    setActiveMessageTab(messageTabId);
    
    // Add to top tabs
    const tabId = `message-${entity.id}`;
    const existingTopTab = topTabs.find(tab => tab.id === tabId);
    if (!existingTopTab) {
      setTopTabs(prev => [...prev, {
        id: tabId,
        label: `Message: ${entity.name}`,
        type: 'message',
        entity,
        canClose: true
      }]);
    }
    setActiveTopTab(tabId);
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 flex-shrink-0">
        <WhapiSidebar
          selectedEntities={selectedEntities}
          onSelectionChange={handleSelectionChange}
          onSendMessage={handleSendMessage}
          onGridLayout={handleGridLayout}
          onOpenEntity={handleOpenEntity}
          allGroups={allGroups}
          allCommunities={allCommunities}
          allUsers={allUsers}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterChange={setFilterType}
        />
                  </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
                {/* App Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Whapi Management</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {gridView !== 'none' && (
                <button
                  onClick={() => setGridView('none')}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Close Grid
                </button>
              )}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Top Tab Bar */}
        <TopTabBar
          tabs={topTabs}
          activeTab={activeTopTab}
          onTabClick={handleTopTabClick}
          onTabClose={handleTopTabClose}
        />

                {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">

          {/* Main Tab Content */}
          {activeTopTab === 'chat' && (
            <>
              {gridView === 'groups' && <GroupsGrid />}
              {gridView === 'communities' && <CommunitiesGrid />}
              {gridView === 'users' && <UsersGrid />}
              {gridView === 'none' && (
                <WhapiChatInterface 
                  selectedEntities={selectedEntities}
                  onSendMessage={handleSendMessage}
                />
              )}
            </>
          )}
          {activeTopTab === 'analytics' && (
            <WhapiAnalytics />
          )}
          {activeTopTab === 'settings' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-500">Settings panel coming soon...</p>
              </div>
            </div>
          )}

          {/* Sheet Content */}
          {activeTopTab.startsWith('sheet-') && (() => {
            const sheetTab = sheetTabs.find(tab => tab.id === activeTopTab);
            if (!sheetTab) {
              return null;
            }
            const entity = sheetTab.entity;
            
            return (
              <div className="absolute inset-0 bg-white z-10">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        entity.type === 'group' ? 'bg-blue-100' :
                        entity.type === 'community' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {entity.type === 'group' ? <MessageSquare className="w-5 h-5 text-blue-600" /> :
                         entity.type === 'community' ? <Building2 className="w-5 h-5 text-purple-600" /> :
                         <User className="w-5 h-5 text-green-600" />}
                    </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{entity.name}</h2>
                        <p className="text-sm text-gray-500">{entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}</p>
                    </div>
                    </div>
                    <button
                      onClick={() => handleTopTabClose(activeTopTab)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-2xl mx-auto">
                      {/* Entity Details */}
                      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {entity.memberCount && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening member list for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Members</span>
                              <span className="text-sm text-gray-600">{entity.memberCount}</span>
                            </div>
                          )}
                          
                          {entity.status && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Updating status for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Status</span>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                entity.status === 'online' ? 'bg-green-100 text-green-700' :
                                entity.status === 'away' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {entity.status}
                              </span>
                            </div>
                          )}
                          
                          {entity.priority && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Updating priority for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Priority</span>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                entity.priority === 'high' ? 'bg-red-100 text-red-700' :
                                entity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {entity.priority}
                              </span>
                            </div>
                          )}
                          
                          {entity.lastActive && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Viewing activity timeline for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Last Active</span>
                              <span className="text-sm text-gray-600">{entity.lastActive}</span>
                            </div>
                          )}
                          
                          {entity.tags && entity.tags.length > 0 && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Tags</span>
                              <div className="flex gap-1">
                                {entity.tags.map((tag, index) => (
                                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <button 
                            onClick={() => handleOpenMessageSheet(entity)}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Send Message
                          </button>
                          <button 
                            onClick={() => {
                              handlePinEntity(entity);
                              setActiveSheetTab(null); // Close the sheet after pinning
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Star className="w-4 h-4" />
                            Pin to Tab Bar
                          </button>
                          <button 
                            onClick={() => {
                              handleOpenEntity(entity, 'workspace');
                              setActiveSheetTab(null); // Close the sheet after opening in workspace
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Layout className="w-4 h-4" />
                            Open in Workspace
                          </button>
                                                      <button 
                              onClick={() => {
                                toast.success(`More options menu opened for ${entity.name}`);
                                // Here you would typically open a dropdown menu with more options
                                console.log('Opening more options for:', entity.name);
                              }}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                            <MoreHorizontal className="w-4 h-4" />
                            More Options
                          </button>
                        </div>
                      </div>

                      {/* Entity-Specific Content */}
                      {entity.type === 'group' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Information</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => toast.success(`Viewing group type details for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Group Type</span>
                              <span className="text-sm text-blue-600 font-medium">{entity.name.includes('Development') ? 'Development' : entity.name.includes('Marketing') ? 'Marketing' : entity.name.includes('Support') ? 'Support' : 'General'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => toast.success(`Opening projects view for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Active Projects</span>
                              <span className="text-sm text-blue-600 font-medium">{Math.floor(Math.random() * 5) + 1}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => toast.success(`Opening team lead profile for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Team Lead</span>
                              <span className="text-sm text-blue-600 font-medium">{entity.name.includes('Development') ? 'John Doe' : entity.name.includes('Marketing') ? 'Jane Smith' : entity.name.includes('Support') ? 'Mike Johnson' : 'Alex Brown'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => toast.success(`Opening tasks board for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Open Tasks</span>
                              <span className="text-sm text-blue-600 font-medium">{Math.floor(Math.random() * 15) + 5}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => toast.success(`Opening meetings schedule for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Scheduled Meetings</span>
                              <span className="text-sm text-blue-600 font-medium">{Math.floor(Math.random() * 3) + 1}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => toast.success(`Opening group settings for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Group Settings</span>
                              <span className="text-sm text-blue-600 font-medium">Configure</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {entity.type === 'community' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Information</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => toast.success(`Viewing community type details for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Community Type</span>
                              <span className="text-sm text-purple-600 font-medium">{entity.name.includes('Tech') ? 'Technology' : entity.name.includes('Startup') ? 'Startup' : entity.name.includes('Marketing') ? 'Marketing' : 'General'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => toast.success(`Opening discussion topics for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Active Discussions</span>
                              <span className="text-sm text-purple-600 font-medium">{Math.floor(Math.random() * 10) + 5}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => toast.success(`Opening community admin profile for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Community Admin</span>
                              <span className="text-sm text-purple-600 font-medium">{entity.name.includes('Tech') ? 'Sarah Wilson' : entity.name.includes('Startup') ? 'Alex Brown' : entity.name.includes('Marketing') ? 'Jane Smith' : 'John Doe'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => toast.success(`Opening events calendar for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Upcoming Events</span>
                              <span className="text-sm text-purple-600 font-medium">{Math.floor(Math.random() * 3) + 1}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => toast.success(`Opening resources library for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Shared Resources</span>
                              <span className="text-sm text-purple-600 font-medium">{Math.floor(Math.random() * 20) + 10}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => toast.success(`Opening community guidelines for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Community Guidelines</span>
                              <span className="text-sm text-purple-600 font-medium">View</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {entity.type === 'user' && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => toast.success(`Viewing role details for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Role</span>
                              <span className="text-sm text-green-600 font-medium">{entity.name.includes('John') ? 'Developer' : entity.name.includes('Jane') ? 'Designer' : entity.name.includes('Mike') ? 'Support' : entity.name.includes('Sarah') ? 'Marketing' : 'Admin'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => toast.success(`Opening department view for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Department</span>
                              <span className="text-sm text-green-600 font-medium">{entity.name.includes('John') ? 'Engineering' : entity.name.includes('Jane') ? 'Design' : entity.name.includes('Mike') ? 'Support' : entity.name.includes('Sarah') ? 'Marketing' : 'Management'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => toast.success(`Viewing join date details for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Join Date</span>
                              <span className="text-sm text-green-600 font-medium">{entity.name.includes('John') ? 'Jan 2023' : entity.name.includes('Jane') ? 'Mar 2023' : entity.name.includes('Mike') ? 'Jun 2023' : entity.name.includes('Sarah') ? 'Sep 2023' : 'Dec 2022'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => toast.success(`Opening skills profile for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Skills</span>
                              <span className="text-sm text-green-600 font-medium">{entity.name.includes('John') ? 'React, Node.js, TypeScript' : entity.name.includes('Jane') ? 'Figma, Adobe XD, Sketch' : entity.name.includes('Mike') ? 'Customer Service, Zendesk' : entity.name.includes('Sarah') ? 'SEO, Google Ads, Analytics' : 'Leadership, Strategy'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => toast.success(`Opening groups membership for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Groups</span>
                              <span className="text-sm text-green-600 font-medium">{Math.floor(Math.random() * 4) + 2}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => toast.success(`Opening communities membership for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Communities</span>
                              <span className="text-sm text-green-600 font-medium">{Math.floor(Math.random() * 3) + 1}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => toast.success(`Opening availability calendar for ${entity.name}`)}>
                              <span className="text-sm font-medium text-gray-700">Availability</span>
                              <span className="text-sm text-green-600 font-medium">{entity.status === 'online' ? 'Available' : entity.status === 'away' ? 'Away' : 'Offline'}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Recent Activity - Entity Specific */}
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                          {entity.type === 'group' && (
                            <>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening task completion for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Task completed in {entity.name}</p>
                                  <p className="text-xs text-gray-500">30 minutes ago</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening meeting details for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Team meeting scheduled for {entity.name}</p>
                                  <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening project update for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Star className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Project milestone reached in {entity.name}</p>
                                  <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                              </div>
                            </>
                          )}

                          {entity.type === 'community' && (
                            <>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening discussion for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <MessageSquare className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">New discussion started in {entity.name}</p>
                                  <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening event details for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Event announced in {entity.name}</p>
                                  <p className="text-xs text-gray-500">3 hours ago</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening resource upload for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Star className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Resource shared in {entity.name}</p>
                                  <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                              </div>
                            </>
                          )}

                          {entity.type === 'user' && (
                            <>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening status update for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{entity.name} updated their status</p>
                                  <p className="text-xs text-gray-500">15 minutes ago</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening group join for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Users className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{entity.name} joined a new group</p>
                                  <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toast.success(`Opening skill update for ${entity.name}`)}>
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Star className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{entity.name} updated their skills</p>
                                  <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Drag and Drop Grid Layout Overlay */}
          {gridItems.length > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full pointer-events-auto">
                <GridLayoutManager
                  items={gridItems}
                  onItemClose={handleItemClose}
                  onItemMinimize={handleItemMinimize}
                  onItemMaximize={handleItemMaximize}
                  onItemMove={handleItemMove}
                  onItemResize={handleItemResize}
                  onItemPin={handlePinEntity}
                  pinnedEntities={pinnedTabs.map(tab => tab.entity)}
                />
              </div>
            </div>
          )}

          {/* Message Sheet */}
          {activeTopTab.startsWith('message-') && (() => {
            const messageTab = messageTabs.find(tab => tab.id === activeTopTab);
            if (!messageTab) return null;
            
            return (
              <div className="absolute inset-0 bg-white z-20">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        messageTab.recipient.type === 'group' ? 'bg-blue-100' :
                        messageTab.recipient.type === 'community' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {messageTab.recipient.type === 'group' ? <MessageSquare className="w-5 h-5 text-blue-600" /> :
                         messageTab.recipient.type === 'community' ? <Building2 className="w-5 h-5 text-purple-600" /> :
                         <User className="w-5 h-5 text-green-600" />}
          </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Send Message</h2>
                        <p className="text-sm text-gray-500">To: {messageTab.recipient.name}</p>
        </div>
      </div>
                                        <button
                      onClick={() => handleTopTabClose(activeTopTab)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
          </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-2xl mx-auto h-full">
                      <MessageSheet
                        isOpen={true}
                        onClose={() => setActiveMessageTab(null)}
                        recipient={messageTab.recipient}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Pinned Tab Content */}
          {activeTopTab.startsWith('pinned-') && (() => {
            const pinnedTab = pinnedTabs.find(tab => tab.id === activeTopTab);
            if (!pinnedTab) return null;
            
            return (
              <div className="absolute inset-0 bg-white z-20">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        pinnedTab.entity.type === 'group' ? 'bg-blue-100' :
                        pinnedTab.entity.type === 'community' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {pinnedTab.entity.type === 'group' ? <MessageSquare className="w-5 h-5 text-blue-600" /> :
                         pinnedTab.entity.type === 'community' ? <Building2 className="w-5 h-5 text-purple-600" /> :
                         <User className="w-5 h-5 text-green-600" />}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{pinnedTab.title}</h2>
                        <p className="text-sm text-gray-500">{pinnedTab.entity.type.charAt(0).toUpperCase() + pinnedTab.entity.type.slice(1)} (Pinned)</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTopTabClose(activeTopTab)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pinned Entity Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Name</span>
                            <span className="text-sm text-gray-600">{pinnedTab.entity.name}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Type</span>
                            <span className="text-sm text-gray-600">{pinnedTab.entity.type.charAt(0).toUpperCase() + pinnedTab.entity.type.slice(1)}</span>
                          </div>
                          {pinnedTab.entity.memberCount && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm font-medium text-gray-700">Members</span>
                              <span className="text-sm text-gray-600">{pinnedTab.entity.memberCount}</span>
                            </div>
                          )}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <button 
                              onClick={() => handleOpenMessageSheet(pinnedTab.entity)}
                              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}