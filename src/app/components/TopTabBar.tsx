"use client";

import React from "react";
import { X, MessageSquare, Building2, User } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  type: 'main' | 'sheet' | 'message' | 'pinned';
  entity?: {
    id: string;
    name: string;
    type: 'group' | 'community' | 'user';
  };
  canClose?: boolean;
}

interface TopTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export default function TopTabBar({ tabs, activeTab, onTabClick, onTabClose }: TopTabBarProps) {
  const getTabIcon = (tab: Tab) => {
    if (tab.type === 'main') {
      return null; // Main tabs don't need icons
    }
    
    if (tab.entity) {
      switch (tab.entity.type) {
        case 'group':
          return <MessageSquare className="w-3 h-3 text-blue-600" />;
        case 'community':
          return <Building2 className="w-3 h-3 text-purple-600" />;
        case 'user':
          return <User className="w-3 h-3 text-green-600" />;
        default:
          return <MessageSquare className="w-3 h-3 text-gray-600" />;
      }
    }
    
    return <MessageSquare className="w-3 h-3 text-gray-600" />;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-2">
      <div className="flex items-center gap-1">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => onTabClick(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-black border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {getTabIcon(tab)}
              <span>{tab.label}</span>
            </button>
            
            {tab.canClose && (
              <button
                onClick={() => onTabClose(tab.id)}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                title="Close tab"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            
            {/* Separator line between tabs */}
            {index < tabs.length - 1 && (
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 