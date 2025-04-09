<template>
  <div class="app-container">
    <div class="quiz-creator-container">
        <QuizCreationPanel :quiz="quiz"  />
        <QuizPreviewPanel :quiz="quiz" />
    </div>
    </div>
</template>
<script setup>
  import { ref } from 'vue';
const quiz = ref({
  title: '',
  description: '',
  questions: []
});
watch(()=>quiz, (newVal) => {
    console.log('Quiz data changed:', newVal);
  }, { deep: true });
</script>
