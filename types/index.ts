export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
  university?: string;
  department?: string;
  bio?: string;
  skills?: string[];
  projects_count?: number;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher";
  university?: string;
  department?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  technologies: string[];
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
  method: string;
}
