<template>
  <section
    class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100"
  >
    <UContainer>
      <div class="flex justify-between items-center mb-12">
        <div>
          <h2 class="text-4xl font-bold text-gray-900 mb-2">
            Featured Projects
          </h2>
          <p class="text-gray-600">
            Discover the latest and greatest student creations
          </p>
        </div>
        <NuxtLink to="/projects">
          <UButton
            variant="outline"
            icon="i-heroicons-arrow-right"
            icon-trailing
          >
            View All
          </UButton>
        </NuxtLink>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Project Card 1 -->
        <UCard
          class="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
        >
          <div
            class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300"
          >
            🤖
          </div>
          <div class="p-6">
            <div
              class="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3"
            >
              AI & Machine Learning
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              AI Study Assistant
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-2">
              Machine learning application that helps students optimize their
              study schedules using predictive analytics
            </p>
            <div
              class="flex items-center justify-between pt-4 border-t border-gray-200"
            >
              <span class="text-sm text-gray-500">Fall 2024</span>
              <UButton
                variant="ghost"
                size="sm"
                icon="i-heroicons-arrow-right"
                icon-trailing
                label="Details"
              />
            </div>
          </div>
        </UCard>

        <!-- Project Card 2 -->
        <UCard
          class="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
        >
          <div
            class="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300"
          >
            📱
          </div>
          <div class="p-6">
            <div
              class="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-3"
            >
              Mobile App
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Campus Navigator
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-2">
              AR-powered mobile application for navigating the campus
              efficiently with real-time indoor mapping
            </p>
            <div
              class="flex items-center justify-between pt-4 border-t border-gray-200"
            >
              <span class="text-sm text-gray-500">Fall 2024</span>
              <UButton
                variant="ghost"
                size="sm"
                icon="i-heroicons-arrow-right"
                icon-trailing
                label="Details"
              />
            </div>
          </div>
        </UCard>

        <!-- Project Card 3 -->
        <UCard
          class="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
        >
          <div
            class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300"
          >
            🌍
          </div>
          <div class="p-6">
            <div
              class="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-3"
            >
              Sustainability
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Sustainability Tracker
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-2">
              Platform for tracking campus environmental impact and promoting
              sustainable practices
            </p>
            <div
              class="flex items-center justify-between pt-4 border-t border-gray-200"
            >
              <span class="text-sm text-gray-500">Summer 2024</span>
              <UButton
                variant="ghost"
                size="sm"
                icon="i-heroicons-arrow-right"
                icon-trailing
                label="Details"
              />
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
