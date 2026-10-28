<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Badge } from 'frappe-ui'

// Preview other looks with ?badge=<variant>-<theme>, e.g. ?badge=solid-gray.
const route = useRoute()
const look = computed(() => {
  const [variant, theme] = String(route.query.badge || 'solid-violet').split('-')
  return { variant, theme }
})
</script>

<template>
  <Badge label="2-day live cohort" :theme="look.theme" :variant="look.variant" size="lg">
    <template #prefix>
      <span class="size-1.5 rounded-full bg-current" aria-hidden="true" />
    </template>
  </Badge>
</template>
