<template>
  <div class="glass-panel question-container">
    <div class="question-header">
      <h3>Question {{ index + 1 }}</h3>
      <button @click="removeQuestion()" class="glass-button danger small">Remove</button>
    </div>

    <div class="form-group">
      <label>Question Text</label>
      <froala
  :model="localQuestion.text"
  @froalaModelChange="updateQuestionText"
  :config="froalaConfig"
/>
    </div>

    <div v-if="localQuestion.type === 'mcq'" class="options-section">
      <OptionInput
        v-for="(opt, idx) in localQuestion.options"
        :key="idx"
        :option="opt"
        :selected="localQuestion.correctAnswer"
        @updateOption="(val) => updateOption(idx, val)"
        @selectCorrect="(val) => setCorrectAnswer(val)"
        @remove="() => removeOption(idx)"
      />
      <button @click="addOption()" class="glass-button primary small">Add Option</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue';
import OptionInput from './OptionList.vue';
import { nextTick } from 'vue';


// Define the froalaConfig in your setup
const froalaConfig = {
  heightMin: 200,
  placeholderText: 'Enter your question here...',
  toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'align', 'formatOL', 'formatUL'],
  events: {
    'contentChanged': function() {
      // This might help ensure content changes are detected
      console.log('Content changed');
    }
  }
};

const updateQuestionText = (content) => {
  console.log('Received content:', content);
  localQuestion.value.text = content;
  props.setQuestion({ ...localQuestion.value });
};
const props = defineProps({
  question: Object,
  index: Number,
  setQuestion: Function,
  removeQuestion: Function,
  addOption: Function,
  removeOption: Function,
});

const localQuestion = ref({ ...props.question });

watch(
  () => props.question,
  (newVal) => {
    localQuestion.value = { ...newVal, options: [...newVal.options] };
  },
  { deep: true, immediate: true }
);

const emitChanges = () => {
  props.setQuestion({ ...localQuestion.value, options: [...localQuestion.value.options] });
};



const updateOption = (optIndex, val) => {
  localQuestion.value.options.splice(optIndex, 1, val);
  emitChanges();
};

const setCorrectAnswer = (val) => {
  localQuestion.value.correctAnswer = val;
  emitChanges();
};

const addOption = () => {
  props.addOption();
};

const removeOption = (idx) => {
  props.removeOption(idx);
};

const removeQuestion = () => {
  props.removeQuestion();
};
</script>
