<template>
    <div class="question-container glass-panel">
      <div class="question-header">
        <h3>Question {{ index + 1 }}</h3>
        <button @click="$emit('remove', index)" class="glass-button danger small">Remove</button>
      </div>
  
      <div class="form-group">
        <label>Question Text</label>
        <froala v-model:value="question.text" :config="froalaConfig" />
      </div>
  
      <div v-if="question.type === 'mcq'" class="options-section">
        <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-row">
          <input v-model="question.options[oIndex]" class="glass-input small" />
          <input
            type="radio"
            v-model="question.correctAnswer"
            :value="option"
            class="radio-input"
          />
          <button @click="$emit('remove-option', index, oIndex)" class="glass-button danger small">×</button>
        </div>
        <button @click="$emit('add-option', index)" class="glass-button secondary small">Add Option</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import froalaConfig from '@/plugins/froalaConfig';
  
  defineProps({
    question: Object,
    index: Number
  });
  </script>
  