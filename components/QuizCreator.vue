<script setup>
import { ref, watch, onMounted } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  quizId: String,
});

const quiz = ref({
  title: '',
  description: '',
  questions: []
});

onMounted(() => {
  if (props.quizId) {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const foundQuiz = quizzes.find(q => q.id === props.quizId);
    if (foundQuiz) {
      quiz.value = { ...foundQuiz };
    }
  }
});

watch(() => quiz.value, (newVal) => {
  console.log('Quiz data changed:', newVal);
}, { deep: true });
</script>

<template>
  <div class="app-container">
    <div class="quiz-creator-container">
      <QuizCreationPanel :quiz="quiz" />
      <QuizPreviewPanel :quiz="quiz" />
    </div>
  </div>
</template>
