<template>
  <nav class="flex items-center gap-2" :aria-label="ariaLabel">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center gap-2"
    >
      <!-- Item -->
      <component
        :is="item.to ? 'NuxtLink' : 'span'"
        :to="item.to"
        :class="[
          'transition-colors',
          index === items.length - 1
            ? 'text-white font-medium'
            : item.to
            ? 'text-gray-400 hover:text-blue-400 cursor-pointer'
            : 'text-gray-400',
        ]"
      >
        {{ item.label }}
      </component>

      <!-- Separator -->
      <span v-if="index < items.length - 1" class="text-gray-600">/</span>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every((item) => item.label && (item.to || item.label));
    },
  },
  ariaLabel: {
    type: String,
    default: "Breadcrumb",
  },
});
</script>
