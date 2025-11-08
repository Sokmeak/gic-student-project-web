<template>
  <nav
    class="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
  >
    <UContainer class="flex items-center justify-between h-16 px-4">
      <!-- Logo Section -->
      <NuxtLink to="/" class="flex items-center space-x-3 group">
        <div
          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
        >
          <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-white" />
        </div>
        <div class="hidden sm:block">
          <span class="text-xl font-bold text-gray-900">GIC</span>
          <span class="text-sm text-gray-600 block leading-3"
            >Student Portal</span
          >
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-8">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
          active-class="text-blue-600"
        >
          {{ item.label }}
          <span
            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"
          ></span>
        </NuxtLink>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:flex flex-1 max-w-md mx-8">
        <div class="relative w-full">
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search projects, students..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            @keyup.enter="handleSearch"
          />
          <div
            v-if="searchQuery"
            class="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <button
              @click="clearSearch"
              class="text-gray-400 hover:text-gray-600"
            >
              <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-4">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          :title="`Switch to ${isDark ? 'light' : 'dark'} mode`"
        >
          <UIcon
            :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            class="w-5 h-5 text-gray-600"
          />
        </button>

        <!-- Notifications -->
        <button
          class="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <UIcon name="i-heroicons-bell" class="w-5 h-5 text-gray-600" />
          <span
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          ></span>
        </button>

        <!-- User Menu -->
        <UDropdown :items="userMenuItems" class="hidden sm:block">
          <UAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="User"
            size="sm"
            class="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          />
        </UDropdown>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <UIcon
            :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="w-6 h-6 text-gray-600"
          />
        </button>
      </div>
    </UContainer>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
    >
      <div class="px-4 py-4 space-y-3">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-medium transition-colors"
          active-class="bg-blue-50 text-blue-600"
        >
          {{ item.label }}
        </NuxtLink>

        <!-- Mobile Search -->
        <div class="px-4 py-2">
          <div class="relative">
            <UIcon
              name="i-heroicons-magnifying-glass"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search projects, students..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="handleSearch"
            />
          </div>
        </div>

        <!-- Mobile User Actions -->
        <div class="px-4 py-2 space-y-2">
          <button
            class="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl"
          >
            Profile Settings
          </button>
          <button
            class="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl"
          >
            My Projects
          </button>
          <button
            class="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useColorMode } from "@vueuse/core";

// State
const searchQuery = ref("");
const mobileMenuOpen = ref(false);
const colorMode = useColorMode();

// Computed
const isDark = computed(() => colorMode.value === "dark");

// Navigation items
const navigationItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Students", to: "/students" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/about" },
];

// User menu items
const userMenuItems = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      click: () => navigateTo("/profile"),
    },
  ],
  [
    {
      label: "My Projects",
      icon: "i-heroicons-folder",
      click: () => navigateTo("/my-projects"),
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      click: () => navigateTo("/settings"),
    },
  ],
  [
    {
      label: "Help & Support",
      icon: "i-heroicons-question-mark-circle",
      click: () => navigateTo("/help"),
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => console.log("Sign out"),
    },
  ],
];

// Methods
const toggleTheme = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
    mobileMenuOpen.value = false;
  }
};

const clearSearch = () => {
  searchQuery.value = "";
};

// Close mobile menu on route change
watch(
  () => useRoute().path,
  () => {
    mobileMenuOpen.value = false;
  }
);
</script>
