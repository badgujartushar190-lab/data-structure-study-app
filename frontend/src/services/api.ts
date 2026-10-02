import axios from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface Chapter {
  id: string;
  order: number;
  title: string;
  description: string;
  topics?: Topic[];
}

export interface Topic {
  id: string;
  chapterId: string;
  title: string;
  content: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  service: string;
  database: string;
}

export const dsaApi = {
  getHealth: async (): Promise<HealthCheckResponse> => {
    const res = await apiClient.get<HealthCheckResponse>('/health');
    return res.data;
  },

  getChapters: async (): Promise<Chapter[]> => {
    const res = await apiClient.get<{ success: boolean; data: Chapter[] }>('/chapters');
    return res.data.data;
  },

  getChapterById: async (id: string): Promise<Chapter> => {
    const res = await apiClient.get<{ success: boolean; data: Chapter }>(`/chapters/${id}`);
    return res.data.data;
  },

  getTopics: async (): Promise<Topic[]> => {
    const res = await apiClient.get<{ success: boolean; data: Topic[] }>('/topics');
    return res.data.data;
  },

  getTopicById: async (id: string): Promise<Topic> => {
    const res = await apiClient.get<{ success: boolean; data: Topic }>(`/topics/${id}`);
    return res.data.data;
  },

  getTopicsByChapter: async (chapterId: string): Promise<Topic[]> => {
    const res = await apiClient.get<{ success: boolean; data: Topic[] }>(`/topics/chapter/${chapterId}`);
    return res.data.data;
  }
};

export default dsaApi;
