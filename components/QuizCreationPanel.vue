<template>
   <div class="creation-panel">
        <h1 class="title">Create a Quiz</h1>
        
        <div class="form-group">
          <label>Quiz Title</label>
          <input v-model="reactiveQuiz.title" placeholder="Enter Quiz Title" class="glass-input" />
        </div>
        
        <div class="form-group">
          <label>Quiz Description</label>
          <textarea v-model="reactiveQuiz.description" placeholder="Enter Quiz Description" class="glass-input"></textarea>
        </div>
        <div v-if="reactiveShowQuestionTypeDialog" class="modal-overlay">
          <div class="modal-content glass-panel">
            <h3>Select Question Type</h3>
            <div class="type-options">
              <button @click="selectQuestionType('mcq')" class="glass-button">Multiple Choice</button>
              <button @click="selectQuestionType('input')" class="glass-button">Text Input</button>
            </div>
          </div>
        </div>
        
       
        
       
      </div> 
</template>
<script setup>
import { toRef } from 'vue';
const props = defineProps({quiz:Object,showQuestionTypeDialog:Boolean});
const reactiveQuiz = toRef(() => props.quiz);
const reactiveShowQuestionTypeDialog = toRef(() => props.showQuestionTypeDialog);
const selectQuestionType = (type) => {
  const newQuestion = {
    text: '',
    type: type,
    options: type === 'mcq' ? [] : [],
    correctAnswer: type === 'mcq'? null :""
  };
  reactiveQuiz.value.questions.push(newQuestion);
  reactiveShowQuestionTypeDialog.value = false;
};


</script>