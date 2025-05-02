<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "glass", "ghost"].includes(value),
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "sm", "lg"].includes(value),
  },
});
const innerInput = ref(null);

defineExpose({
  focus: () => innerInput.value?.focus(),
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    ref="innerInput"
    v-bind="$attrs"
    @input="handleInput"
    :class="[
      'flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
      // Variants
      {
        'border-input bg-background hover:border-primary/50':
          variant === 'default',
        'glass-input bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30':
          variant === 'glass',
        'border-transparent hover:bg-accent hover:text-accent-foreground':
          variant === 'ghost',
      },
      // Sizes
      {
        'h-10 py-2 px-4': size === 'default',
        'h-8 px-3 text-xs': size === 'sm',
        'h-12 px-4 text-base': size === 'lg',
      },
    ]"
  />
</template>
