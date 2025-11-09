<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="tag in tags"
      :key="tag"
      :class="[
        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
        selectedTags.includes(tag)
          ? 'bg-blue-600 text-white border border-blue-500'
          : 'bg-slate-800/50 text-gray-300 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/70 cursor-pointer',
      ]"
      @click="() => !isReadonly && toggleTag(tag)"
    >
      {{ tag }}
      <UIcon
        v-if="selectedTags.includes(tag) && !isReadonly"
        name="i-heroicons-x-mark"
        class="w-3 h-3 inline-block ml-1"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  tags: {
    type: Array,
    required: true,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedTags = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value = selectedTags.value.filter((_, i) => i !== index);
  } else {
    selectedTags.value = [...selectedTags.value, tag];
  }
};
</script>
