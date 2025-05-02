<script setup lang="ts">
const route = useRoute();
const quizId = route.params.id as string;

const quiz = ref<Quiz>({
  id: "",
  title: "",
  description: "",
  questions: [],
});
onMounted(() => {
  const stored = localStorage.getItem("quizzes");
  if (stored && quizId) {
    const allQuizzes = JSON.parse(stored);
    quiz.value = allQuizzes.find((q: Quiz) => q.id === quizId);
  }
});
</script>
<template>
  <div v-if="quiz">
    <QuizPreviewPanel :quiz="quiz" />
  </div>
  <div v-else>
    <p>Loading quiz...</p>
  </div>
</template>
