export interface Group {
  id: string;
  name: string;
  description?: string;
  whatsappGroupId: string;
  whatsappGroupName: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  department: string;
  company: string;
  manager: string;
  whatsappGroupId?: string;
  whatsappGroupName?: string;
  startDate: string;
  teamMembers: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  company: string;
  status: 'active' | 'on-hold' | 'completed';
  teamId?: string;
  startDate: string;
  endDate?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
  status: 'online' | 'away' | 'offline' | 'busy';
  location?: string;
  hireDate?: string;
  salary?: number;
  whatsappNumber?: string;
  timezone?: string;
  skills: string[];
  groups: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamRequest {
  name: string;
  description: string;
  department: string;
  company: string;
  manager: string;
  whatsappGroupId?: string;
  whatsappGroupName?: string;
  startDate: string;
  teamMembers: string[];
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  company: string;
  status: 'active' | 'on-hold' | 'completed';
  teamId?: string;
  startDate: string;
  endDate?: string;
  budget?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 