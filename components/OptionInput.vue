<template>
  <div class="option-row">
    <input 
      v-model="localOption"
      class="glass-input small"
    />
    <input 
      type="radio" 
      :checked="localOption === selected" 
      @change="$emit('selectCorrect', localOption)" 
      class="radio-input"
    />
    <button @click="$emit('remove')" class="glass-button danger small">×</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['option', 'selected']);
const emit = defineEmits(['updateOption', 'selectCorrect', 'remove']);

// make a local copy
const localOption = ref(props.option);

// emit updated value whenever localOption changes
watch(localOption, (val) => {
  emit('updateOption', val);
});
</script>
