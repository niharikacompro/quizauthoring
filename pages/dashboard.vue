<template>
  <div class="p-6">
      <div class="m-14-16-24-24">
        <h1 class="text-[36px] font-extrabold text-gray-900 tracking-tight leading-tight p-4 font-sans">
  Dashboard
</h1>
      </div>
      <div class="flex justify-end mr-8 p-4">
        <UiButton
  variant="glass"
  size="lg"
  class="mb-4 border border-black"
>
  <NuxtLink to="/create-quiz">Create Quiz</NuxtLink>
        </UiButton>
      </div>
      <div class="m-6 p-6 bg-customGray">
       
        <div  >
          <Cards :quizzes="quizzes" @update:quizzes="quizzes = $event" />
        </div>
        <div v-if="quizzes.length === 0" class="text-gray-500 mt-6 text-center">
          No quizzes found in localStorage.
        </div>
      </div>
   
  
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted} from "vue";
import { LocalStorageKeys, type Quiz } from '@/types/quiz';
const quizzes = ref<Quiz[]>([]);
// Load quizzes from localStorage
const loadQuizzes = () => {
  const stored = localStorage.getItem(LocalStorageKeys.QUIZZES);
  if (stored) {
    try {
      quizzes.value = JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing quizzes from localStorage", e);
      
    }

  }
};
// Load on mount
onMounted(async () => {
  loadQuizzes();
});
</script>


