<script setup>
// Renders the slot three times, stacked:
//   base (light), base (dark) clipped to the right half, then the overlay once.
// frappe-ui scopes its tokens to any [data-theme] element, so each base copy
// draws the real components in its own theme. Elements that must not be cut
// by the seam (the badge) render in the overlay layer only.
import { useRoute } from 'vue-router'

defineProps({ width: { type: Number, required: true }, height: { type: Number, required: true } })
// ?overlay=dark draws the overlay (badge) in dark theme instead.
const route = useRoute()
</script>

<template>
  <div id="frame" class="relative overflow-hidden" :style="{ width: `${width}px`, height: `${height}px` }">
    <div class="absolute inset-0" data-theme="light"><slot layer="base" /></div>
    <div class="absolute inset-0" data-theme="dark" style="clip-path: inset(0 0 0 50%)" aria-hidden="true">
      <slot layer="base" />
    </div>
    <div class="absolute inset-0" :data-theme="route.query.overlay === 'dark' ? 'dark' : 'light'"><slot layer="overlay" /></div>
  </div>
</template>
