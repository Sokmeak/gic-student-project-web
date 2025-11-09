<template>
  <div class="space-y-6">
    <!-- Search Filter -->
    <div v-if="showSearch" class="space-y-2">
      <label class="text-sm font-semibold text-gray-300">Search</label>
      <div class="relative">
        <UIcon
          name="i-heroicons-magnifying-glass"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4"
        />
        <input
          :value="filters.search"
          type="text"
          placeholder="Search..."
          class="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          @input="
            (e) =>
              $emit('update:filters', { ...filters, search: e.target.value })
          "
        />
      </div>
    </div>

    <!-- Multi-select Filter -->
    <div
      v-for="filterGroup in filterGroups"
      :key="filterGroup.key"
      class="space-y-2"
    >
      <label class="text-sm font-semibold text-gray-300">{{
        filterGroup.label
      }}</label>
      <div class="space-y-2">
        <label
          v-for="option in filterGroup.options"
          :key="option"
          class="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            :checked="(filters[filterGroup.key] || []).includes(option)"
            class="w-4 h-4 rounded bg-slate-800 border-slate-600 text-blue-600 cursor-pointer"
            @change="
              (e) =>
                toggleFilterOption(filterGroup.key, option, e.target.checked)
            "
          />
          <span
            class="text-sm text-gray-300 group-hover:text-blue-300 transition-colors"
          >
            {{ option }}
          </span>
        </label>
      </div>
    </div>

    <!-- Sort Filter -->
    <div v-if="showSort" class="space-y-2">
      <label class="text-sm font-semibold text-gray-300">Sort By</label>
      <select
        :value="filters.sortBy"
        class="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        @change="
          (e) => $emit('update:filters', { ...filters, sortBy: e.target.value })
        "
      >
        <option
          v-for="option in sortOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- Clear Filters Button -->
    <button
      v-if="hasActiveFilters"
      class="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-gray-300 rounded-lg text-sm font-medium transition-colors"
      @click="$emit('clear-filters')"
    >
      Clear All Filters
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  filters: {
    type: Object,
    required: true,
  },
  filterGroups: {
    type: Array,
    default: () => [],
  },
  sortOptions: {
    type: Array,
    default: () => [],
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  showSort: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:filters", "clear-filters"]);

const props = defineProps({
  filters: Object,
});

const hasActiveFilters = computed(() => {
  return (
    props.filters.search ||
    Object.entries(props.filters).some(([key, value]) => {
      if (key === "search" || key === "sortBy") return false;
      return Array.isArray(value) && value.length > 0;
    })
  );
});

const toggleFilterOption = (filterKey, option, isChecked) => {
  const currentValues = props.filters[filterKey] || [];
  let newValues;

  if (isChecked) {
    newValues = [...currentValues, option];
  } else {
    newValues = currentValues.filter((v) => v !== option);
  }

  emit("update:filters", {
    ...props.filters,
    [filterKey]: newValues,
  });
};
</script>
