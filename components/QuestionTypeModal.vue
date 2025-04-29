<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]"
      @click.self="onClose"
    >
      <div class="bg-white/70 backdrop-blur-[10px] rounded-[15px] p-5 w-[400px] max-w-[90%]">
        <div class="flex justify-between items-center">
          <h3>Select Question Type</h3>
          <button
            class="px-2.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-red-600 bg-opacity-70 transition-all duration-300 ease-in-out shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 hover:shadow-[6px_6px_10px_rgba(163,177,198,0.7),-6px_-6px_10px_rgba(255,255,255,0.8)] active:translate-y-0 active:shadow-[2px_2px_5px_rgba(163,177,198,0.6),-2px_-2px_5px_rgba(255,255,255,0.7)]"
            @click="onClose"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
  
        <div class="flex justify-center gap-4 mt-5">
          <UiButton
            @click="() => selectType('mcq')"
            ref="mcqButton"
            class="bg-white bg-opacity-70 border-none rounded-lg py-2.5 px-5 font-semibold cursor-pointer shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-sm"
          >
            Multiple Choice
          </UiButton>
          <UiButton
            @click="() => selectType('input')"
            class="bg-white bg-opacity-70 border-none rounded-lg py-2.5 px-5 font-semibold cursor-pointer shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 active:shadow-sm"
          >
            Text Input
          </UiButton>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  import { X } from 'lucide-vue-next' // or wherever your X icon is from
import type { QuestionType } from '~/types/quiz';
  const mcqButton = ref<HTMLElement | null>(null);
  const props = defineProps({
    show: Boolean,
  });
  defineExpose({
  mcqButton
})

  
  const emit = defineEmits(['close', 'select'])
  
  const onClose = () => emit('close')
  const selectType = (type:QuestionType) => emit('select', type)
  </script>
  
