<template>
    <div class="preview-panel glass-panel">
      <h2 class="preview-title">Quiz Preview</h2>
      <div v-if="reactiveQuiz.title || reactiveQuiz.description" class="quiz-info">
        <h3>{{ reactiveQuiz.title || 'Untitled Quiz' }}</h3>
        <p>{{ reactiveQuiz.description || 'No description provided' }}</p>
      </div>
      
      <div v-for="(question, qIndex) in reactiveQuiz.questions" :key="'preview-'+qIndex" class="preview-question">
        <h4>Q{{ qIndex + 1 }}. <div v-html="question.text || 'Question text goes here'"></div></h4>
        
        <div v-if="question.type === 'mcq'" class="preview-options">
          <div v-for="(option, oIndex) in question.options" :key="oIndex" class="preview-option">
            <input
              type="radio"
              :name="'q'+qIndex"
              :id="'q'+qIndex+'o'+oIndex"
              :checked="option.id === question.correctAnswer"
              disabled
            />
            <label :for="'q'+qIndex+'o'+oIndex">{{ option.label || 'Option ' + (oIndex + 1) }}</label>
          </div>
        </div>
        <div v-else class="preview-input">
          <p class="correct-answer">Correct Answer: {{ question.correctAnswer || 'Not provided' }}</p>
        </div>
      </div>
      
      <div v-if="reactiveQuiz.questions.length === 0" class="empty-preview">
        <p>Your questions will appear here</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { toRef } from 'vue';
  
  const props = defineProps({quiz: Object});
  const reactiveQuiz = toRef(() => props.quiz);
  </script>