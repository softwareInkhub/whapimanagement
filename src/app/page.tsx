"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import WhapiSidebar from "./components/WhapiSidebar";
import WhapiChatInterface from "./components/WhapiChatInterface";
import WhapiAnalytics from "./components/WhapiAnalytics";
import GridLayoutManager from "./components/GridLayoutManager";
import { MessageSquare, BarChart3, Settings, Bell, User, Grid, Layout, X, Building2 } from "lucide-react";

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
  const [selectedEntities, setSelectedEntities] = useState<SelectedEntities>({
    groups: [],
    communities: [],
    users: []
  });

  const [activeTab, setActiveTab] = useState<'chat' | 'analytics' | 'settings'>('chat');
  const [gridView, setGridView] = useState<'none' | 'groups' | 'communities' | 'users'>('none');
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

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
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
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
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
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

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'chat' && (
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
          {activeTab === 'analytics' && (
            <WhapiAnalytics />
          )}
          {activeTab === 'settings' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-500">Settings panel coming soon...</p>
              </div>
            </div>
          )}

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
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}