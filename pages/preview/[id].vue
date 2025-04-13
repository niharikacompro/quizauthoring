<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Quiz Preview</h2>
      
      <div v-if="quiz">
        <h3 class="text-xl font-semibold">{{ quiz.title || 'Untitled Quiz' }}</h3>
        <p class="text-gray-600 mb-4">{{ quiz.description || 'No description provided' }}</p>
  
        <div v-for="(question, qIndex) in quiz.questions" :key="qIndex" class="mb-4">
            <div style="display: flex; flex-direction: row;  gap:8px">
          <h4 class="font-medium">
            Q{{ qIndex + 1 }}. 
          </h4>
          <div v-html="question.text"></div>
          </div>
          <div v-if="question.type === 'mcq'" class="ml-4 mt-2">
            <div
              v-for="(option, oIndex) in question.options"
              :key="oIndex"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :name="'q' + qIndex"
                :checked="option.id === question.correctAnswer"
                disabled
              />
              <label>{{ option.label }}</label>
            </div>
          </div>
          <div v-else class="text-green-700 mt-2">
            Correct Answer: {{ question.correctAnswer }}
          </div>
        </div>
      </div>
  
      <div v-else class="text-gray-500">Loading quiz...</div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const quiz = ref(null)
  
  onMounted(() => {
    const id = route.params.id
    const stored = localStorage.getItem('quizzes')
    if (stored) {
      const allQuizzes = JSON.parse(stored)
      // If your quizzes have unique IDs, filter by ID
      quiz.value = allQuizzes.find(q => q.id === id) || null
    }
  })
  </script>
  