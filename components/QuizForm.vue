<template>
    <div class="creation-panel">
      <h1>Create a Quiz</h1>
  
      <div class="form-group">
        <label>Quiz Title</label>
        <input v-model="quiz.title" class="glass-input" />
      </div>
  
      <div class="form-group">
        <label>Quiz Description</label>
        <textarea v-model="quiz.description" class="glass-input"></textarea>
      </div>
  
      <div class="action-buttons">
        <button @click="addQuestion" class="glass-button primary">Add Question</button>
        <button @click="publishQuiz" class="glass-button success">Publish Quiz</button>
      </div>
  
      <QuestionEditor
        v-for="(q, index) in quiz.questions"
        :key="index"
        :question="q"
        :index="index"
        @remove="removeQuestion"
        @add-option="addOption"
        @remove-option="removeOption"
      />
    </div>
  </template>
  
  <script setup>
  import QuestionEditor from './QuestionEditor.vue';
  import { useQuizBuilder } from '@/composables/useQuizBuilder';
  
  const {
    quiz,
    addQuestion,
    removeQuestion,
    addOption,
    removeOption,
    publishQuiz
  } = useQuizBuilder();
  </script>
  