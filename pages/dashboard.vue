<template>
  <div class="p-6">
    <!-- Header -->
    <div>
      <div class="m-14-16-24-24">
        <h1
          class="text-[36px] font-extrabold text-gray-900 tracking-tight leading-tight p-4"
          style="font-family: 'Work Sans', Roboto, Helvetica, Arial, sans-serif"
        >
          Dashboard
        </h1>
      </div>
      <div class="flex justify-end mr-8 p-4">
        <UiButton
          variant="glass"
          size="lg"
          class="mb-4"
          style="border: 1px solid black"
        >
          <NuxtLink to="/create-quiz">Create Quiz</NuxtLink>
        </UiButton>
      </div>
      <div style="background-color: rgb(241, 239, 238)" class="m-6 p-6">
        <div class="flex space-x-3 justify-end mb-4">
          <UiButton
            @click="prev"
            :disabled="currentSlide === 0"
            :class="[
              'p-2 rounded-full border transition',
              currentSlide === 0
                ? 'opacity-40 cursor-not-allowed border-gray-200'
                : 'hover:bg-gray-100 border-gray-300',
            ]"
            style="border: 1px solid black"
          >
            <ChevronLeft class="w-5 h-5" />
          </UiButton>
          <UiButton
            @click="next"
            :disabled="currentSlide === maxSlide"
            :class="[
              'p-2 rounded-full border transition',
              currentSlide === maxSlide
                ? 'opacity-40 cursor-not-allowed border-gray-200'
                : 'hover:bg-gray-100 border-gray-300',
            ]"
            style="border: 1px solid black"
          >
            <ChevronRight class="w-5 h-5" />
          </UiButton>
        </div>
        <div ref="sliderRef" class="keen-slider">
          <div
            v-for="(quiz, index) in quizzes"
            :key="quiz.id"
            class="keen-slider__slide px-2 relative"
          >
            <div
              class="bg-white shadow-md rounded-lg p-5 min-h-[160px] flex flex-col justify-between relative"
            >
              <!-- 3-dot icon -->
              <div class="absolute top-3 right-3 z-20">
                <button
                  @click="toggleMenu(index)"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <MoreVertical class="w-5 h-5" />
                </button>

                <!-- Dropdown -->
                <div
                  v-if="activeMenuIndex === index"
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
                        questions: quiz.questions,
                      },
                    }"
                    class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    @click="activeMenuIndex = null"
                  >
                    Edit Quiz
                  </NuxtLink>
                  <button
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    @click="deleteQuiz(index)"
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

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useKeenSlider } from "keen-slider/vue";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-vue-next";

const quizzes = ref([]);
const currentSlide = ref(0);
const maxSlide = ref(0);
const activeMenuIndex = ref(null);

// Keen slider
const [sliderRef, slider] = useKeenSlider({
  loop: false,
  slides: {
    perView: 3,
    spacing: 24,
  },
  breakpoints: {
    "(max-width: 1024px)": {
      slides: { perView: 2, spacing: 16 },
    },
    "(max-width: 768px)": {
      slides: { perView: 1, spacing: 12 },
    },
  },
  slideChanged(sliderInstance) {
    currentSlide.value = sliderInstance.track.details.rel;
    maxSlide.value = sliderInstance.track.details.maxIdx;
  },
});

const next = () => {
  if (slider.value) slider.value.next();
};

const prev = () => {
  if (slider.value) slider.value.prev();
};

// Toggle 3-dot menu
const toggleMenu = (index) => {
  activeMenuIndex.value = activeMenuIndex.value === index ? null : index;
};

// Load quizzes from localStorage
const loadQuizzes = () => {
  const stored = localStorage.getItem("quizzes");
  if (stored) {
    try {
      quizzes.value = JSON.parse(stored);
    } catch (e) {
      console.error("Invalid JSON in localStorage.");
    }
  }
};
// Delete quiz
const deleteQuiz = (index) => {
  quizzes.value.splice(index, 1);
  localStorage.setItem("quizzes", JSON.stringify(quizzes.value));
  activeMenuIndex.value = null;
  nextTick(() => {
    slider.value?.update();
  });
};

// Load on mount
onMounted(async () => {
  loadQuizzes();
  await nextTick();
  slider.value?.update();

  if (slider.value?.track?.details) {
    currentSlide.value = slider.value.track.details.rel;
    maxSlide.value = slider.value.track.details.maxIdx;
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");
.keen-slider__slide {
  min-width: 0;
}
</style>
