<template>
    <div class="question-container glass-panel">
      <div class="question-header">
        <h3>Question {{ index + 1 }}</h3>
        <button @click="$emit('remove-question', index)" class="glass-button danger small">Remove</button>
      </div>
      
      <div class="form-group">
        <label>Question Text</label>
        <froala v-model:value="localQuestion.text" :config="froalaConfig" />
      </div>
      
      <div v-if="localQuestion.type === 'mcq'" class="options-section">
        <div v-for="(option, oIndex) in localQuestion.options" :key="oIndex" class="option-row">
          <input 
            v-model="localQuestion.options[oIndex]" 
            placeholder="Enter option" 
            class="glass-input small" 
          />
          <input 
            type="radio" 
            v-model="localQuestion.correctAnswer" 
            :value="option" 
            class="radio-input"
          />
          <button @click="removeOption(oIndex)" class="glass-button danger small">×</button>
        </div>
        <button @click="addOption" class="glass-button secondary small">
          Add Option
        </button>
      </div>
      
      <div v-if="localQuestion.type === 'input'" class="form-group">
        <label>Correct Answer</label>
        <input v-model="localQuestion.correctAnswer" placeholder="Enter Correct Answer" class="glass-input" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    question: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['update-question', 'remove-question']);
  
  const localQuestion = ref({ ...props.question });
  const froalaConfig = {
    // Your Froala config here
  };
  
  watch(localQuestion, (newVal) => {
    emit('update-question', props.index, newVal);
  }, { deep: true });
  
  const addOption = () => {
    localQuestion.value.options.push('');
  };
  
  const removeOption = (oIndex) => {
    localQuestion.value.options.splice(oIndex, 1);
  };
  </script>
  
  <style scoped>
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
  </style>