<template>
  <div class="creation-panel">
    <h1 class="title">Create a Quiz</h1>
    <div class="form-group">
      <label for="quiz-title">Quiz Title</label>
      <UiInput
        v-model="reactiveQuiz.title"
        id="quiz-title"
        name="quiz-title"
        class="glass-input"
        variant="glass"
        placeholder="Enter quiz title"
        aria-label="Quiz Title"
      />
    </div>

    <div class="form-group">
      <label for="quiz-description">Quiz Description</label>
      <textarea
        v-model="reactiveQuiz.description"
        id="quiz-description"
        class="glass-input"
        placeholder="Enter quiz description"
        aria-label="Quiz Description"
      ></textarea>
    </div>

    <div
      v-if="showQuestionTypeDialog"
      class="modal-overlay"
      @click.self="closeQuestionTypeDialog"
    >
      <div class="modal-content glass-panel">
        <!-- ❌ Close Button -->

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h3>Select Question Type</h3>
          <button class="modal-close-button" @click="closeQuestionTypeDialog">
            ×
          </button>
        </div>

        <div class="type-options">
          <UiButton
            ref="mcqButtonRef"
            @click="selectQuestionType('mcq')"
            class="glass-button"
          >
            Multiple Choice
          </UiButton>
          <UiButton @click="selectQuestionType('input')" class="glass-button">
            Text Input
          </UiButton>
        </div>
      </div>
    </div>

    <div
      v-for="(question, qIndex) in reactiveQuiz.questions"
      :key="qIndex"
      class="question-container glass-panel"
    >
      <div class="question-header">
        <h3>Question {{ qIndex + 1 }}</h3>
        <button
          @click="removeQuestion(qIndex)"
          class="glass-button danger small"
        >
          Remove
        </button>
      </div>

      <div class="form-group">
        <label>Question Text</label>

        <froala v-model:value="question.text" :config="froalaConfig" />
      </div>

      <div v-if="question.type === 'mcq'" class="options-section">
        <div
          v-for="(option, oIndex) in question.options"
          :key="oIndex"
          class="option-row"
        >
          <UiInput
            v-model="question.options[oIndex].label"
            placeholder="Enter option"
            class="glass-input small"
            variant="glass"
          />
          <input
            type="radio"
            :name="'correctAnswer_' + qIndex"
            :value="option.id"
            v-model="question.correctAnswer"
            class="radio-input"
            :tabindex="0"
            @keydown.enter="question.correctAnswer = option.id"
          />
          <button
            @click="removeOption(qIndex, oIndex)"
            class="glass-button danger small"
          >
            ×
          </button>
        </div>
        <button @click="addOption(qIndex)" class="glass-button secondary small">
          Add Option
        </button>
      </div>

      <div v-if="question.type === 'input'" class="form-group">
        <label>Correct Answer</label>
        <input
          v-model="question.correctAnswer"
          placeholder="Enter Correct Answer"
          class="glass-input"
        />
      </div>
    </div>
    <div class="action-buttons">
      <UiButton @click="addQuestion" class="glass-button primary"
        >Add Question</UiButton
      >
      <UiButton @click="publishQuiz" class="glass-button success"
        >Publish Quiz</UiButton
      >
    </div>
  </div>
</template>
<script setup>
import { toRef, nextTick, ref } from "vue";
import { useRouter } from "nuxt/app";
import UiButton from "./ui/Button.vue";
import UiInput from "./ui/Input.vue";
const mcqButtonRef = ref(null);
const router = useRouter(); // ✅ Nuxt router
const props = defineProps({ quiz: Object });
const reactiveQuiz = toRef(() => props.quiz);
const showQuestionTypeDialog = ref(false);
const closeQuestionTypeDialog = () => {
  showQuestionTypeDialog.value = false;
};

const pendingEditorFocus = ref(null);

const selectQuestionType = (type) => {
  const newQuestion = {
    text: "",
    type,
    options: type === "mcq" ? [] : [],
    correctAnswer: null,
  };

  reactiveQuiz.value.questions.push(newQuestion);
  const newIndex = reactiveQuiz.value.questions.length - 1;
  pendingEditorFocus.value = newIndex;

  showQuestionTypeDialog.value = false;

  nextTick(() => {
    const froalaRef = "froala_" + newIndex;
    const froalaInstance = Array.isArray($refs[froalaRef])
      ? $refs[froalaRef][0]
      : $refs[froalaRef];

    if (froalaInstance?.$el?.querySelector(".fr-element")) {
      froalaInstance.$el.querySelector(".fr-element").focus();
    }
  });
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

  // Save to localStorage
  const quizToSave = {
    ...reactiveQuiz.value,
    id: "quiz_" + Date.now(),
    createdAt: new Date().toISOString(),
  };

  const existingQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  existingQuizzes.push(quizToSave);
  localStorage.setItem("quizzes", JSON.stringify(existingQuizzes));

  alert("Quiz published successfully!");
  router.push("/dashboard");
};

const removeQuestion = (qIndex) => {
  reactiveQuiz.value.questions.splice(qIndex, 1);
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
const removeOption = (qIndex, oIndex) => {
  const question = reactiveQuiz.value.questions[qIndex];
  const removedOption = question.options[oIndex];

  // ✅ If removed option was the correct answer, reset correctAnswer
  if (question.correctAnswer === removedOption.id) {
    question.correctAnswer = "";
  }

  question.options.splice(oIndex, 1);
};
const addOption = (qIndex) => {
  reactiveQuiz.value.questions[qIndex].options.push({
    id: "opt_" + optionIdCounter++,
    label: "",
  });
};
</script>
