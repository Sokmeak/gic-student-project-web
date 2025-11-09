import { defineStore } from "pinia";

// Types
export interface ViewHistoryEntry {
  projectId: number;
  timestamp: string;
}

export interface UserInteractions {
  likedProjects: Set<number>;
  viewedProjects: Set<number>;
  ratedProjects: Record<number, number>;
  followedStudents: Set<number>;
  savedProjects: Set<number>;
}

export interface ProjectStat {
  views: number;
  likes: number;
  averageRating: number;
  ratingCount: number;
}

export interface AnalyticsState {
  userInteractions: UserInteractions;
  projectStats: Record<number, ProjectStat>;
  viewHistory: ViewHistoryEntry[];
}

/**
 * Analytics Store - Track user interactions and analytics
 * Handles likes, views, ratings, and user interactions
 */
export const useAnalyticsStore = defineStore("analytics", {
  state: (): AnalyticsState => ({
    // User interactions
    userInteractions: {
      likedProjects: new Set(),
      viewedProjects: new Set(),
      ratedProjects: {},
      followedStudents: new Set(),
      savedProjects: new Set(),
    },

    // Project statistics
    projectStats: {},

    // View history
    viewHistory: [],
  }),

  getters: {
    isProjectLiked:
      (state: AnalyticsState) =>
      (projectId: number): boolean => {
        return state.userInteractions.likedProjects.has(projectId);
      },

    isProjectViewed:
      (state: AnalyticsState) =>
      (projectId: number): boolean => {
        return state.userInteractions.viewedProjects.has(projectId);
      },

    getProjectRating:
      (state: AnalyticsState) =>
      (projectId: number): number => {
        return state.userInteractions.ratedProjects[projectId] || 0;
      },

    isStudentFollowed:
      (state: AnalyticsState) =>
      (studentId: number): boolean => {
        return state.userInteractions.followedStudents.has(studentId);
      },

    isProjectSaved:
      (state: AnalyticsState) =>
      (projectId: number): boolean => {
        return state.userInteractions.savedProjects.has(projectId);
      },

    likedProjectsCount: (state: AnalyticsState): number =>
      state.userInteractions.likedProjects.size,

    followedStudentsCount: (state: AnalyticsState): number =>
      state.userInteractions.followedStudents.size,

    savedProjectsCount: (state: AnalyticsState): number =>
      state.userInteractions.savedProjects.size,

    viewHistoryCount: (state: AnalyticsState): number =>
      state.viewHistory.length,
  },

  actions: {
    // Like actions
    toggleLikeProject(projectId: number): boolean {
      if (this.userInteractions.likedProjects.has(projectId)) {
        this.userInteractions.likedProjects.delete(projectId);
        return false;
      } else {
        this.userInteractions.likedProjects.add(projectId);
        return true;
      }
    },

    likeProject(projectId: number): void {
      this.userInteractions.likedProjects.add(projectId);
    },

    unlikeProject(projectId: number): void {
      this.userInteractions.likedProjects.delete(projectId);
    },

    // View actions
    recordProjectView(projectId: number): void {
      this.userInteractions.viewedProjects.add(projectId);
      this.viewHistory.push({
        projectId,
        timestamp: new Date().toISOString(),
      });

      // Keep only last 50 views
      if (this.viewHistory.length > 50) {
        this.viewHistory.shift();
      }
    },

    // Rating actions
    rateProject(projectId: number, rating: number): void {
      if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      this.userInteractions.ratedProjects[projectId] = rating;
    },

    // Follow actions
    toggleFollowStudent(studentId: number): boolean {
      if (this.userInteractions.followedStudents.has(studentId)) {
        this.userInteractions.followedStudents.delete(studentId);
        return false;
      } else {
        this.userInteractions.followedStudents.add(studentId);
        return true;
      }
    },

    followStudent(studentId: number): void {
      this.userInteractions.followedStudents.add(studentId);
    },

    unfollowStudent(studentId: number): void {
      this.userInteractions.followedStudents.delete(studentId);
    },

    // Save actions
    toggleSaveProject(projectId: number): boolean {
      if (this.userInteractions.savedProjects.has(projectId)) {
        this.userInteractions.savedProjects.delete(projectId);
        return false;
      } else {
        this.userInteractions.savedProjects.add(projectId);
        return true;
      }
    },

    saveProject(projectId: number): void {
      this.userInteractions.savedProjects.add(projectId);
    },

    unsaveProject(projectId: number): void {
      this.userInteractions.savedProjects.delete(projectId);
    },

    // Statistics actions
    getProjectStats(projectId: number): ProjectStat {
      return (
        this.projectStats[projectId] || {
          views: 0,
          likes: 0,
          averageRating: 0,
          ratingCount: 0,
        }
      );
    },

    updateProjectStats(projectId: number, stats: Partial<ProjectStat>): void {
      if (!this.projectStats[projectId]) {
        this.projectStats[projectId] = {
          views: 0,
          likes: 0,
          averageRating: 0,
          ratingCount: 0,
        };
      }
      this.projectStats[projectId] = {
        ...this.projectStats[projectId],
        ...stats,
      };
    },

    // Clear all interactions
    clearAllInteractions(): void {
      this.userInteractions = {
        likedProjects: new Set(),
        viewedProjects: new Set(),
        ratedProjects: {},
        followedStudents: new Set(),
        savedProjects: new Set(),
      };
      this.viewHistory = [];
      this.projectStats = {};
    },
  },
});
