<template>
  <div />
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { onMounted } from "vue";

const router = useRouter();
const authStore = useAuthStore();

// Redirect based on user role
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
  } else if (authStore.isTeacher) {
    router.push("/teacher");
  } else if (authStore.isStudent) {
    router.push("/student");
  } else {
    router.push("/login");
  }
});
</script>
