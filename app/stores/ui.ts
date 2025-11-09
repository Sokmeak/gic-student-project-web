import { defineStore } from "pinia";

// Types
export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "project"
  | "approval"
  | "comment";
export type ThemeType = "dark" | "light";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  duration?: number;
  read?: boolean;
  action?: string;
}

export interface UiModals {
  filterPanel: boolean;
  projectCreate: boolean;
  projectEdit: boolean;
  studentProfile: boolean;
}

export interface UiState {
  isLoading: boolean;
  loadingMessage: string;
  modals: UiModals;
  notifications: Notification[];
  theme: ThemeType;
  sidebarOpen: boolean;
  searchActive: boolean;
  searchQuery: string;
}

/**
 * UI Store - Global UI state management
 * Handles UI state like loading, modals, notifications, etc.
 */
export const useUiStore = defineStore("ui", {
  state: (): UiState => ({
    // Loading states
    isLoading: false,
    loadingMessage: "",

    // Modal states
    modals: {
      filterPanel: false,
      projectCreate: false,
      projectEdit: false,
      studentProfile: false,
    },

    // Notification states
    notifications: [],

    // Theme
    theme: "dark",

    // Sidebar
    sidebarOpen: false,

    // Search
    searchActive: false,
    searchQuery: "",
  }),

  getters: {
    hasNotifications: (state: UiState): boolean =>
      state.notifications.length > 0,

    hasActiveModals: (state: UiState): boolean =>
      Object.values(state.modals).some((v: boolean) => v),
  },

  actions: {
    // Loading actions
    setLoading(isLoading: boolean, message: string = ""): void {
      this.isLoading = isLoading;
      this.loadingMessage = message;
    },

    // Modal actions
    openModal(modalName: keyof UiModals): void {
      if (modalName in this.modals) {
        this.modals[modalName] = true;
      }
    },

    closeModal(modalName: keyof UiModals): void {
      if (modalName in this.modals) {
        this.modals[modalName] = false;
      }
    },

    toggleModal(modalName: keyof UiModals): void {
      if (modalName in this.modals) {
        this.modals[modalName] = !this.modals[modalName];
      }
    },

    closeAllModals(): void {
      Object.keys(this.modals).forEach((key) => {
        this.modals[key as keyof UiModals] = false;
      });
    },

    // Notification actions
    addNotification(notification: Partial<Notification>): number {
      const id = Date.now();
      const defaultNotification: Notification = {
        id,
        title: "Notification",
        message: "",
        type: "info", // info, success, warning, error, project, approval, comment
        timestamp: new Date().toISOString(),
        duration: 3000,
        ...notification,
      } as Notification;
      this.notifications.push(defaultNotification);

      if (defaultNotification.duration && defaultNotification.duration > 0) {
        setTimeout(() => {
          this.removeNotification(id);
        }, defaultNotification.duration);
      }

      return id;
    },

    removeNotification(id: number): void {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },

    // Search actions
    setSearchActive(active: boolean): void {
      this.searchActive = active;
    },

    setSearchQuery(query: string): void {
      this.searchQuery = query;
    },

    clearSearch(): void {
      this.searchQuery = "";
      this.searchActive = false;
    },

    // Theme actions
    toggleTheme(): void {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },

    setTheme(theme: ThemeType): void {
      this.theme = theme;
    },
  },
});
