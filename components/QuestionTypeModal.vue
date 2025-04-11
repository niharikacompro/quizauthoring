<template>
    <div v-if="reactiveShow" class="modal-overlay">
          <div class="modal-content glass-panel">
            <h3>Select Question Type</h3>
            <div class="type-options">
              <button @click="selectQuestionType('mcq')" class="glass-button">Multiple Choice</button>
              <button @click="selectQuestionType('input')" class="glass-button">Text Input</button>
            </div>
          </div>
        </div>
</template>
<script setup>
import { toRef } from 'vue';
const props = defineProps({
  show: Boolean,
  quiz: Object,
});
const reactiveShow=toRef(() => props.show);
const reactiveQuiz =toRef(()=>props.quiz);
const selectQuestionType = (type) => {
  const newQuestion = {
    text: '',
    type,
    options: type === 'mcq' ? [] : [],
    correctAnswer: null, // for mcq: should be ID of the correct option
  };
  reactiveQuiz.value.questions.push(newQuestion);
  reactiveShow.value = false;
};
</script>