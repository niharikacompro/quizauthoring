<template>
    <div class="preview-panel glass-panel">
      <h2 class="preview-title">Quiz Preview</h2>
      <div v-if="quiz.title || quiz.description" class="quiz-info">
        <h3>{{ quiz.title || 'Untitled Quiz' }}</h3>
        <p>{{ quiz.description || 'No description provided' }}</p>
      </div>
      
      <div v-for="(question, qIndex) in quiz.questions" :key="'preview-'+qIndex" class="preview-question">
        <h4>Q{{ qIndex + 1 }}. <span v-html="question.text || 'Question text goes here'"></span></h4>
        
        <div v-if="question.type === 'mcq'" class="preview-options">
          <div v-for="(option, oIndex) in question.options" :key="oIndex" class="preview-option">
            <input 
              type="radio" 
              :name="'q'+qIndex" 
              :id="'q'+qIndex+'o'+oIndex"
              :checked="option === question.correctAnswer"
              disabled
            />
            <label :for="'q'+qIndex+'o'+oIndex">{{ option || 'Option ' + (oIndex + 1) }}</label>
          </div>
        </div>
        <div v-else class="preview-input">
          <p class="correct-answer">Correct Answer: {{ question.correctAnswer || 'Not provided' }}</p>
        </div>
      </div>
      
      <div v-if="quiz.questions.length === 0" class="empty-preview">
        <p>Your questions will appear here</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    quiz: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .preview-panel {
    position: sticky;
    top: 20px;
    height: fit-content;
    max-height: 90vh;
    overflow-y: auto;
    flex: 1;
    padding: 20px;
  }
  
  .preview-title {
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .preview-question {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .preview-question h4 {
    margin-bottom: 15px;
    color: #444;
  }
  
  .preview-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .preview-option {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .preview-option label {
    cursor: pointer;
  }
  
  .empty-preview {
    text-align: center;
    color: #666;
    padding: 40px 0;
  }
  
  @media (max-width: 1024px) {
    .preview-panel {
      position: static;
      margin-top: 30px;
    }
  }
  </style>