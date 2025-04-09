<template>
   <div class="app-container">
    <div class="quiz-creator-container">
      <!-- Creation Panel -->
      <div class="creation-panel ">
        <h1 class="title">Create a Quiz</h1>
  
        <div class="form-group">
          <label>Quiz Title</label>
          <input v-model="quiz.title" class="glass-input quiz-title" placeholder="Enter Quiz Title" />
        </div>
  
        <div class="form-group">
          <label>Quiz Description</label>
          <textarea v-model="quiz.description" class="quiz-description glass-input" placeholder ="Enter Quiz Description" />
        </div>
       
       
        
  
        <QuestionTypeModal
          v-if="showTypeDialog"
          @select="selectQuestionType"
          @close="showTypeDialog = false"
        />
  
        <QuestionCard
  v-for="(q, index) in quiz.questions"
  :key="index"
  :question="q"
  :index="index"
  :set-question="(updated) => updateQuestion(index, updated)"
  :remove-question="() => removeQuestion(index)"
  :add-option="() => addOption(index)"
  :remove-option="(optIndex) => removeOption(index, optIndex)"
/>

        <div class="action-buttons">
            <button @click="addQuestion" class="glass-button primary">Add Question</button>
            <button @click="publishQuiz" class="glass-button success">Publish</button>
        </div>
      </div>
  
      <QuizPreview class="preview-panel" :quiz="quiz" />
    </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import QuestionCard from './QuestionCard.vue';
import QuestionTypeModal from './QuestionTypeModal.vue';
import QuizPreview from './QuizPreview.vue';

const quiz = ref({
  title: '',
  description: '',
  questions: []
});

const showTypeDialog = ref(false);

const addQuestion = () => {
  showTypeDialog.value = true;
};

const selectQuestionType = (type) => {
  const newQ = {
    text: '',
    type,
    options: type === 'mcq' ? ['', ''] : [],
    correctAnswer: type === 'mcq' ? '' : null
  };
  quiz.value.questions.push(newQ);
  showTypeDialog.value = false;
};

const removeQuestion = (index) => {
  quiz.value.questions.splice(index, 1);
};
const updateQuestion = (index, updatedQuestion) => {
  // Create a new array reference to ensure reactivity
  const updatedQuestions = [...quiz.value.questions];
  updatedQuestions[index] = { ...updatedQuestion };
  quiz.value.questions = updatedQuestions;
  
  // Force a reactivity trigger
  quiz.value = { ...quiz.value };
};



const addOption = (qIndex) => {
  quiz.value.questions[qIndex].options.push('');
};

const removeOption = (qIndex, oIndex) => {
  quiz.value.questions[qIndex].options.splice(oIndex, 1);
};

const publishQuiz = () => {
  console.log('Publishing quiz:', quiz.value);
  alert('Quiz published!');
};
</script>