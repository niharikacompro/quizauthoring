<template>
    <div class=" glass-panel">
      <h2>Preview</h2>
      <h3>{{ quiz.title || 'Untitled Quiz' }}</h3>
      <p>{{ quiz.description || 'No Description' }}</p>
  
      <div v-for="(q, i) in quiz.questions" :key="i">
        <h4>Q{{ i + 1 }}. <span v-html="q.text" /></h4>
        <div v-if="q.type === 'mcq'">
          <label v-for="(opt, j) in q.options" :key="j">
            <input type="radio" :checked="opt === q.correctAnswer" disabled />
            {{ opt }}
          </label>
        </div>
        <div v-else>
          <input type="text" disabled placeholder="Your answer..." />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['quiz']);
  </script>
  