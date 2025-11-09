<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
  >
    <!-- Back Button -->
    <div
      class="sticky top-20 z-40 bg-slate-800/80 backdrop-blur border-b border-slate-700"
    >
      <UContainer class="py-4">
        <PresetButton preset="back" to="/projects" />
      </UContainer>
    </div>

    <!-- Project Details -->
    <UContainer class="py-12">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Project Header -->
          <div
            :class="[
              'rounded-2xl h-64 flex items-center justify-center text-7xl relative overflow-hidden',
              project.gradient,
            ]"
          >
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            ></div>
            <span class="relative z-10">{{ project.emoji }}</span>
          </div>

          <!-- Project Title and Badges -->
          <div class="space-y-4">
            <div class="flex gap-3 flex-wrap">
              <UBadge color="primary" variant="soft" size="md">
                {{ project.category }}
              </UBadge>
              <UBadge color="info" variant="soft" size="md">
                {{ project.year }}
              </UBadge>
              <UBadge color="success" variant="soft" size="md">
                {{ project.semester }}
              </UBadge>
            </div>
            <h1 class="text-4xl lg:text-5xl font-black text-white">
              {{ project.title }}
            </h1>
            <p class="text-lg text-gray-300 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <!-- Course / Subject -->
          <div
            class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-heroicons-academic-cap"
                class="w-6 h-6 text-blue-400 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">
                  Course / Subject
                </h3>
                <p class="text-gray-300">{{ project.course }}</p>
              </div>
            </div>
          </div>

          <!-- Duration -->
          <div
            class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-heroicons-clock"
                class="w-6 h-6 text-green-400 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="text-lg font-semibold text-white mb-2">
                  Project Duration
                </h3>
                <p class="text-gray-300">{{ project.duration }}</p>
              </div>
            </div>
          </div>

          <!-- Project Roadmap -->
          <div
            class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 space-y-6"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-heroicons-map"
                class="w-6 h-6 text-purple-400 mt-1 flex-shrink-0"
              />
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-4">
                  Project Roadmap
                </h3>
                <div class="space-y-3">
                  <div
                    v-for="(phase, idx) in project.roadmap"
                    :key="idx"
                    class="flex items-start gap-3"
                  >
                    <div
                      class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold"
                    >
                      {{ idx + 1 }}
                    </div>
                    <div class="pt-1">
                      <p class="text-gray-200 font-medium">{{ phase }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Team Members -->
          <div
            class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 space-y-6"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-heroicons-users"
                class="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"
              />
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-4">
                  Project Team
                </h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div
                    v-for="(member, idx) in project.members"
                    :key="idx"
                    class="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    >
                      {{ member.charAt(0) }}
                    </div>
                    <p class="text-gray-200 font-medium truncate">
                      {{ member }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Used -->
          <div
            class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6"
          >
            <div class="flex items-start gap-4">
              <UIcon
                name="i-heroicons-wrench-screwdriver"
                class="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0"
              />
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-4">
                  Skills & Technologies
                </h3>
                <div class="flex gap-2 flex-wrap">
                  <span
                    v-for="skill in project.skills"
                    :key="skill"
                    class="px-3 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Statistics Card -->
          <div
            class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4"
          >
            <h3 class="text-lg font-semibold text-white">Statistics</h3>

            <!-- Views -->
            <div
              class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
            >
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-eye" class="w-5 h-5 text-blue-400" />
                <span class="text-gray-300">Views</span>
              </div>
              <span class="text-white font-semibold">{{ project.views }}</span>
            </div>

            <!-- Likes -->
            <div
              class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
            >
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-hand-thumb-up"
                  class="w-5 h-5 text-blue-400"
                />
                <span class="text-gray-300">Likes</span>
              </div>
              <span class="text-white font-semibold">{{ project.likes }}</span>
            </div>

            <!-- Rating -->
            <div
              class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
            >
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-star"
                  class="w-5 h-5 text-yellow-400"
                />
                <span class="text-gray-300">Rating</span>
              </div>
              <span class="text-yellow-300 font-semibold"
                >{{ project.rating }} / 5</span
              >
            </div>
          </div>

          <!-- Lead Developer -->
          <div
            class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 space-y-4"
          >
            <h3 class="text-lg font-semibold text-white">Lead Developer</h3>
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold"
              >
                {{ project.author.charAt(0) }}
              </div>
              <div>
                <p class="text-white font-semibold">{{ project.author }}</p>
                <p class="text-gray-400 text-sm">Project Lead</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <!-- Like Button -->
            <button
              @click="toggleLike"
              :class="[
                'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2',
                isLiked
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600 hover:border-blue-500/50',
              ]"
            >
              <UIcon
                :name="
                  isLiked
                    ? 'i-heroicons-hand-thumb-up-solid'
                    : 'i-heroicons-hand-thumb-up'
                "
                class="w-5 h-5"
              />
              {{ isLiked ? "Liked" : "Like Project" }}
            </button>

            <!-- Share Button -->
            <UButton
              color="gray"
              icon="i-heroicons-share-20-solid"
              class="w-full"
              size="lg"
            >
              Share Project
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const route = useRoute();
const projectId = parseInt(route.params.id);

// Mock data - in real app, fetch from API or pass from parent
const projects = [
  {
    id: 1,
    title: "AI Chat Assistant",
    description:
      "An intelligent chatbot powered by GPT-3 for customer support.",
    category: "AI/ML",
    year: "2024",
    semester: "Semester 2",
    emoji: "🤖",
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
    author: "Sarah Chen",
    skills: ["Python", "GPT-3", "NLP", "React"],
    members: ["Sarah Chen", "Alex Park", "Jordan Lee", "Emma Davis"],
    views: "2.5K",
    likes: "342",
    rating: "4.8",
    course: "Advanced AI & Machine Learning",
    roadmap: [
      "Phase 1: GPT-3 Integration",
      "Phase 2: Conversation History",
      "Phase 3: Multi-language Support",
      "Phase 4: Production Deployment",
    ],
    duration: "3 months",
  },
  {
    id: 2,
    title: "Mobile Fitness App",
    description: "Track workouts, nutrition, and health metrics on the go.",
    category: "Mobile",
    year: "2024",
    semester: "Semester 1",
    emoji: "💪",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    author: "Alex Rodriguez",
    skills: ["React Native", "Firebase", "UI/UX", "TypeScript"],
    members: ["Alex Rodriguez", "Maria Garcia", "Sam Wilson"],
    views: "1.8K",
    likes: "256",
    rating: "4.6",
    course: "Mobile App Development",
    roadmap: [
      "MVP: Basic Tracking",
      "Add Social Features",
      "Implement AI Recommendations",
      "Launch on App Stores",
    ],
    duration: "4 months",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description:
      "Full-stack online store with payment integration and analytics.",
    category: "Web",
    year: "2024",
    semester: "Semester 2",
    emoji: "🛍️",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
    author: "Priya Patel",
    skills: ["Node.js", "Vue.js", "MongoDB", "Stripe"],
    members: [
      "Priya Patel",
      "David Chen",
      "Lisa Brown",
      "Tom Anderson",
      "Sarah White",
    ],
    views: "3.2K",
    likes: "489",
    rating: "4.9",
    course: "Full Stack Web Development",
    roadmap: [
      "Backend Setup",
      "Frontend Development",
      "Payment Integration",
      "Analytics Dashboard",
      "Deployment",
    ],
    duration: "5 months",
  },
  {
    id: 4,
    title: "Climate Monitoring IoT",
    description: "IoT sensors and dashboard for environmental monitoring.",
    category: "Sustainability",
    year: "2023",
    semester: "Semester 2",
    emoji: "🌍",
    gradient: "bg-gradient-to-br from-teal-500 to-green-600",
    author: "Jordan Kim",
    skills: ["Arduino", "Python", "IoT", "Grafana"],
    members: ["Jordan Kim", "Nina Patel", "Chris Lee"],
    views: "1.2K",
    likes: "178",
    rating: "4.7",
    course: "IoT & Environmental Tech",
    roadmap: [
      "Sensor Setup",
      "Data Collection",
      "Dashboard Development",
      "Analysis & Reporting",
    ],
    duration: "3 months",
  },
  {
    id: 5,
    title: "Machine Learning Pipeline",
    description: "Automated data processing and model training framework.",
    category: "AI/ML",
    year: "2023",
    semester: "Semester 1",
    emoji: "🧠",
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    author: "Emma Watson",
    skills: ["TensorFlow", "Python", "Scikit-learn", "Docker"],
    members: ["Emma Watson", "Robert Chang", "Maya Singh", "James Miller"],
    views: "2.1K",
    likes: "312",
    rating: "4.5",
    course: "Machine Learning Systems",
    roadmap: [
      "Data Pipeline",
      "Model Development",
      "Training Optimization",
      "Containerization",
    ],
    duration: "4 months",
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description: "Manage and monitor multiple social accounts in one place.",
    category: "Web",
    year: "2022",
    semester: "Semester 1",
    emoji: "📊",
    gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    author: "Mike Johnson",
    skills: ["React", "Next.js", "PostgreSQL", "API Design"],
    members: ["Mike Johnson", "Jessica Lee", "Kevin Chen"],
    views: "890",
    likes: "142",
    rating: "4.4",
    course: "Advanced Web Applications",
    roadmap: ["UI Design", "Backend API", "Social Integration", "Analytics"],
    duration: "3 months",
  },
  {
    id: 7,
    title: "Data Analytics Platform",
    description: "Real-time data visualization and reporting tool.",
    category: "Data Science",
    year: "2022",
    semester: "Semester 2",
    emoji: "📈",
    gradient: "bg-gradient-to-br from-blue-400 to-cyan-500",
    author: "Lisa Wong",
    skills: ["Tableau", "Python", "SQL", "D3.js"],
    members: ["Lisa Wong", "Marcus Johnson", "Patricia Green", "Daniel White"],
    views: "1.5K",
    likes: "201",
    rating: "4.3",
    course: "Data Visualization & Analytics",
    roadmap: [
      "Database Design",
      "ETL Pipeline",
      "Dashboard Creation",
      "Real-time Updates",
    ],
    duration: "4 months",
  },
];

const project = computed(() => {
  return projects.find((p) => p.id === projectId) || projects[0];
});

const likedProjects = ref(new Set());

const isLiked = computed(() => {
  return likedProjects.value.has(project.value.id);
});

const toggleLike = () => {
  if (likedProjects.value.has(project.value.id)) {
    likedProjects.value.delete(project.value.id);
  } else {
    likedProjects.value.add(project.value.id);
  }
};

useHead({
  title: `${project.value.title} - Project Details`,
  meta: [
    {
      name: "description",
      content: project.value.description,
    },
  ],
});
</script>
