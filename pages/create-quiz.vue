<template>
  <div class="app-container">
    <div class="quiz-creator-container">
      <QuizCreationPanel :quiz="quiz" />
      <QuizPreviewPanel :quiz="quiz" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'nuxt/app';
import type { Quiz } from '@/types/quiz';
// Route
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
