import { useUiStore } from "~/stores/ui";

export interface NotificationOptions {
  title: string;
  message: string;
  type?:
    | "success"
    | "error"
    | "warning"
    | "info"
    | "project"
    | "approval"
    | "comment";
  duration?: number;
}

/**
 * Composable for managing notifications
 * Provides convenient methods to create different types of notifications
 */
export const useNotifications = () => {
  const uiStore = useUiStore();

  const addNotification = (options: NotificationOptions): number => {
    const type = options.type || "info";
    const duration = options.duration !== undefined ? options.duration : 4000;

    return uiStore.addNotification({
      title: options.title,
      message: options.message,
      type: type as any,
      duration,
      timestamp: new Date().toISOString(),
    } as any);
  };

  const notifySuccess = (
    title: string,
    message: string,
    duration?: number
  ): number => {
    return addNotification({ title, message, type: "success", duration });
  };

  const notifyError = (
    title: string,
    message: string,
    duration?: number
  ): number => {
    return addNotification({ title, message, type: "error", duration });
  };

  const notifyWarning = (
    title: string,
    message: string,
    duration?: number
  ): number => {
    return addNotification({ title, message, type: "warning", duration });
  };

  const notifyInfo = (
    title: string,
    message: string,
    duration?: number
  ): number => {
    return addNotification({ title, message, type: "info", duration });
  };

  // Project-specific notifications
  const notifyProjectApproved = (projectTitle: string): number => {
    return addNotification({
      title: "Project Approved",
      message: `Your project "${projectTitle}" has been approved by your teacher.`,
      type: "approval",
      duration: 5000,
    });
  };

  const notifyProjectRejected = (
    projectTitle: string,
    reason?: string
  ): number => {
    return addNotification({
      title: "Project Needs Revision",
      message:
        reason ||
        `Your project "${projectTitle}" needs revision. Please check feedback from your teacher.`,
      type: "error",
      duration: 5000,
    });
  };

  const notifyProjectSubmitted = (projectTitle: string): number => {
    return addNotification({
      title: "Project Submitted",
      message: `Your project "${projectTitle}" has been submitted successfully.`,
      type: "project",
      duration: 4000,
    });
  };

  const notifyProjectCommentReceived = (
    projectTitle: string,
    commenterName: string
  ): number => {
    return addNotification({
      title: "New Comment",
      message: `${commenterName} commented on your project "${projectTitle}".`,
      type: "comment",
      duration: 5000,
    });
  };

  const notifyStudentSubmitted = (
    studentName: string,
    projectTitle: string
  ): number => {
    return addNotification({
      title: "New Submission",
      message: `${studentName} submitted "${projectTitle}".`,
      type: "project",
      duration: 4000,
    });
  };

  const notifyTeacherFeedback = (
    teacherName: string,
    projectTitle: string
  ): number => {
    return addNotification({
      title: "Feedback Received",
      message: `${teacherName} provided feedback on "${projectTitle}".`,
      type: "approval",
      duration: 5000,
    });
  };

  return {
    addNotification,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyProjectApproved,
    notifyProjectRejected,
    notifyProjectSubmitted,
    notifyProjectCommentReceived,
    notifyStudentSubmitted,
    notifyTeacherFeedback,
  };
};
