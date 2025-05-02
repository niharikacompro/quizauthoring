<template>
  <div class="min-h-screen bg-[#f5f5f5] p-5 font-[Segoe UI] font-sans flex max-w-[1400px] mx-auto gap-5">
  <QuizCreationPanel :quiz="quiz" />
  <QuizPreviewPanel :quiz="quiz" />
</div>
</template>

<script setup lang="ts">
const route = useRoute();
const quizId = route.query.id as string;
const quiz = ref<Quiz>({
  id: '',
  title: '',
  description: '',
  questions: [],
});

onMounted(() => {
  if (quizId) {
    const quizzes: Quiz[] = JSON.parse(localStorage.getItem(LocalStorageKeys.QUIZZES) || '[]');
    const foundQuiz = quizzes.find((q) => q.id === quizId);
    if (foundQuiz) {
      quiz.value = { ...foundQuiz };
    } else {
      quiz.value.id = quizId;
    }
  }
});
</script>
