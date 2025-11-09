import { defineStore } from "pinia";
import type { ComputedRef } from "vue";

// Types
export interface ProjectAuthor {
  name: string;
  avatar: string;
  program: string;
  year: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  semester: string;
  author: ProjectAuthor;
  technologies: string[];
  category: string;
  status: "Completed" | "In Progress";
  featured: boolean;
  likes: number;
  views: number;
  demoUrl: string;
  githubUrl: string;
  thumbnail: string;
  createdAt: string;
  tags: string[];
  members?: string[];
  roadmap?: string[];
  duration?: string;
  course?: string;
  rating?: string;
  gradient?: string;
  emoji?: string;
}

export interface ProjectFilters {
  category: string;
  semester: string;
  search: string;
  sortBy: "newest" | "oldest" | "popular" | "views" | "alphabetical";
}

export interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
  totalLikes: number;
  totalViews: number;
}

export interface ProjectState {
  projects: Project[];
  categories: string[];
  semesters: string[];
  filters: ProjectFilters;
  loading: boolean;
}

export const useProjectStore = defineStore("projects", {
  state: (): ProjectState => ({
    projects: [
      {
        id: 1,
        title: "AI Study Assistant",
        description:
          "Machine learning application that helps students optimize their study schedules using advanced algorithms and personalized learning patterns.",
        semester: "Fall 2024",
        author: {
          name: "Sarah Chen",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=100&h=100&fit=crop&crop=face",
          program: "Computer Science",
          year: "4th Year",
        },
        technologies: ["Python", "TensorFlow", "React", "MongoDB", "Docker"],
        category: "Artificial Intelligence",
        status: "Completed",
        featured: true,
        likes: 245,
        views: 1842,
        demoUrl: "https://ai-study-assistant.demo.com",
        githubUrl: "https://github.com/sarahchen/ai-study-assistant",
        thumbnail:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
        createdAt: "2024-10-15",
        tags: ["machine-learning", "education", "productivity"],
        members: ["Sarah Chen", "Alex Park", "Jordan Lee", "Emma Davis"],
        roadmap: [
          "Phase 1: GPT-3 Integration",
          "Phase 2: Conversation History",
          "Phase 3: Multi-language Support",
          "Phase 4: Production Deployment",
        ],
        duration: "3 months",
        course: "Advanced AI & Machine Learning",
        rating: "4.8",
        emoji: "🤖",
        gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
      },
      {
        id: 2,
        title: "Campus Navigator AR",
        description:
          "Augmented reality mobile application that helps students and visitors navigate the campus efficiently with real-time directions and points of interest.",
        semester: "Fall 2024",
        author: {
          name: "Marcus Johnson",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          program: "Software Engineering",
          year: "3rd Year",
        },
        technologies: ["Unity", "ARCore", "C#", "Firebase", "Google Maps API"],
        category: "Mobile Development",
        status: "In Progress",
        featured: true,
        likes: 189,
        views: 1337,
        demoUrl: "https://campus-navigator.demo.com",
        githubUrl: "https://github.com/mjohnson/campus-navigator",
        thumbnail:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
        createdAt: "2024-09-22",
        tags: ["augmented-reality", "navigation", "mobile"],
        members: ["Marcus Johnson", "Maria Garcia", "Sam Wilson"],
        emoji: "💪",
        gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      },
      {
        id: 3,
        title: "Sustainability Tracker",
        description:
          "Comprehensive platform for tracking and analyzing campus environmental impact with real-time monitoring and actionable insights for sustainability.",
        semester: "Summer 2024",
        author: {
          name: "Emily Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          program: "Environmental Science",
          year: "4th Year",
        },
        technologies: [
          "Vue.js",
          "Node.js",
          "PostgreSQL",
          "Chart.js",
          "IoT Sensors",
        ],
        category: "Environmental Tech",
        status: "Completed",
        featured: false,
        likes: 156,
        views: 892,
        demoUrl: "https://sustainability-tracker.demo.com",
        githubUrl: "https://github.com/erodriguez/sustainability-tracker",
        thumbnail:
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
        createdAt: "2024-08-10",
        tags: ["sustainability", "environment", "data-visualization"],
        emoji: "🌍",
        gradient: "bg-gradient-to-br from-teal-500 to-green-600",
      },
      {
        id: 4,
        title: "Smart Library System",
        description:
          "Digital library management system with AI-powered book recommendations, automated inventory tracking, and seamless user experience.",
        semester: "Spring 2024",
        author: {
          name: "David Kim",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          program: "Information Systems",
          year: "3rd Year",
        },
        technologies: [
          "Angular",
          "Spring Boot",
          "MySQL",
          "ElasticSearch",
          "Docker",
        ],
        category: "Information Systems",
        status: "Completed",
        featured: false,
        likes: 203,
        views: 1456,
        demoUrl: "https://smart-library.demo.com",
        githubUrl: "https://github.com/dkim/smart-library",
        thumbnail:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
        createdAt: "2024-05-20",
        tags: ["library", "ai-recommendations", "management-system"],
        emoji: "📚",
        gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
      },
      {
        id: 5,
        title: "Health & Wellness Dashboard",
        description:
          "Student wellness tracking application with mental health resources, fitness goals, and peer support community features.",
        semester: "Spring 2024",
        author: {
          name: "Aisha Patel",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
          program: "Health Informatics",
          year: "4th Year",
        },
        technologies: [
          "React Native",
          "Express.js",
          "MongoDB",
          "Socket.io",
          "Chart.js",
        ],
        category: "Health Tech",
        status: "Completed",
        featured: true,
        likes: 287,
        views: 2156,
        demoUrl: "https://wellness-dashboard.demo.com",
        githubUrl: "https://github.com/apatel/wellness-dashboard",
        thumbnail:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
        createdAt: "2024-04-15",
        tags: ["health", "wellness", "community", "mental-health"],
        emoji: "💚",
        gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
      },
      {
        id: 6,
        title: "Blockchain Voting System",
        description:
          "Secure and transparent student government voting platform built on blockchain technology ensuring tamper-proof elections.",
        semester: "Fall 2023",
        author: {
          name: "Alex Thompson",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
          program: "Cybersecurity",
          year: "4th Year",
        },
        technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
        category: "Blockchain",
        status: "Completed",
        featured: false,
        likes: 178,
        views: 1234,
        demoUrl: "https://blockchain-voting.demo.com",
        githubUrl: "https://github.com/athompson/blockchain-voting",
        thumbnail:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
        createdAt: "2023-11-08",
        tags: ["blockchain", "voting", "security", "ethereum"],
        emoji: "⛓️",
        gradient: "bg-gradient-to-br from-orange-500 to-red-600",
      },
    ],
    categories: [
      "All",
      "Artificial Intelligence",
      "Mobile Development",
      "Environmental Tech",
      "Information Systems",
      "Health Tech",
      "Blockchain",
      "Web Development",
      "Data Science",
    ],
    semesters: [
      "All",
      "Fall 2024",
      "Summer 2024",
      "Spring 2024",
      "Fall 2023",
      "Summer 2023",
    ],
    filters: {
      category: "All",
      semester: "All",
      search: "",
      sortBy: "newest",
    },
    loading: false,
  }),

  getters: {
    filteredProjects(): Project[] {
      let filtered = [...this.projects];

      // Apply category filter
      if (this.filters.category !== "All") {
        filtered = filtered.filter(
          (project) => project.category === this.filters.category
        );
      }

      // Apply semester filter
      if (this.filters.semester !== "All") {
        filtered = filtered.filter(
          (project) => project.semester === this.filters.semester
        );
      }

      // Apply search filter
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase();
        filtered = filtered.filter(
          (project) =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.author.name.toLowerCase().includes(searchTerm) ||
            project.technologies.some((tech) =>
              tech.toLowerCase().includes(searchTerm)
            ) ||
            project.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
      }

      // Apply sorting
      switch (this.filters.sortBy) {
        case "newest":
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "oldest":
          filtered.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "popular":
          filtered.sort((a, b) => b.likes - a.likes);
          break;
        case "views":
          filtered.sort((a, b) => b.views - a.views);
          break;
        case "alphabetical":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }

      return filtered;
    },

    featuredProjects(): Project[] {
      return this.projects.filter((project) => project.featured);
    },

    projectsByCategory(): Record<string, Project[]> {
      const categoryMap: Record<string, Project[]> = {};
      this.projects.forEach((project) => {
        if (!categoryMap[project.category]) {
          categoryMap[project.category] = [];
        }
        categoryMap[project.category].push(project);
      });
      return categoryMap;
    },

    projectStats(): ProjectStats {
      return {
        total: this.projects.length,
        completed: this.projects.filter((p) => p.status === "Completed").length,
        inProgress: this.projects.filter((p) => p.status === "In Progress")
          .length,
        totalLikes: this.projects.reduce((sum, p) => sum + p.likes, 0),
        totalViews: this.projects.reduce((sum, p) => sum + p.views, 0),
      };
    },
  },

  actions: {
    setFilter(filterType: keyof ProjectFilters, value: string | number): void {
      this.filters[filterType] = value as never;
    },

    clearFilters(): void {
      this.filters = {
        category: "All",
        semester: "All",
        search: "",
        sortBy: "newest",
      };
    },

    async likeProject(projectId: number): Promise<void> {
      const project = this.projects.find((p) => p.id === projectId);
      if (project) {
        project.likes++;
      }
    },

    async incrementViews(projectId: number): Promise<void> {
      const project = this.projects.find((p) => p.id === projectId);
      if (project) {
        project.views++;
      }
    },

    getProject(id: number | string): Project | undefined {
      return this.projects.find(
        (project) => project.id === Number.parseInt(id.toString())
      );
    },

    getProjectsByAuthor(authorName: string): Project[] {
      return this.projects.filter((project) =>
        project.author.name.toLowerCase().includes(authorName.toLowerCase())
      );
    },
  },
});
