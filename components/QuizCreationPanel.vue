<template>
  <div class="flex-1 p-5 m-6">
    <h1 class="mb-5">Create a Quiz</h1>
    <div class=" mb-5">
      <label for="quiz-title">Quiz Title</label>
      <UiInput
        v-model="reactiveQuiz.title"
        id="quiz-title"
        name="quiz-title"
        class="w-full px-[15px] py-[12px] rounded-[8px] bg-white/70 border-none focus:outline-none transition-all duration-300"
        variant="glass"
        placeholder="Enter quiz title"
        aria-label="Quiz Title"
      />
    </div>

    <div class="mb-5">
      <label for="quiz-description">Quiz Description</label>
      <textarea
        v-model="reactiveQuiz.description"
        id="quiz-description"
        class="w-full px-[15px] py-[12px] rounded-[8px] bg-white/70 border-none focus:outline-none transition-all duration-300"   
        placeholder="Enter quiz description"
        aria-label="Quiz Description"
      ></textarea>
    </div>

    <div
      v-if="showQuestionTypeDialog"
     class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]"
      @click.self="closeQuestionTypeDialog"
    >
      <div class="bg-white/70 backdrop-blur-[10px] rounded-[15px] p-5 w-[400px] max-w-[90%]">
       

        <div
         class="flex justify-between items-center"
        >
          <h3>Select Question Type</h3>
          <button  class="px-2.5 py-1.5 text-xs font-semibold rounded-lg 
         text-white bg-red-600 bg-opacity-70 
         transition-all duration-300 ease-in-out 
         shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.7)] 
         hover:-translate-y-0.5 
         hover:shadow-[6px_6px_10px_rgba(163,177,198,0.7),-6px_-6px_10px_rgba(255,255,255,0.8)] 
         active:translate-y-0 
         active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),-2px_-2px_5px_rgba(255,255,255,0.7)]" @click="closeQuestionTypeDialog">
            <X class="w-4 h-4" />

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
    <div
      v-for="(question, qIndex) in reactiveQuiz.questions"
      :key="question.id"
     class="mb-5 bg-white bg-opacity-70 backdrop-blur-lg rounded-xl p-5"
    >
      <div class="flex justify-between items-center mb-4">
        <h3>Question {{ qIndex + 1 }}</h3>
        <button
          @click="removeQuestion(question.id)"
          class="px-2.5 py-1.5 text-xs font-semibold rounded-lg 
         text-white bg-red-600 bg-opacity-70 
         transition-all duration-300 ease-in-out 
         shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.7)] 
         hover:-translate-y-0.5 
         hover:shadow-[6px_6px_10px_rgba(163,177,198,0.7),-6px_-6px_10px_rgba(255,255,255,0.8)] 
         active:translate-y-0 
         active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),-2px_-2px_5px_rgba(255,255,255,0.7)]"
        >
        <X class="w-4 h-4" />

        </button>
      </div>

      <div class="mb-5">
        <label>Question Text</label>

        <froala v-model:value="question.text" :config="froalaConfig" />
      </div>

      <div v-if="question.type === 'mcq'" class="mt-4">
        <div
          v-for="(option, oIndex) in question.options"
          :key="option.id"
         class="flex items-center gap-2.5 mb-2.5"
        >

          <UiInput
           :id="'option-' + option.id"
          
             v-model="question.options[oIndex].label"
            placeholder="Enter option"
            class="bg-white bg-opacity-70 border-0 rounded-lg p-3 w-full 
         shadow-inner shadow-[inset_3px_3px_5px_rgba(163,177,198,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.8)] 
         transition-all duration-300 ease-in-out focus:outline-none 
         focus:shadow-[inset_5px_5px_8px_rgba(163,177,198,0.4),inset_-5px_-5px_8px_rgba(255,255,255,0.9)] 
         p-1.5 text-xs"
            variant="glass"
          
          />
          <input
            type="radio"
            :name="'correctAnswer_' + qIndex"
            :value="option.id"
            v-model="question.correctAnswer"
           class="ml-2.5"
            :tabindex="0"
            @keydown.enter="question.correctAnswer = option.id"
          />
          <button
            @click="removeOption(qIndex, oIndex)"
            class="px-2.5 py-1.5 text-xs font-semibold rounded-lg 
         text-white bg-red-600 bg-opacity-70 
         transition-all duration-300 ease-in-out 
         shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.7)] 
         hover:-translate-y-0.5 
         hover:shadow-[6px_6px_10px_rgba(163,177,198,0.7),-6px_-6px_10px_rgba(255,255,255,0.8)] 
         active:translate-y-0 
         active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),-2px_-2px_5px_rgba(255,255,255,0.7)]"
          >
          <X class="w-4 h-4" />

          </button>
        </div>
        <button @click="addOption(question.id)" class="px-2.5 py-1.5 text-xs font-semibold rounded-lg 
         text-white bg-gray-600 bg-opacity-70 
         transition-all duration-300 ease-in-out 
         shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.7)] 
         hover:-translate-y-0.5 
         hover:shadow-[6px_6px_10px_rgba(163,177,198,0.7),-6px_-6px_10px_rgba(255,255,255,0.8)] 
         active:translate-y-0 
         active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),-2px_-2px_5px_rgba(255,255,255,0.7)]">
          Add Option
        </button>
      </div>

      <div v-if="question.type === 'input'" class="mb-5">
        <label>Correct Answer</label>
        <input
          v-model="question.correctAnswer"
          placeholder="Enter Correct Answer"
         class="bg-white bg-opacity-70 border-none rounded-lg p-3.5 w-full shadow-inner shadow-[inset_3px_3px_5px_rgba(163,177,198,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.8)] transition-all duration-300 focus:outline-none focus:shadow-[inset_5px_5px_8px_rgba(163,177,198,0.4),inset_-5px_-5px_8px_rgba(255,255,255,0.9)]"
        />
      </div>
    </div>
    <div class="flex gap-5 m-5">
      <UiButton @click="addQuestion" class="border-0 rounded-lg px-5 py-2.5 font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-[4px_4px_8px_rgba(163,177,198,0.6),_-4px_-4px_8px_rgba(255,255,255,0.7)] bg-[#3473b7] text-white hover:translate-y-[-2px] hover:shadow-[6px_6px_10px_rgba(163,177,198,0.7),_-6px_-6px_10px_rgba(255,255,255,0.8)] active:translate-y-0 active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),_-2px_-2px_5px_rgba(255,255,255,0.7)]"
        >Add Question</UiButton
      >
      <UiButton @click="publishQuiz" class="border-0 rounded-lg px-5 py-2.5 font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-[4px_4px_8px_rgba(163,177,198,0.6),_-4px_-4px_8px_rgba(255,255,255,0.7)] bg-[#248748] text-white hover:translate-y-[-2px] hover:shadow-[6px_6px_10px_rgba(163,177,198,0.7),_-6px_-6px_10px_rgba(255,255,255,0.8)] active:translate-y-0 active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),_-2px_-2px_5px_rgba(255,255,255,0.7)]"
        >Publish Quiz</UiButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRef, nextTick,shallowRef} from "vue";
