<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]"
    @click.self="onClose"
  >
    <div
      class="bg-white/70 backdrop-blur-[10px] rounded-[15px] p-5 w-[400px] max-w-[90%]"
    >
      <div class="flex justify-between items-center">
        <h3>Select Question Type</h3>
        <UiButton
          class="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-white-600 bg-red-600 bg-opacity-70 "
          @click="onClose"
        >
          <X class="w-4 h-4 text-white" />
        </UiButton>
      </div>

      <div class="flex justify-center gap-4 mt-5">
        <UiButton
          @click="() => selectType(QuesType.MCQ)"
          ref="mcqButton"
          class="bg-white bg-opacity-70 border-none rounded-lg py-2.5 px-5 font-semibold cursor-pointer shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-sm"
        >
          Multiple Choice
        </UiButton>
        <UiButton
          @click="() => selectType(QuesType.INPUT)"
          class="bg-white bg-opacity-70 border-none rounded-lg py-2.5 px-5 font-semibold cursor-pointer shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-sm"
        >
          Text Input
        </UiButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const mcqButton = shallowRef<HTMLElement | null>(null);
const props = defineProps({
  show: Boolean,
});
defineExpose({
  mcqButton,
});
const emit = defineEmits(["close", "select"]);
const onClose = () => emit("close");
const selectType = (type: QuestionType) => emit("select", type);
</script>
