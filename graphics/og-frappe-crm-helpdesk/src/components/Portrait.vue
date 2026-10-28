<script setup>
defineProps({
  size: { type: Number, required: true },
  src: { type: String, required: true },
  name: { type: String, required: true },
})
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div class="rounded-full bg-surface-base p-1.5 shadow-xl" :style="{ width: `${size}px`, height: `${size}px` }">
      <img :src="src" :alt="name" class="size-full rounded-full object-cover" />
    </div>
    <span class="text-lg font-medium text-ink-gray-8">{{ name }}</span>
  </div>
</template>
