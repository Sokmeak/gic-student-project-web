<template>
  <div class="flex items-center gap-2">
    <div class="flex gap-1">
      <button
        v-for="star in 5"
        :key="star"
        :class="[
          'transition-transform duration-200',
          !isReadonly && 'hover:scale-110 cursor-pointer',
        ]"
        @click="() => !isReadonly && updateRating(star)"
        @mouseenter="() => !isReadonly && (hoveredRating = star)"
        @mouseleave="() => !isReadonly && (hoveredRating = 0)"
      >
        <UIcon
          :name="
            star <= (hoveredRating || modelValue)
              ? 'i-heroicons-star-solid'
              : 'i-heroicons-star'
          "
          :class="[
            'w-5 h-5',
            star <= (hoveredRating || modelValue)
              ? 'text-yellow-400'
              : 'text-gray-600',
          ]"
        />
      </button>
    </div>

    <!-- Rating text -->
    <div class="flex items-center gap-2 ml-2">
      <span class="text-lg font-semibold text-white">{{
        modelValue || "—"
      }}</span>
      <span class="text-sm text-gray-400">/ 5</span>
    </div>

    <!-- Count -->
    <span v-if="count" class="text-xs text-gray-500">({{ count }})</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 5,
  },
  count: {
    type: Number,
    default: null,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const hoveredRating = ref(0);

const updateRating = (rating) => {
  emit("update:modelValue", rating === props.modelValue ? 0 : rating);
};
</script>
