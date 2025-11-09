<template>
  <div class="min-h-screen bg-slate-900">
    <!-- Header Section -->
    <div class="hero-nodes py-16 border-b border-blue-800/30">
      <UContainer>
        <div class="space-y-6">
          <div class="space-y-2">
            <h1 class="text-4xl lg:text-5xl font-black text-white">
              Search Results
            </h1>
            <p class="text-lg text-gray-300">
              Found {{ totalResults }} results for "{{ searchQuery }}"
            </p>
          </div>

          <!-- Search Bar with Refinement -->
          <div class="flex gap-3">
            <div class="flex-1 relative">
              <UIcon
                name="i-heroicons-magnifying-glass"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Refine your search..."
                class="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <UButton
              icon="i-heroicons-arrow-path"
              @click="performSearch"
              color="primary"
            >
              Search
            </UButton>
          </div>

          <!-- Filter Tabs -->
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="tab in searchTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700',
              ]"
            >
              {{ tab.label }}
              <span class="ml-2 text-sm opacity-70">({{ tab.count }})</span>
            </button>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Results Content -->
    <UContainer class="py-16">
      <!-- Projects Results -->
      <div v-if="activeTab === 'projects'" class="space-y-6">
        <div v-if="projectResults.length > 0" class="grid md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="project in projectResults"
            :key="project.id"
            :to="`/projects/${project.id}`"
            class="group cursor-pointer"
          >
            <div
              class="relative rounded-xl overflow-hidden transition-all duration-300 border border-slate-700 group-hover:border-blue-500/70 bg-slate-800/50 backdrop-blur group-hover:bg-slate-800/80 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 p-6 space-y-4"
            >
              <!-- Header with Emoji -->
              <div
                :class="[
                  project.gradient,
                  'h-24 rounded-lg flex items-center justify-center text-5xl transform group-hover:scale-110 transition-transform duration-300',
                ]"
              >
                {{ project.emoji }}
              </div>

              <!-- Content -->
              <div>
                <h3
                  class="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2"
                >
                  {{ project.title }}
                </h3>
                <p class="text-gray-400 text-sm line-clamp-2 mt-2">
                  {{ project.description }}
                </p>
              </div>

              <!-- Meta Info -->
              <div class="flex gap-2 flex-wrap">
                <UBadge color="primary" variant="soft" size="xs">
                  {{ project.category }}
                </UBadge>
                <UBadge color="info" variant="soft" size="xs">
                  {{ project.semester }}
                </UBadge>
              </div>

              <!-- Author and Stats -->
              <div
                class="flex items-center justify-between pt-4 border-t border-slate-700"
              >
                <div class="flex-1">
                  <p class="text-xs text-gray-500">Author</p>
                  <p class="text-sm font-medium text-gray-300">
                    {{ project.author }}
                  </p>
                </div>
                <div class="text-right space-y-1">
                  <div class="flex gap-3 justify-end text-xs text-gray-400">
                    <span>👁️ {{ project.views }}</span>
                    <span>❤️ {{ project.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center py-20">
          <UIcon
            name="i-heroicons-document-magnifying-glass"
            class="w-16 h-16 text-gray-600 mx-auto mb-4"
          />
          <p class="text-gray-400 text-lg">No projects found</p>
        </div>
      </div>

      <!-- Students Results -->
      <div v-if="activeTab === 'students'" class="space-y-6">
        <div
          v-if="studentResults.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <NuxtLink
            v-for="student in studentResults"
            :key="student.id"
            :to="`/students/${student.id}`"
            class="group cursor-pointer"
          >
            <div
              class="relative rounded-xl overflow-hidden transition-all duration-300 border border-slate-700 group-hover:border-blue-500/70 bg-slate-800/50 backdrop-blur group-hover:bg-slate-800/80 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20"
            >
              <!-- Background -->
              <div
                class="h-32 bg-gradient-to-r from-blue-600 to-purple-600"
              ></div>

              <!-- Content -->
              <div class="p-6 space-y-3 -mt-12 relative z-10">
                <div
                  class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold border-4 border-slate-800 mx-auto"
                >
                  {{ student.name.charAt(0) }}
                </div>

                <div class="text-center">
                  <h3
                    class="text-lg font-bold text-white group-hover:text-blue-300"
                  >
                    {{ student.name }}
                  </h3>
                  <p class="text-sm text-gray-400">{{ student.role }}</p>
                </div>

                <div class="flex gap-2 justify-center">
                  <UBadge color="primary" variant="soft" size="xs">
                    {{ student.department }}
                  </UBadge>
                </div>

                <div class="text-center pt-3 border-t border-slate-700">
                  <p class="text-2xl font-bold text-white">
                    {{ student.followers }}
                  </p>
                  <p class="text-xs text-gray-400">Followers</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center py-20">
          <UIcon
            name="i-heroicons-users"
            class="w-16 h-16 text-gray-600 mx-auto mb-4"
          />
          <p class="text-gray-400 text-lg">No students found</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchQuery = ref(route.query.q || "");
const activeTab = ref("projects");

const searchTabs = computed(() => [
  {
    id: "projects",
    label: "Projects",
    count: projectResults.value.length,
  },
  {
    id: "students",
    label: "Students",
    count: studentResults.value.length,
  },
]);

// Mock projects data
const allProjects = [
  {
    id: 1,
    title: "AI Chat Assistant",
    description:
      "An intelligent chatbot powered by GPT-3 for customer support.",
    category: "AI/ML",
    semester: "Semester 2",
    emoji: "🤖",
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
    author: "Sarah Chen",
    views: "2.5K",
    likes: "342",
  },
  {
    id: 2,
    title: "Mobile Fitness App",
    description: "Track workouts, nutrition, and health metrics on the go.",
    category: "Mobile",
    semester: "Semester 1",
    emoji: "💪",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    author: "Alex Rodriguez",
    views: "1.8K",
    likes: "256",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration.",
    category: "Web",
    semester: "Semester 2",
    emoji: "🛍️",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    author: "Priya Patel",
    views: "3.2K",
    likes: "521",
  },
];

// Mock students data
const allStudents = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Full Stack Developer",
    department: "Computer Science",
    followers: 342,
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    role: "Mobile Developer",
    department: "Software Engineering",
    followers: 256,
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Full Stack Engineer",
    department: "Computer Science",
    followers: 489,
  },
];

const projectResults = computed(() => {
  if (!searchQuery.value) return allProjects;
  const query = searchQuery.value.toLowerCase();
  return allProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.author.toLowerCase().includes(query)
  );
});

const studentResults = computed(() => {
  if (!searchQuery.value) return allStudents;
  const query = searchQuery.value.toLowerCase();
  return allStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(query) ||
      s.role.toLowerCase().includes(query) ||
      s.department.toLowerCase().includes(query)
  );
});

const totalResults = computed(() => {
  return projectResults.value.length + studentResults.value.length;
});

const performSearch = () => {
  navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
};

useHead({
  title: `Search - "${searchQuery.value}" | GIC Student Portal`,
  meta: [
    {
      name: "description",
      content: `Search results for "${searchQuery.value}"`,
    },
  ],
});
</script>
