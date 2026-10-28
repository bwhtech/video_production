<script setup>
import CohortBadge from './CohortBadge.vue'
import RevenueCard from './RevenueCard.vue'
import SettingsCard from './SettingsCard.vue'
import Portrait from './Portrait.vue'
import BrandFooter from './BrandFooter.vue'

defineProps({ layer: { type: String, default: 'base' } })
</script>

<template>
  <div class="relative overflow-hidden" :class="{ 'bg-surface-gray-1': layer === 'base' }" style="width: 1080px; height: 1350px">
    <div v-if="layer === 'overlay'" class="absolute inset-x-0 flex justify-center" style="top: 108px">
      <div style="zoom: 1.6"><CohortBadge /></div>
    </div>
    <template v-if="layer === 'base'">
    <h1 class="title absolute inset-x-0 text-center text-ink-gray-9" style="top: 192px; font-size: 110px">
      Frappe UI<br />Masterclass
    </h1>
    <Portrait class="absolute" style="left: 290px; top: 530px" :size="500" />
    <div class="absolute" style="left: 744px; top: 580px">
      <div style="zoom: 1.25"><SettingsCard /></div>
    </div>
    <div class="absolute" style="left: 48px; top: 840px">
      <div style="zoom: 1.1"><RevenueCard :height="260" /></div>
    </div>
    <BrandFooter class="absolute" style="left: 80px; right: 80px; top: 1212px; height: 48px; font-size: 24px" />
    </template>
  </div>
</template>

<style scoped>
.title {
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 0.96;
}
</style>
