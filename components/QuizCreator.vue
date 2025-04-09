<template>
  <div class="app-container">
    <div class="quiz-creator-container">
      <div>
        <QuizCreationPanel :quiz="quiz"  :showQuestionTypeDialog="showQuestionTypeDialog"/>
<div class="action-buttons">
          <button @click="addQuestion" class="glass-button primary">Add Question</button>
          <button @click="publishQuiz" class="glass-button success">Publish Quiz</button>
        </div>
      </div>

    </div>
    </div>
</template>
<script setup>
  import { ref } from 'vue';
 
// Froala JS (must be before the CSS)

// Quiz data structure
const quiz = ref({
  title: '',
  description: '',
  questions: []
});
const showQuestionTypeDialog = ref(false);
const addQuestion = () => {
  showQuestionTypeDialog.value = true;
};
const publishQuiz = () => {
  console.log("Published Quiz:", quiz.value);
  alert("Quiz published successfully!");
};
watch(()=>quiz, (newVal) => {
    console.log('Quiz data changed:', newVal);
  }, { deep: true });

</script>
