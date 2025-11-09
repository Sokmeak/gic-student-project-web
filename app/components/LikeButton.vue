<template>
  <button
    @click="handleLike"
    :class="[
      'relative group/like flex items-center justify-center gap-2 px-3 py-2 h-10 rounded-lg font-semibold transition-all duration-300 w-full',
      isLiked
        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600 border border-slate-600 hover:border-blue-500/50',
    ]"
    :title="isLiked ? 'Unlike' : 'Like'"
  >
    <!-- Thumb Up Icon -->
    <UIcon
      :name="
        isLiked
          ? 'i-heroicons-hand-thumb-up-solid'
          : 'i-heroicons-hand-thumb-up'
      "
      :class="[
        'w-4 h-4 transition-transform duration-300',
        isLiked ? 'scale-125 animate-bounce' : 'group-hover/like:scale-110',
      ]"
    />
    <!-- Like Text -->
    <span class="text-xs sm:text-sm font-semibold">{{
      isLiked ? "Liked" : "Like"
    }}</span>

    <!-- Animated Particles (on like) -->
    <div
      v-if="isLiked"
      class="absolute inset-0 animate-pulse pointer-events-none"
    >
      <div
        class="absolute top-1 left-2 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-0 group-hover/like:opacity-100 transition-opacity"
        style="animation: float 0.6s ease-out forwards"
      ></div>
      <div
        class="absolute top-1 right-2 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-0 group-hover/like:opacity-100 transition-opacity"
        style="animation: float 0.6s ease-out forwards; animation-delay: 0.1s"
      ></div>
    </div>

    <!-- Hover Glow Effect -->
    <div
      v-if="!isLiked"
      class="absolute inset-0 rounded-lg bg-blue-500/0 group-hover/like:bg-blue-500/10 transition-all duration-300"
    ></div>
    <!-- Liked Glow Effect -->
    <div
      v-else
      class="absolute inset-0 rounded-lg blur-lg bg-blue-500/40 -z-10"
    ></div>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  projectId: {
    type: [String, Number],
    required: true,
  },
  likedProjects: {
    type: Set,
    required: true,
  },
});

const emit = defineEmits(["toggle-like"]);

const isLiked = computed(() => {
  return props.likedProjects.has(props.projectId);
});

const handleLike = () => {
  emit("toggle-like", props.projectId);
};
</script>

<style scoped>
@keyframes float {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}
</style>
