<script setup>
import CohortBadge from './CohortBadge.vue'
import RevenueCard from './RevenueCard.vue'
import SettingsCard from './SettingsCard.vue'
import Portrait from './Portrait.vue'
import BrandFooter from './BrandFooter.vue'

defineProps({ layer: { type: String, default: 'base' } })
</script>

<template>
  <div class="relative overflow-hidden" :class="{ 'bg-surface-gray-1': layer === 'base' }" style="width: 1200px; height: 630px">
    <div v-if="layer === 'overlay'" class="absolute inset-x-0 flex justify-center" style="top: 46px">
      <div style="zoom: 1.25"><CohortBadge /></div>
    </div>
    <template v-if="layer === 'base'">
    <h1 class="title absolute inset-x-0 text-center text-ink-gray-9" style="top: 100px; font-size: 68px">
      Frappe UI Masterclass
    </h1>
    <div class="absolute" style="left: 172px; top: 268px">
      <div style="zoom: 1"><RevenueCard /></div>
    </div>
    <Portrait class="absolute" style="left: 475px; top: 238px" :size="250" />
    <div class="absolute" style="left: 761px; top: 278px">
      <div style="zoom: 1.03"><SettingsCard /></div>
    </div>
    <BrandFooter class="absolute" style="left: 72px; right: 72px; top: 554px; height: 36px; font-size: 21px" />
    </template>
  </div>
</template>

<style scoped>
.title {
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
}
</style>
