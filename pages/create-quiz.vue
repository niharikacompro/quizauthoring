<template>
  <div class="app-container">
    <div class="quiz-creator-container">
      <!-- Creation Panel -->
      <div class="creation-panel">
        <h1 class="title">Create a Quiz</h1>
        
        <div class="form-group">
          <label>Quiz Title</label>
          <input v-model="quiz.title" placeholder="Enter Quiz Title" class="glass-input" />
        </div>
        
        <div class="form-group">
          <label>Quiz Description</label>
          <textarea v-model="quiz.description" placeholder="Enter Quiz Description" class="glass-input"></textarea>
        </div>
        
        <div class="action-buttons">
          <button @click="addQuestion" class="glass-button primary">Add Question</button>
          <button @click="publishQuiz" class="glass-button success">Publish Quiz</button>
        </div>
        
        <div v-if="showQuestionTypeDialog" class="modal-overlay">
          <div class="modal-content glass-panel">
            <h3>Select Question Type</h3>
            <div class="type-options">
              <button @click="selectQuestionType('mcq')" class="glass-button">Multiple Choice</button>
              <button @click="selectQuestionType('input')" class="glass-button">Text Input</button>
            </div>
          </div>
        </div>
        
        <div v-for="(question, qIndex) in quiz.questions" :key="qIndex" class="question-container glass-panel">
          <div class="question-header">
            <h3>Question {{ qIndex + 1 }}</h3>
            <button @click="removeQuestion(qIndex)" class="glass-button danger small">Remove</button>
          </div>
          
          <div class="form-group">
            <label>Question Text</label>
            <froala v-model:value="question.text" :config="froalaConfig" />
           
          </div>
          
          <div v-if="question.type === 'mcq'" class="options-section">
  <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-row">
    <input 
      v-model="question.options[oIndex]" 
      placeholder="Enter option" 
      class="glass-input small" 
    />
    <input 
      type="radio" 
      v-model="question.correctAnswer" 
      :value="option" 
      class="radio-input"
    />
    <button @click="removeOption(qIndex, oIndex)" class="glass-button danger small">×</button>
  </div>
  <button @click="addOption(qIndex)" class="glass-button secondary small">
    Add Option
  </button>
</div>
<div v-if="question.type === 'input'" class="form-group">
    <label>Correct Answer</label>
    <input v-model="question.correctAnswer" placeholder="Enter Correct Answer" class="glass-input" />
  </div>
        </div>
      </div>
      
      <!-- Preview Panel -->
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
const froalaConfig = {
  config: {
  placeholderText: 'Enter your question here...',
  charCounterCount: true,
  toolbarSticky: true,
  height: 300,
  toolbarButtons: {
    moreText: {
      buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
      buttonsVisible: 3
    },
    moreParagraph: {
      buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat'],
      buttonsVisible: 3
    },
    moreRich: {
      buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons'],
      buttonsVisible: 3
    },
    moreMisc: {
      buttons: ['undo', 'redo', 'fullscreen', 'html'],
      buttonsVisible: 2
    }
  },
  quickInsertTags: ['image', 'table', 'ul', 'ol', 'hr'],
  imageUpload: true,
  imageUploadURL: 'https://api.example.com/upload',  // Replace with your upload endpoint
  imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
  events: {
    'image.beforeUpload': function (files) {
      // Optional: intercept image before uploading
    },
    'image.uploaded': function (response) {
      // Optional: handle image uploaded response
    },
    'contentChanged': function () {
      console.log('Content changed!');
    }
  }
}


  
};

// Methods
const addQuestion = () => {
  showQuestionTypeDialog.value = true;
};

const selectQuestionType = (type) => {
  const newQuestion = {
    text: '',
    type: type,
    options: type === 'mcq' ? [] : [],
    correctAnswer: type === 'mcq'? null :""
  };
  quiz.value.questions.push(newQuestion);
  showQuestionTypeDialog.value = false;
};

const addOption = (qIndex) => {
  quiz.value.questions[qIndex].options.push('');
};

const removeOption = (qIndex, oIndex) => {
  quiz.value.questions[qIndex].options.splice(oIndex, 1);
};

const removeQuestion = (qIndex) => {
  quiz.value.questions.splice(qIndex, 1);
};

const publishQuiz = () => {
  console.log("Published Quiz:", quiz.value);
  alert("Quiz published successfully!");
};
</script>

<style scoped>
/* Base Styles */
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e5ec, #f0f5fa);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.quiz-creator-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 20px;
}

.creation-panel, .preview-panel {
  flex: 1;
  padding: 20px;
}

.creation-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Glassmorphism Styles */
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 
    8px 8px 15px rgba(163, 177, 198, 0.6),
    -8px -8px 15px rgba(255, 255, 255, 0.7);
}

.glass-input {
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 8px;
  padding: 12px 15px;
  width: 100%;
  box-shadow: 
    inset 3px 3px 5px rgba(163, 177, 198, 0.3),
    inset -3px -3px 5px rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.glass-input:focus {
  outline: none;
  box-shadow: 
    inset 5px 5px 8px rgba(163, 177, 198, 0.4),
    inset -5px -5px 8px rgba(255, 255, 255, 0.9);
}

.glass-button {
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    4px 4px 8px rgba(163, 177, 198, 0.6),
    -4px -4px 8px rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.7);
}

.glass-button:hover {
  transform: translateY(-2px);
  box-shadow: 
    6px 6px 10px rgba(163, 177, 198, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.8);
}

.glass-button:active {
  transform: translateY(0);
  box-shadow: 
    2px 2px 5px rgba(163, 177, 198, 0.6),
    -2px -2px 5px rgba(255, 255, 255, 0.7);
}

/* Button Variants */
.primary {
  background: rgba(0, 123, 255, 0.7);
  color: white;
}

.success {
  background: rgba(40, 167, 69, 0.7);
  color: white;
}

.danger {
  background: rgba(220, 53, 69, 0.7);
  color: white;
}

.secondary {
  background: rgba(108, 117, 125, 0.7);
  color: white;
}

.small {
  padding: 5px 10px;
  font-size: 0.8rem;
}

/* Form Elements */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

textarea.glass-input {
  min-height: 80px;
  resize: vertical;
}

/* Question Styling */
.question-container {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.options-section {
  margin-top: 15px;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.radio-input {
  margin-left: 10px;
}

/* Preview Panel */
.preview-panel {
  position: sticky;
  top: 20px;
  height: fit-content;
  max-height: 90vh;
  overflow-y: auto;
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

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  padding: 30px;
  width: 400px;
  max-width: 90%;
}

.type-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .quiz-creator-container {
    flex-direction: column;
  }
  
  .preview-panel {
    position: static;
    margin-top: 30px;
  }
}
</style>