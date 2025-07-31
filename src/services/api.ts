import { Group, Team, Project, CreateTeamRequest, CreateProjectRequest } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Groups API
  async getGroups(): Promise<Group[]> {
    const response = await this.request<Group[]>('/groups');
    return response.success ? response.data! : [];
  }

  async createGroup(groupData: {
    name: string;
    description?: string;
    whatsappGroupId: string;
    whatsappGroupName: string;
  }): Promise<Group | null> {
    const response = await this.request<Group>('/groups', {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
    return response.success ? response.data! : null;
  }

  async getGroup(id: string): Promise<Group | null> {
    const response = await this.request<Group>(`/groups/${id}`);
    return response.success ? response.data! : null;
  }

  async updateGroup(id: string, groupData: Partial<Group>): Promise<Group | null> {
    const response = await this.request<Group>(`/groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(groupData),
    });
    return response.success ? response.data! : null;
  }

  async deleteGroup(id: string): Promise<boolean> {
    const response = await this.request(`/groups/${id}`, {
      method: 'DELETE',
    });
    return response.success;
  }

  // Teams API
  async getTeams(): Promise<Team[]> {
    const response = await this.request<Team[]>('/teams');
    return response.success ? response.data! : [];
  }

  async createTeam(teamData: CreateTeamRequest): Promise<Team | null> {
    const response = await this.request<Team>('/teams', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
    return response.success ? response.data! : null;
  }

  async getTeam(id: string): Promise<Team | null> {
    const response = await this.request<Team>(`/teams/${id}`);
    return response.success ? response.data! : null;
  }

  async updateTeam(id: string, teamData: Partial<Team>): Promise<Team | null> {
    const response = await this.request<Team>(`/teams/${id}`, {
      method: 'PUT',
      body: JSON.stringify(teamData),
    });
    return response.success ? response.data! : null;
  }

  async deleteTeam(id: string): Promise<boolean> {
    const response = await this.request(`/teams/${id}`, {
      method: 'DELETE',
    });
    return response.success;
  }

  // Projects API
  async getProjects(): Promise<Project[]> {
    const response = await this.request<Project[]>('/projects');
    return response.success ? response.data! : [];
  }

  async createProject(projectData: CreateProjectRequest): Promise<Project | null> {
    const response = await this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
    return response.success ? response.data! : null;
  }

  async getProject(id: string): Promise<Project | null> {
    const response = await this.request<Project>(`/projects/${id}`);
    return response.success ? response.data! : null;
  }

  async updateProject(id: string, projectData: Partial<Project>): Promise<Project | null> {
    const response = await this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
    return response.success ? response.data! : null;
  }

  async deleteProject(id: string): Promise<boolean> {
    const response = await this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
    return response.success;
  }
}

export const apiService = new ApiService(); 