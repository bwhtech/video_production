<script setup>
import HrWindow from '../components/HrWindow.vue'
</script>

<template>
  <div class="relative overflow-hidden bg-surface-gray-1" style="width: 1200px; height: 630px">
    <div class="absolute flex flex-col" style="left: 72px; top: 72px; bottom: 64px; width: 450px">
      <div class="flex items-center gap-3">
        <img src="/frappe-hr-logo.svg" alt="" class="size-10" />
        <span class="text-3xl font-semibold text-ink-gray-9">Frappe HR</span>
      </div>
      <h1 class="title mt-10 text-ink-gray-9">HR &amp; Payroll<br />Training</h1>
      <p class="mt-6 text-ink-gray-6" style="font-size: 26px; line-height: 1.35">
        Set up Frappe HR and run payroll for a company, start to end.
      </p>
      <div class="mt-auto flex items-center gap-3" style="font-size: 22px">
        <img src="/frappe-school-logo.png" alt="" class="size-8" />
        <span class="font-semibold text-ink-gray-8">Frappe School</span>
      </div>
    </div>

    <div
      class="window absolute overflow-hidden rounded-tl-7 border-l border-t border-outline-gray-3 shadow-xl"
      style="left: 568px; top: 64px; width: 632px; height: 640px"
    >
      <div style="zoom: 1.15; height: calc(640px / 1.15)"><HrWindow /></div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 76px;
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 0.98;
}
</style>
