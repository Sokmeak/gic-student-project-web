<template>
  <div class="relative" ref="buttonRef">
    <!-- Bell Icon with Badge -->
    <button
      class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      :aria-label="`${notifications.length} notifications`"
      @click="dropdownOpen = !dropdownOpen"
    >
      <UIcon name="i-heroicons-bell-20-solid" class="w-5 h-5" />

      <!-- Badge -->
      <span
        v-if="notifications.length > 0"
        class="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-red-500 rounded-full"
      >
        {{ notifications.length > 9 ? "9+" : notifications.length }}
      </span>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="dropdownOpen"
        class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200"
      >
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-900">Notifications</h3>
            <button
              v-if="notifications.length > 0"
              class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              @click="clearAllNotifications"
            >
              Clear All
            </button>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          <div
            v-if="notifications.length === 0"
            class="px-4 py-8 text-center text-gray-500"
          >
            <UIcon
              name="i-heroicons-inbox-20-solid"
              class="w-8 h-8 mx-auto mb-2 text-gray-400"
            />
            <p class="text-sm">No notifications yet</p>
          </div>

          <button
            v-for="notification in notifications"
            :key="notification.id"
            class="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left group/item"
            @click="handleNotificationClick(notification)"
          >
            <div class="flex gap-3">
              <!-- Icon -->
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                :class="getNotificationIconClass(notification.type)"
              >
                <UIcon
                  :name="getNotificationIcon(notification.type)"
                  class="w-4 h-4"
                />
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 group-hover/item:text-gray-700"
                >
                  {{ notification.title }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-400 mt-1">
                  {{ formatTime(notification.timestamp) }}
                </p>
              </div>

              <!-- Close button -->
              <button
                class="flex-shrink-0 text-gray-400 hover:text-gray-600 opacity-0 group-hover/item:opacity-100 transition-opacity"
                @click.stop="removeNotification(notification.id)"
              >
                <UIcon name="i-heroicons-x-mark-20-solid" class="w-4 h-4" />
              </button>
            </div>
          </button>
        </div>

        <!-- Footer -->
        <div class="px-4 py-3 border-t border-gray-200 text-center">
          <NuxtLink
            to="/notifications"
            class="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All Notifications
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <div
      v-if="dropdownOpen"
      class="fixed inset-0 z-40"
      @click="dropdownOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type:
    | "success"
    | "error"
    | "warning"
    | "info"
    | "project"
    | "approval"
    | "comment";
  timestamp: string;
  duration?: number;
  read?: boolean;
  action?: string;
}

interface Props {
  notifications?: NotificationItem[];
}

const props = withDefaults(defineProps<Props>(), {
  notifications: () => [],
});

const emit = defineEmits<{
  "notification-click": [notification: NotificationItem];
  remove: [id: number];
  "clear-all": [];
}>();

const dropdownOpen = ref(false);
const buttonRef = ref<HTMLElement | null>(null);

const getNotificationIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    success: "i-heroicons-check-circle-20-solid",
    error: "i-heroicons-exclamation-circle-20-solid",
    warning: "i-heroicons-exclamation-triangle-20-solid",
    info: "i-heroicons-information-circle-20-solid",
    project: "i-heroicons-document-20-solid",
    approval: "i-heroicons-check-badge-20-solid",
    comment: "i-heroicons-chat-bubble-left-20-solid",
  };
  return iconMap[type] || "i-heroicons-bell-20-solid";
};

const getNotificationIconClass = (type: string): string => {
  const classMap: Record<string, string> = {
    success: "bg-green-100 text-green-600",
    error: "bg-red-100 text-red-600",
    warning: "bg-yellow-100 text-yellow-600",
    info: "bg-blue-100 text-blue-600",
    project: "bg-purple-100 text-purple-600",
    approval: "bg-emerald-100 text-emerald-600",
    comment: "bg-indigo-100 text-indigo-600",
  };
  return classMap[type] || "bg-gray-100 text-gray-600";
};

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const handleNotificationClick = (notification: NotificationItem) => {
  emit("notification-click", notification);
  dropdownOpen.value = false;
};

const removeNotification = (id: number) => {
  emit("remove", id);
};

const clearAllNotifications = () => {
  emit("clear-all");
};
</script>
