"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Target,
  Zap,
  Globe,
  Smartphone,
  Mail,
  Phone,
  Video,
  FileText,
  Image,
  Play,
  Volume2,
  Star,
  Heart,
  Eye,
  Share2,
  Download,
  Upload,
  Filter,
  Search,
  RefreshCw,
  Settings,
  MoreVertical,
  Building2
} from "lucide-react";

interface AnalyticsData {
  totalGroups: number;
  totalCommunities: number;
  totalUsers: number;
  activeUsers: number;
  messagesSent: number;
  messagesDelivered: number;
  messagesRead: number;
  messagesFailed: number;
  responseRate: number;
  avgResponseTime: number;
  topGroups: Array<{ name: string; members: number; messages: number; growth: number }>;
  topUsers: Array<{ name: string; messages: number; responseRate: number; status: string }>;
  messageTrends: Array<{ date: string; sent: number; delivered: number; read: number }>;
  deviceUsage: Array<{ device: string; percentage: number }>;
  messageTypes: Array<{ type: string; count: number; percentage: number }>;
}

export default function WhapiAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    totalGroups: 24,
    totalCommunities: 8,
    totalUsers: 156,
    activeUsers: 89,
    messagesSent: 1247,
    messagesDelivered: 1198,
    messagesRead: 1089,
    messagesFailed: 49,
    responseRate: 87.3,
    avgResponseTime: 2.4,
    topGroups: [
      { name: "Development Team", members: 12, messages: 234, growth: 15.2 },
      { name: "Marketing Team", members: 8, messages: 189, growth: 8.7 },
      { name: "Sales Team", members: 15, messages: 156, growth: 12.4 },
      { name: "Support Team", members: 10, messages: 98, growth: -2.1 }
    ],
    topUsers: [
      { name: "John Doe", messages: 45, responseRate: 94.2, status: "online" },
      { name: "Jane Smith", messages: 38, responseRate: 89.5, status: "online" },
      { name: "Mike Johnson", messages: 32, responseRate: 76.8, status: "offline" },
      { name: "Sarah Wilson", messages: 28, responseRate: 91.3, status: "online" }
    ],
    messageTrends: [
      { date: "Mon", sent: 45, delivered: 42, read: 38 },
      { date: "Tue", sent: 52, delivered: 49, read: 44 },
      { date: "Wed", sent: 38, delivered: 36, read: 32 },
      { date: "Thu", sent: 61, delivered: 58, read: 52 },
      { date: "Fri", sent: 48, delivered: 45, read: 41 },
      { date: "Sat", sent: 32, delivered: 30, read: 26 },
      { date: "Sun", sent: 28, delivered: 26, read: 23 }
    ],
    deviceUsage: [
      { device: "Mobile", percentage: 68 },
      { device: "Desktop", percentage: 24 },
      { device: "Tablet", percentage: 8 }
    ],
    messageTypes: [
      { type: "Text", count: 892, percentage: 71.5 },
      { type: "Media", count: 234, percentage: 18.8 },
      { type: "Documents", count: 89, percentage: 7.1 },
      { type: "Voice", count: 32, percentage: 2.6 }
    ]
  };

  const getMetricCard = (title: string, value: string | number, change?: number, icon?: React.ReactNode) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-blue-100 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-gray-400';
      case 'away': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
            <p className="text-sm text-gray-500">Monitor your WhatsApp management performance</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getMetricCard(
              "Total Messages",
              analyticsData.messagesSent.toLocaleString(),
              12.5,
              <MessageSquare className="w-6 h-6 text-blue-600" />
            )}
            {getMetricCard(
              "Delivery Rate",
              `${((analyticsData.messagesDelivered / analyticsData.messagesSent) * 100).toFixed(1)}%`,
              2.1,
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
            {getMetricCard(
              "Response Rate",
              `${analyticsData.responseRate}%`,
              -1.8,
              <Users className="w-6 h-6 text-purple-600" />
            )}
            {getMetricCard(
              "Avg Response Time",
              `${analyticsData.avgResponseTime}h`,
              -0.5,
              <Clock className="w-6 h-6 text-orange-600" />
            )}
          </div>

          {/* Message Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Delivered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.messagesDelivered}</span>
                    <span className="text-xs text-gray-500">
                      ({((analyticsData.messagesDelivered / analyticsData.messagesSent) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.messagesRead}</span>
                    <span className="text-xs text-gray-500">
                      ({((analyticsData.messagesRead / analyticsData.messagesSent) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Failed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{analyticsData.messagesFailed}</span>
                    <span className="text-xs text-gray-500">
                      ({((analyticsData.messagesFailed / analyticsData.messagesSent) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Types</h3>
              <div className="space-y-4">
                {analyticsData.messageTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{type.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{type.count}</span>
                      <span className="text-xs text-gray-500">({type.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Groups and Users */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Groups</h3>
              <div className="space-y-4">
                {analyticsData.topGroups.map((group, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{group.name}</span>
                        <span className="text-xs text-gray-500">({group.members} members)</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{group.messages} messages</span>
                        <div className="flex items-center gap-1">
                          {group.growth >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          <span className={`text-xs ${group.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.abs(group.growth)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Users</h3>
              <div className="space-y-4">
                {analyticsData.topUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{user.messages} messages</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{user.responseRate}% response</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Trends Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Trends</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {analyticsData.messageTrends.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col gap-1 mb-2">
                    <div 
                      className="bg-green-500 rounded-t"
                      style={{ height: `${(day.read / 61) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-blue-500"
                      style={{ height: `${(day.delivered / 61) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-gray-400 rounded-b"
                      style={{ height: `${(day.sent / 61) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{day.date}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
                <span className="text-xs text-gray-600">Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs text-gray-600">Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs text-gray-600">Read</span>
              </div>
            </div>
          </div>

          {/* Device Usage and Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
              <div className="space-y-4">
                {analyticsData.deviceUsage.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{device.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{device.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalUsers}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.activeUsers}</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalGroups}</p>
                  <p className="text-sm text-gray-600">Groups</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Building2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCommunities}</p>
                  <p className="text-sm text-gray-600">Communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 