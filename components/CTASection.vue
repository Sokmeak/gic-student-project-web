<template>
  <section
    class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
  >
    <UContainer>
      <div class="text-center text-white space-y-8 max-w-2xl mx-auto">
        <h2 class="text-4xl lg:text-5xl font-bold">
          Ready to Showcase Your Innovation?
        </h2>
        <p class="text-xl opacity-90 leading-relaxed">
          Join our community of innovators and showcase your amazing projects.
          Get feedback, build your portfolio, and inspire others.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <UButton
            size="lg"
            class="rounded-full"
            color="white"
            variant="soft"
            icon="i-heroicons-rocket-launch"
          >
            Submit Your Project
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            color="white"
            class="rounded-full"
            icon="i-heroicons-calendar"
          >
            View Calendar
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>
