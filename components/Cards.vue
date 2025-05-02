<template>
  <div
    v-for="(quiz, id) in quizzes"
    :key="quiz.id"
    class="px-2 relative bg-white shadow-md rounded-lg p-5 min-h-[160px] flex flex-col justify-between relative"
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
              questions: JSON.stringify(quiz.questions),
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
</template>
<script setup lang="ts">
const props = defineProps<{ quizzes: Quiz[] }>();
import { MoreVertical } from "lucide-vue-next";
const activeMenuId = shallowRef<string | null>(null);
const emit = defineEmits<{
  (e: "update:quizzes", updated: Quiz[]): void;
}>();
const toggleMenu = (id: string) => {
  activeMenuId.value = activeMenuId.value === id ? null : id;
};
const deleteQuiz = (id: string) => {
  const existingQuizzes = JSON.parse(
    localStorage.getItem(LocalStorageKeys.QUIZZES) || "[]"
  );

  const updatedQuizzes = existingQuizzes.filter((quiz: any) => quiz.id !== id);

  localStorage.setItem(
    LocalStorageKeys.QUIZZES,
    JSON.stringify(updatedQuizzes)
  );

  emit("update:quizzes", updatedQuizzes); // ✅ notify parent
  activeMenuId.value = null;
};
</script>
