<template>
  <div class="min-h-screen bg-[#f5f5f5] p-5 font-[Segoe UI] font-sans flex max-w-[1400px] mx-auto gap-5">
  <QuizCreationPanel :quiz="quiz" />
  <QuizPreviewPanel :quiz="quiz" />
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'nuxt/app';
import type { Quiz } from '@/types/quiz';
const route = useRoute();
const quizId = route.query.id as string;
// Reactive quiz object
const quiz = ref<Quiz>({
  id: '',
  title: '',
  description: '',
  questions: [],
});

onMounted(() => {
  if (quizId) {
    const quizzes: Quiz[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const foundQuiz = quizzes.find((q) => q.id === quizId);
    if (foundQuiz) {
      quiz.value = { ...foundQuiz };
    } else {
      quiz.value.id = quizId;
    }
  }
});
</script>
