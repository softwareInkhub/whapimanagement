'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart,
  LineChart,
  Activity,
  Target,
  Users,
  DollarSign
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'analytics' | 'performance' | 'financial' | 'team';
  status: 'completed' | 'in-progress' | 'scheduled';
  lastUpdated: string;
  size: string;
  format: 'pdf' | 'excel' | 'csv';
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Q4 Project Performance Report',
    type: 'performance',
    status: 'completed',
    lastUpdated: '2024-01-15',
    size: '2.4 MB',
    format: 'pdf'
  },
  {
    id: '2',
    title: 'Team Productivity Analytics',
    type: 'analytics',
    status: 'completed',
    lastUpdated: '2024-01-14',
    size: '1.8 MB',
    format: 'excel'
  },
  {
    id: '3',
    title: 'Financial Summary Q4',
    type: 'financial',
    status: 'in-progress',
    lastUpdated: '2024-01-13',
    size: '3.2 MB',
    format: 'pdf'
  },
  {
    id: '4',
    title: 'Team Capacity Report',
    type: 'team',
    status: 'scheduled',
    lastUpdated: '2024-01-12',
    size: '1.5 MB',
    format: 'csv'
  }
];

const reportTypes = {
  analytics: { icon: BarChart2, color: 'bg-blue-100 text-blue-700' },
  performance: { icon: TrendingUp, color: 'bg-green-100 text-green-700' },
  financial: { icon: DollarSign, color: 'bg-purple-100 text-purple-700' },
  team: { icon: Users, color: 'bg-orange-100 text-orange-700' }
};

const statusColors = {
  completed: 'bg-green-100 text-green-700',
  'in-progress': 'bg-yellow-100 text-yellow-700',
  scheduled: 'bg-slate-100 text-slate-700'
};

export default function ReportsPage({ onOpenTab }: { onOpenTab?: (tabType: string, context?: any) => void }) {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const analytics = {
    totalReports: reports.length,
    completedReports: reports.filter(r => r.status === 'completed').length,
    inProgressReports: reports.filter(r => r.status === 'in-progress').length,
    scheduledReports: reports.filter(r => r.status === 'scheduled').length
  };

  const filteredReports = reports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleDownload = (report: Report) => {
    console.log(`Downloading ${report.title}`);
    // In a real app, this would trigger a download
  };

  const handleDelete = (reportId: string) => {
    setReports(reports.filter(r => r.id !== reportId));
  };

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Reports</h1>
            <p className="text-sm text-slate-500 mt-1">Generate and manage project reports</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <FileText size={16} />
              <span>New Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center mr-3">
              <FileText className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.totalReports}</h3>
              <p className="text-xs text-slate-500">Total Reports</p>
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-green-50 rounded-md flex items-center justify-center mr-3">
              <TrendingUp className="w-3 h-3 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.completedReports}</h3>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-yellow-50 rounded-md flex items-center justify-center mr-3">
              <Activity className="w-3 h-3 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.inProgressReports}</h3>
              <p className="text-xs text-slate-500">In Progress</p>
            </div>
          </div>

          <div className="bg-white rounded-md border border-slate-200 p-2.5 h-20 flex items-center">
            <div className="w-6 h-6 bg-slate-50 rounded-md flex items-center justify-center mr-3">
              <Calendar className="w-3 h-3 text-slate-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{analytics.scheduledReports}</h3>
              <p className="text-xs text-slate-500">Scheduled</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="analytics">Analytics</option>
              <option value="performance">Performance</option>
              <option value="financial">Financial</option>
              <option value="team">Team</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const TypeIcon = reportTypes[report.type as keyof typeof reportTypes]?.icon || FileText;
            const typeColor = reportTypes[report.type as keyof typeof reportTypes]?.color || 'bg-slate-100 text-slate-700';
            
            return (
              <div
                key={report.id}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColor}`}>
                      <TypeIcon size={20} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-slate-900">{report.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                        <span className={`px-2 py-1 rounded text-xs ${statusColors[report.status as keyof typeof statusColors]}`}>
                          {report.status}
                        </span>
                        <span>{report.size}</span>
                        <span className="uppercase">{report.format}</span>
                        <span>Updated {report.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(report)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <TrendingDown size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No reports found</h3>
            <p className="text-slate-500">Try adjusting your filters or create a new report</p>
          </div>
        )}
      </div>
    </div>
  );
} 