import { useRouter } from "nuxt/app";
import { X } from 'lucide-vue-next';

import type { Quiz ,QuestionType} from '@/types/quiz';
import UiButton from "./ui/Button.vue";
import UiInput from "./ui/Input.vue";
const mcqButtonRef = shallowRef<HTMLElement | null>(null);
const router = useRouter(); 
const props = defineProps<{ quiz: Quiz }>();
const reactiveQuiz = toRef(props, 'quiz');
const showQuestionTypeDialog = shallowRef<boolean>(false);
const closeQuestionTypeDialog = () => {
  showQuestionTypeDialog.value = false;
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
  showQuestionTypeDialog.value = false;
};
const addQuestion = () => {
  showQuestionTypeDialog.value = true;
  nextTick(() => {
    if (mcqButtonRef.value?.$el) {
      mcqButtonRef.value.$el.focus(); // For component with internal button
    } else if (mcqButtonRef.value?.focus) {
      mcqButtonRef.value.focus(); // In case it's a native element
    }
  });
};
const publishQuiz = () => {
  // Basic validations
  if (!reactiveQuiz.value.title.trim()) {
    alert("Quiz title is required.");
    return;
  }

  if (!reactiveQuiz.value.description.trim()) {
    alert("Quiz description is required.");
    return;
  }

  if (!reactiveQuiz.value.questions.length) {
    alert("Please add at least one question.");
    return;
  }

  for (const [index, question] of reactiveQuiz.value.questions.entries()) {
    const qNum = index + 1;

    if (!question.text || !question.text.trim()) {
      alert(`Question ${qNum} must have text.`);
      return;
    }

    if (question.type === "mcq") {
      if (!question.options || question.options.length < 2) {
        alert(`Question ${qNum} must have at least two options.`);
        return;
      }

      if (!question.correctAnswer) {
        alert(`Please select the correct answer for Question ${qNum}.`);
        return;
      }

      const hasEmptyOption = question.options.some((opt) => !opt.label.trim());
      if (hasEmptyOption) {
        alert(`All options in Question ${qNum} must have text.`);
        return;
      }
    }

    if (question.type === "input") {
      if (!question.correctAnswer || !question.correctAnswer.trim()) {
        alert(`Question ${qNum} (Input Type) must have a correct answer.`);
        return;
      }
    }
  }

  const existingQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");

// If editing, update; if creating, create new
if (reactiveQuiz.value.id) {
  // Editing existing quiz
  const quizIndex = existingQuizzes.findIndex((q:Quiz) => q.id === reactiveQuiz.value.id);

  if (quizIndex !== -1) {
    existingQuizzes[quizIndex] = {
      ...reactiveQuiz.value,
      updatedAt: new Date().toISOString(), // optional: add updatedAt field
    };
  } else {
    alert("Quiz not found to update!");
    return;
  }
} else {
  // Creating a new quiz
  const newQuiz = {
    ...reactiveQuiz.value,
    id: "quiz_" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  existingQuizzes.push(newQuiz);
}

localStorage.setItem("quizzes", JSON.stringify(existingQuizzes));

alert("Quiz published successfully!");
router.push("/dashboard");
};
const removeQuestion = (qId: string) => {
  const qIndex = reactiveQuiz.value.questions.findIndex((question) => question.id === qId);

  if (qIndex !== -1) {
    // Found the question, now remove it
    reactiveQuiz.value.questions.splice(qIndex, 1);
  } else {
    alert("Question not found.");
  }
};
const froalaConfig = {
  config: {
    placeholderText: "Enter your question here...",
    charCounterCount: true,
    toolbarSticky: true,
    height: 300,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
        ],
        buttonsVisible: 3,
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
        ],
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
        ],
        buttonsVisible: 3,
      },
      moreMisc: {
        buttons: ["undo", "redo", "fullscreen", "html"],
        buttonsVisible: 2,
      },
    },
    quickInsertTags: ["image", "table", "ul", "ol", "hr"],
    imageUpload: true,
    imageUploadURL: "https://api.example.com/upload", // Replace with your upload endpoint
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
  },
  events: {
    initialized: function () {
      // "this" refers to the editor instance
      this.events.focus(); // Focus the editor
    },
  },
};
let optionIdCounter = 0;
const removeOption = (qIndex:number, oIndex:number) => {
  const question = reactiveQuiz.value.questions[qIndex];
  const removedOption = question.options[oIndex];

  // ✅ If removed option was the correct answer, reset correctAnswer
  if (question.correctAnswer === removedOption.id) {
    question.correctAnswer = "";
  }

  question.options.splice(oIndex, 1);
};
const addOption = async(qId: string) => {
  const question = reactiveQuiz.value.questions.find(q => q.id === qId);

  if (!question) {
    alert('Question not found.');
    return;
  }

  if (question.type !== 'mcq') {
    alert('Can only add options to MCQ type questions.');
    return;
  }

  const newOption = {
    id: "opt_" + optionIdCounter++,
    label: "",
  };

  // Force Vue to detect the array change
  question.options = [...(question.options || []), newOption];
  await nextTick();

  const input = document.getElementById(`option-${newOption.id}`) as HTMLInputElement;
  if (input) {
    input.focus();
  }
};



</script>     