<template>
    <div class="question-form">
      <h3>Question {{ index + 1 }}</h3>
      <button @click="$emit('remove-question', index)">Remove</button>
      <div class="form-group">
        <label>Question Text</label>
        <input v-model="localQuestion.text" placeholder="Enter Question Text" />
      </div>
      <div class="form-group">
        <label>Question Type</label>
        <select v-model="localQuestion.type">
          <option value="mcq">Multiple Choice</option>
          <option value="input">Text Input</option>
        </select>
      </div>
      <OptionsList
        v-if="localQuestion.type === 'mcq'"
        :options="localQuestion.options"
        :correct-answer="localQuestion.correctAnswer"
        @update-options="updateOptions"
        @update-correct-answer="updateCorrectAnswer"
      />
      <div v-if="localQuestion.type === 'input'" class="form-group">
        <label>Correct Answer</label>
        <input v-model="localQuestion.correctAnswer" placeholder="Enter Correct Answer" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import OptionsList from './OptionsList.vue';
  
  export default {
    components: {
      OptionsList,
    },
    props: {
      question: Object,
      index: Number,
    },
    setup(props, { emit }) {
      const localQuestion = ref({ ...props.question });
  
      watch(localQuestion, (newQuestion) => {
        emit('update-question', newQuestion, props.index);
      });
  
      const updateOptions = (options) => {
        localQuestion.value.options = options;
      };
  
      const updateCorrectAnswer = (correctAnswer) => {
        localQuestion.value.correctAnswer = correctAnswer;
      };
  
      return {
        localQuestion,
        updateOptions,
        updateCorrectAnswer,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  
  