<template>
  <div class="options-list">
    <div v-for="(option, oIndex) in localOptions" :key="oIndex" class="option-row">
      <input
        v-model="localOptions[oIndex]"
        placeholder="Enter option"
      />
      <input
        type="radio"
        :value="option"
        v-model="localCorrectAnswer"
      />
      <button @click="removeOption(oIndex)">×</button>
    </div>
    <button @click="addOption">Add Option</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    options: Array,
    correctAnswer: String,
  },
  setup(props, { emit }) {
    const localOptions = ref([...props.options]);
    const localCorrectAnswer = ref(props.correctAnswer);

    watch(localOptions, (newOptions) => {
      emit('update-options', newOptions);
    });

    watch(localCorrectAnswer, (newCorrectAnswer) => {
      emit('update-correct-answer', newCorrectAnswer);
    });

    const addOption = () => {
      localOptions.value.push('');
    };

    const removeOption = (index) => {
      localOptions.value.splice(index, 1);
    };

    return {
      localOptions,
      localCorrectAnswer,
      addOption,
      removeOption,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
