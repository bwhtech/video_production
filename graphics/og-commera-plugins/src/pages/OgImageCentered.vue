<script setup>
import { onMounted, ref } from 'vue'
import CommeraWindow from '../components/CommeraWindow.vue'

const HEIGHT = 630
const ZOOM = 1.4

const frame = ref(null)
const commera = ref(null)
const shift = ref(0)

// Slide the full sidebar so the Plugins section sits on the image's vertical center.
onMounted(() => {
  requestAnimationFrame(() => {
    const top = frame.value.getBoundingClientRect().top
    const section = commera.value.plugins.getBoundingClientRect()
    shift.value = HEIGHT / 2 - (section.top - top + section.height / 2)
  })
})
</script>

<template>
  <div class="relative overflow-hidden bg-surface-gray-1" :style="{ width: '1200px', height: `${HEIGHT}px` }">
    <div class="absolute flex flex-col" style="left: 72px; top: 72px; bottom: 64px; width: 470px">
      <div class="flex items-center gap-3">
        <img src="/commera.svg" alt="" class="size-10" />
        <span class="text-3xl font-semibold text-ink-gray-9">Commera</span>
      </div>
      <h1 class="title mt-10 text-ink-gray-9">Plugin<br />System</h1>
      <p class="mt-6 text-ink-gray-6" style="font-size: 26px; line-height: 1.35">
        Custom Frappe apps that plug right into your store dashboard.
      </p>
      <div class="mt-auto self-start rounded-5 bg-surface-gray-3 px-4 py-2.5 font-mono text-ink-gray-8" style="font-size: 22px">
        <span class="text-ink-gray-5">$</span> bench commera init
      </div>
    </div>

    <div ref="frame" class="absolute inset-y-0 overflow-hidden border-l border-outline-gray-3" style="left: 590px; right: 0">
      <div :style="{ transform: `translateY(${shift}px)` }">
        <div :style="{ zoom: ZOOM, height: '1000px' }"><CommeraWindow ref="commera" full :main-inset="-shift / ZOOM" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 84px;
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 0.98;
}
</style>
