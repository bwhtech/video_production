<script setup>
import { BarChart } from 'frappe-ui/charts'

defineProps({ height: { type: Number, default: 224 } })

// Long data, stacked: one row per month per stream. The chart picks the
// colors from frappe-ui's categorical palette, so nothing is overridden here.
const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
const streams = {
  // Sums to ₹420k, the ₹4.2L in the subtitle.
  Courses: [32, 36, 34, 40, 46, 52],
  Cohorts: [18, 22, 30, 28, 36, 46],
}
const data = months.flatMap((month, i) =>
  Object.entries(streams).map(([stream, values]) => ({ month, stream, amount: values[i] })),
)
const yAxis = { format: (v) => `₹${v}k` }
// Static image: draw the final frame straight away.
const echartOptions = { animation: false }
</script>

<template>
  <!-- BarChart draws no surface of its own: use the one ChartCard draws. -->
  <div :style="{ height: `${height}px` }" class="w-72 rounded-4 border border-outline-gray-1 bg-surface-elevation-2 px-4 py-3 shadow-lg">
    <BarChart
      title="Revenue"
      subtitle="₹4.2L this half"
      :data="data"
      x="month"
      y="amount"
      series="stream"
      stacked
      palette="categorical"
      :y-axis="yAxis"
      :echart-options="echartOptions"
    />
  </div>
</template>
