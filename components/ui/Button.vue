<script setup>
const buttonRef = ref(null);
defineExpose({
  focus: () => buttonRef.value?.focus(),
});
defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "glass",
      ].includes(value),
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["default", "sm", "lg", "icon"].includes(value),
  },
});
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      // Variants
      {
        'bg-primary text-primary-foreground hover:bg-primary/90 shadow':
          variant === 'default',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80':
          variant === 'secondary',
        'bg-destructive text-destructive-foreground hover:bg-destructive/90':
          variant === 'destructive',
        'border border-input hover:bg-accent hover:text-accent-foreground':
          variant === 'outline',
        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        'underline-offset-4 hover:underline text-primary': variant === 'link',
        // Glass variant to match your current design
        'glass-button bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-lg':
          variant === 'glass',
        'glass-button-danger bg-rose-500/10 backdrop-blur-md border border-rose-500/20 hover:bg-rose-500/20':
          variant === 'glass-danger',
      },
      // Sizes
      {
        'h-10 py-2 px-4': size === 'default',
        'h-8 px-3 rounded-md text-xs': size === 'sm',
        'h-11 px-8 rounded-md': size === 'lg',
        'h-10 w-10': size === 'icon',
      },
    ]"
  >
    <slot />
  </button>
</template>
