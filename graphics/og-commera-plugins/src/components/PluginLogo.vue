<script setup>
defineProps({ icon: { type: String, default: 'lucide-shopping-cart' } })
</script>

<template>
  <span class="flex size-4 items-center justify-center rounded-1 bg-green-500 text-white">
    <span :class="icon" class="size-3" aria-hidden="true" />
  </span>
</template>
