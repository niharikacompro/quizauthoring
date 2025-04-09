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
        <div v-if="showQuestionTypeDialog" class="modal-overlay">
          <div class="modal-content glass-panel">
            <h3>Select Question Type</h3>
            <div class="type-options">
              <button @click="selectQuestionType('mcq')" class="glass-button">Multiple Choice</button>
              <button @click="selectQuestionType('input')" class="glass-button">Text Input</button>
            </div>
          </div>
        </div>
        <div class="action-buttons">
          <button @click="addQuestion" class="glass-button primary">Add Question</button>
          <button @click="publishQuiz" class="glass-button success">Publish Quiz</button>
        </div>
        <div v-for="(question, qIndex) in reactiveQuiz.questions" :key="qIndex" class="question-container glass-panel">
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
      label="option.label"
    />
    <input 
    type="radio" 
    :name="'correctAnswer_' + qIndex"
    :value="option.id" 
    v-model="question.correctAnswer"
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
</template>
<script setup>
import { toRef } from 'vue';
const props = defineProps({quiz:Object});
const reactiveQuiz = toRef(() => props.quiz);
const showQuestionTypeDialog = ref(false);
const selectQuestionType = (type) => {
  const newQuestion = {
    text: '',
    type,
    options: type === 'mcq' ? [] : [],
    correctAnswer: null, // for mcq: should be ID of the correct option
  };
  reactiveQuiz.value.questions.push(newQuestion);
  showQuestionTypeDialog.value = false;
};
const addQuestion = () => {
    
 showQuestionTypeDialog.value = true;
  console.log(showQuestionTypeDialog.value);
};
const publishQuiz = () => {
  console.log("Published Quiz:", reactiveQuiz.value);
  alert("Quiz published successfully!");
};
const removeQuestion = (qIndex) => {
  reactiveQuiz.value.questions.splice(qIndex, 1);
};
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
let optionIdCounter = 0; // you can also use UUIDs

const addOption = (qIndex) => {
  reactiveQuiz.value.questions[qIndex].options.push({
    id: 'opt_' + optionIdCounter++,
    label:'add option'
   
  });
};

const removeOption = (qIndex, oIndex) => {
  reactiveQuiz.value.questions[qIndex].options.splice(oIndex, 1);
};


</script>