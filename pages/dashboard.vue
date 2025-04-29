<template>
  <div class="p-6">
    <!-- Header -->
    <div>
      <div class="m-14-16-24-24">
        <h1 class="text-[36px] font-extrabold text-gray-900 tracking-tight leading-tight p-4 font-sans">
  Dashboard
</h1>
      </div>
      <div class="flex justify-end mr-8 p-4">
        <UiButton
  variant="glass"
  size="lg"
  class="mb-4 border border-black"
>
  <NuxtLink to="/create-quiz">Create Quiz</NuxtLink>
        </UiButton>
      </div>
      <div class="m-6 p-6 bg-customGray">
       
        <div  >
          <div
            v-for="(quiz, id) in quizzes"
            :key="quiz.id"
            class=" px-2 relative"
          >
            <div
              class="bg-white shadow-md rounded-lg p-5 min-h-[160px] flex flex-col justify-between relative"
            >
              <!-- 3-dot icon -->
              <div class="absolute top-3 right-3 z-20">
                <button
                  @click="toggleMenu(quiz.id)"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical class="w-5 h-5" />
                </button>

                <!-- Dropdown -->
                <div
                  v-if="activeMenuId === quiz.id"
                  class="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow w-32 z-30"
                >
                  <NuxtLink
                    :to="{
                      path: '/create-quiz',
                      query: {
                        edit: 'true',
                        id: quiz.id,
                        title: quiz.title,
                        description: quiz.description,
                        questions:JSON.stringify(quiz.questions),
                      },
                    }"
                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    @click="activeMenuId = null"
                  >
                    Edit Quiz
                  </NuxtLink>
                  <button
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    @click="deleteQuiz(quiz.id)"
                  >
                    Delete Quiz
                  </button>
                </div>
              </div>

              <!-- Quiz content -->
              <div>
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ quiz.title }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">{{ quiz.description }}</p>
              </div>

              <!-- View button -->
              <div class="mt-4">
                <NuxtLink
                  :to="`/preview/${quiz.id}`"
                  class="inline-block text-sm px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div v-if="quizzes.length === 0" class="text-gray-500 mt-6 text-center">
          No quizzes found in localStorage.
        </div>
      </div>
      <!-- Navigation Arrows -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted} from "vue";
import {  MoreVertical } from "lucide-vue-next";
import type { Quiz } from '@/types/quiz';
const quizzes = ref<Quiz[]>([]);
const activeMenuId = shallowRef<string | null>(null);
const toggleMenu = (id:string) => {
  activeMenuId.value = activeMenuId.value === id ? null : id;
  console.log("active menu id ", activeMenuId.value);
};
// Load quizzes from localStorage
const loadQuizzes = () => {
  console.log("before",quizzes.value);
  const stored = localStorage.getItem("quizzes");
  if (stored) {
    try {

      quizzes.value = JSON.parse(stored);
      console.log("after",quizzes.value)

    } catch (e) {
      console.error("Invalid JSON in localStorage.");
    }
  }
};
// Delete quiz
const deleteQuiz = (id: string) => {
  const existingQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");

  const updatedQuizzes = existingQuizzes.filter((quiz: any) => quiz.id !== id);

  localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

  quizzes.value = updatedQuizzes; // Update your reactive quizzes list
  activeMenuId.value = null;
};

// Load on mount
onMounted(async () => {
  loadQuizzes();
 
 
});
</script>


