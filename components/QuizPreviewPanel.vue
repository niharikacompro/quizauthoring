<template>
  <div
    class="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl p-5 m-6 flex-1"
  >
    <h2 class="text-gray-800 border-b border-gray-300 pb-2 mb-5">
      Quiz Preview
    </h2>
    <div v-if="QuizData.title || QuizData.description">
      <h3>{{ QuizData.title || "Untitled Quiz" }}</h3>
      <p>{{ QuizData.description || "No description provided" }}</p>
    </div>

    <div
      v-for="(question, qIndex) in QuizData.questions"
      :key="'preview-' + qIndex"
      class="mb-6 pb-4 border-b border-gray-100"
    >
      <div class="flex flex-row gap-2">
        <h4>Q{{ qIndex + 1 }}</h4>
        <div v-html="question.text || 'Question text goes here'"></div>
      </div>

      <div v-if="question.type === 'mcq'" class="flex flex-col gap-2.5">
        <div
          v-for="(option, oIndex) in question.options"
          :key="oIndex"
          class="flex items-center gap-2.5"
        >
          <input
            type="radio"
            :name="'q' + qIndex"
            :id="'q' + qIndex + 'o' + oIndex"
            :checked="option.id === question.correctAnswer"
            disabled
          />
          <label :for="'q' + qIndex + 'o' + oIndex">{{
            option.label || "Option " + (oIndex + 1)
          }}</label>
        </div>
      </div>
      <div v-else>
        <p>Correct Answer: {{ question.correctAnswer || "Not provided" }}</p>
      </div>
    </div>

    <div
      v-if="QuizData.questions.length === 0"
      class="text-center text-gray-500 py-10"
    >
      <p>Your questions will appear here</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ quiz: Quiz }>();
const QuizData = toRef(props, "quiz");
</script>
