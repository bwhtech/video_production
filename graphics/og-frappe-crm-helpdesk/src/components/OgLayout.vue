<script setup>
import CohortBadge from './CohortBadge.vue'
import DealsCard from './DealsCard.vue'
import TicketsCard from './TicketsCard.vue'
import Portrait from './Portrait.vue'
import BrandFooter from './BrandFooter.vue'
</script>

<template>
  <div class="relative overflow-hidden bg-surface-gray-1" style="width: 1200px; height: 630px">
    <div class="absolute inset-x-0 flex justify-center" style="top: 46px">
      <div style="zoom: 1.25"><CohortBadge /></div>
    </div>
    <h1 class="title absolute inset-x-0 text-center text-ink-gray-9" style="top: 100px; font-size: 60px">
      Frappe CRM &amp; Helpdesk Masterclass
    </h1>
    <div class="absolute" style="left: 92px; top: 262px"><DealsCard /></div>
    <div class="absolute flex" style="left: 435px; top: 236px; gap: 40px">
      <Portrait src="/shivam.jpg" name="Shivam Ghosh" :size="150" />
      <Portrait src="/hussain.png" name="Hussain Nagaria" :size="150" />
    </div>
    <div class="absolute" style="right: 92px; top: 262px"><TicketsCard /></div>
    <BrandFooter class="absolute" style="left: 72px; right: 72px; top: 554px; height: 36px; font-size: 21px" />
  </div>
</template>

<style scoped>
.title {
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
}
</style>
