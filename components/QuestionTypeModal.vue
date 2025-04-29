<template>
    <div
      v-if="showModal"
     class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]"
    
    >
      <div class="bg-white/70 backdrop-blur-[10px] rounded-[15px] p-5 w-[400px] max-w-[90%]">
       

        <div
         class="flex justify-between items-center"
        >
          <h3>Select Question Type</h3>
          <button class="absolute top-2 right-0 bg-transparent border-0 text-xl text-gray-600 cursor-pointer transition-colors duration-300 ease-in-out hover:text-red-500" @click="closeQuestionTypeDialog">
            ×
          </button>
        </div>

        <div class="flex justify-center gap-4 mt-5">
          <UiButton
            ref="mcqButtonRef"
            @click="selectQuestionType('mcq')"
          class="bg-white bg-opacity-70 border-none rounded-lg py-2.5 px-5 font-semibold cursor-pointer shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-sm"
          >
            Multiple Choice
          </UiButton>
          <UiButton @click="selectQuestionType('input')" class="bg-white bg-opacity-70 border-none rounded-lg py-2.5 px-5 font-semibold cursor-pointer shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-sm">
            Text Input
          </UiButton>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import type { Quiz ,QuestionType} from '@/types/quiz';
const props = defineProps<{ showQuestionTypeDialog: boolean ,quiz:Quiz }>();
const showModal = ref(props.showQuestionTypeDialog);
const reactiveQuiz = toRef(props, 'quiz');
const closeQuestionTypeDialog = () => {
  showModal.value = false;
};
const selectQuestionType = (type:QuestionType) => {
  const newQuestion = {
    id: "q_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    text: "",
    type:type,
    options: type === "mcq" ? [] : [],
    correctAnswer: "",
  };

  reactiveQuiz.value.questions.push(newQuestion);
  showModal.value = false;
};
</script>