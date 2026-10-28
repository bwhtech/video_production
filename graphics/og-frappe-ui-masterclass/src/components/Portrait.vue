<script setup>
import { computed } from 'vue'

// Ring and gap keep the original 500px proportions: 9px ring, 8px gap.
const props = defineProps({ size: { type: Number, required: true } })
const ring = computed(() => `${(props.size * 9) / 500}px`)
const gap = computed(() => `${(props.size * 8) / 500}px`)
</script>

<template>
  <div class="portrait-ring rounded-full" :style="{ width: `${size}px`, height: `${size}px`, padding: ring }">
    <div class="size-full rounded-full bg-surface-gray-1" :style="{ padding: gap }">
      <img src="/portrait.png" alt="Hussain" class="size-full rounded-full object-cover" />
    </div>
  </div>
</template>

<style scoped>
.portrait-ring {
  /* The Frappe UI logo violet, fading up to a pale tint. */
  background: linear-gradient(195deg, #efe0fb 0%, #c988fc 55%, #b352ff 100%);
}
</style>
