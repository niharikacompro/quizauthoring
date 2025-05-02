<template>
  <div class="flex-1 p-5 m-6">
    <h1 class="mb-5">Create a Quiz</h1>
    <div class="mb-5">
      <label for="quiz-title">Quiz Title</label>
      <UiInput
        v-model="QuizData.title"
        id="quiz-title"
        name="quiz-title"
        class="w-full px-[15px] py-[12px] rounded-[8px] bg-white/70 border-none"
        variant="glass"
        placeholder="Enter quiz title"
        aria-label="Quiz Title"
      />
    </div>
    <div class="mb-5">
      <label for="quiz-description">Quiz Description</label>
      <textarea
        v-model="QuizData.description"
        id="quiz-description"
        class="w-full px-[15px] py-[12px] rounded-[8px] bg-white/70 border-none"
        placeholder="Enter quiz description"
        aria-label="Quiz Description"
      ></textarea>
    </div>
    <QuestionTypeModal
      ref="questionTypeModalRef"
      :show="showQuestionTypeDialog"
      @close="closeQuestionTypeDialog"
      @select="selectQuestionType"
    />
    <div
      v-for="(question, qIndex) in QuizData.questions"
      :key="question.id"
      class="mb-5 bg-white bg-opacity-70 backdrop-blur-lg rounded-xl p-5"
    >
      <div class="flex justify-between items-center mb-4">
        <h3>Question {{ qIndex + 1 }}</h3>
        <button
          @click="removeQuestion(question.id)"
          class="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-red-600 bg-opacity-70"
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
            class="bg-white bg-opacity-70 border-0 rounded-lg p-3 w-full p-1.5"
            :ref="(el) => setOptionRef(el, option.id)"
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
            class="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-red-600 bg-opacity-70"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
        <button
          @click="addOption(question.id)"
          class="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-gray-600 bg-opacity-70"
        >
          Add Option
        </button>
      </div>
      <div v-if="question.type === 'input'" class="mb-5">
        <label>Correct Answer</label>
        <input
          v-model="question.correctAnswer"
          placeholder="Enter Correct Answer"
          class="bg-white bg-opacity-70 border-none rounded-lg p-3.5 w-full"
        />
      </div>
    </div>
    <div class="flex gap-5 m-5">
      <UiButton
        @click="addQuestion"
        class="border-0 rounded-lg px-5 py-2.5 font-semibold cursor-pointer bg-[#3473b7] text-white"
        >Add Question</UiButton
      >
      <UiButton
        @click="publishQuiz"
        class="border-0 rounded-lg px-5 py-2.5 font-semibold cursor-pointer bg-[#248748] text-white"
        >Publish Quiz</UiButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { X } from "lucide-vue-next";
const questionTypeModalRef = ref<QuestionTypeModalExposed | null>(null);
const router = useRouter();
const props = defineProps<{ quiz: Quiz }>();
const QuizData = toRef(props, "quiz");
const showQuestionTypeDialog = shallowRef<boolean>(false);
const optionRefs = shallowRef<Record<string, HTMLInputElement | null>>({});
const setOptionRef = (el: HTMLInputElement | null, optionId: string) => {
  if (el) {
    optionRefs.value[optionId] = el;
  }
};
const closeQuestionTypeDialog = () => {
  showQuestionTypeDialog.value = false;
};
const selectQuestionType = (type: QuestionType) => {
  const newQuestion = {
    id: "q_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    text: "",
    type: type,
    options: type === "mcq" ? [] : [],
    correctAnswer: "",
  };

  QuizData.value.questions.push(newQuestion);
  showQuestionTypeDialog.value = false;
};
const addQuestion = () => {
  showQuestionTypeDialog.value = true;
  nextTick(() => {
    const exposed = questionTypeModalRef.value;
    if (!exposed) return;

    // Handle both native and component-wrapped elements
    const mcqEl = (exposed.mcqButton as any)?.$el ?? exposed.mcqButton;
    (mcqEl as HTMLElement | null)?.focus?.();
  });
};
const publishQuiz = () => {
  // Basic validations
  if (!QuizData.value.title.trim()) {
    alert("Quiz title is required.");
    return;
  }

  if (!QuizData.value.description.trim()) {
    alert("Quiz description is required.");
    return;
  }

  if (!QuizData.value.questions.length) {
    alert("Please add at least one question.");
    return;
  }

  for (const [index, question] of QuizData.value.questions.entries()) {
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

  const existingQuizzes = JSON.parse(
    localStorage.getItem(LocalStorageKeys.QUIZZES) || "[]"
  );

  // If editing, update; if creating, create new
  if (QuizData.value.id) {
    // Editing existing quiz
    const quizIndex = existingQuizzes.findIndex(
      (q: Quiz) => q.id === QuizData.value.id
    );

    if (quizIndex !== -1) {
      existingQuizzes[quizIndex] = {
        ...QuizData.value,
        updatedAt: new Date().toISOString(), // optional: add updatedAt field
      };
    } else {
      alert("Quiz not found to update!");
      return;
    }
  } else {
    // Creating a new quiz
    const newQuiz = {
      ...QuizData.value,
      id: "quiz_" + Date.now(),
      createdAt: new Date().toISOString(),
    };
    existingQuizzes.push(newQuiz);
  }

  localStorage.setItem(
    LocalStorageKeys.QUIZZES,
    JSON.stringify(existingQuizzes)
  );

  alert("Quiz published successfully!");
  router.push("/dashboard");
};
const removeQuestion = (qId: string) => {
  const qIndex = QuizData.value.questions.findIndex(
    (question) => question.id === qId
  );

  if (qIndex !== -1) {
    // Found the question, now remove it
    QuizData.value.questions.splice(qIndex, 1);
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
const removeOption = (qIndex: number, oIndex: number) => {
  const question = QuizData.value.questions[qIndex];
  const removedOption = question.options[oIndex];

  // ✅ If removed option was the correct answer, reset correctAnswer
  if (question.correctAnswer === removedOption.id) {
    question.correctAnswer = "";
  }

  question.options.splice(oIndex, 1);
};
const addOption = async (qId: string) => {
  const question = QuizData.value.questions.find((q) => q.id === qId);

  if (!question) {
    alert("Question not found.");
    return;
  }

  if (question.type !== "mcq") {
    alert("Can only add options to MCQ type questions.");
    return;
  }

  const newOption = {
    id: "opt_" + optionIdCounter++,
    label: "",
  };

  // Force Vue to detect the array change
  question.options = [...(question.options || []), newOption];
  await nextTick();

  /* const input = document.getElementById(
    `option-${newOption.id}`
  ) as HTMLInputElement;*/
  const input = optionRefs.value[newOption.id];
  if (input) {
    input.focus();
  }
};
</script>
