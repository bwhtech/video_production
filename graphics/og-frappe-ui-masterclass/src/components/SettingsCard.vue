<script setup>
import { ref } from 'vue'
import { Button, KeyboardShortcut, Switch } from 'frappe-ui'

const darkTheme = ref(true)
</script>

<template>
  <!-- Same surface ChartCard draws, so both cards read as one family. -->
  <div class="flex w-56 flex-col gap-3 rounded-4 border border-outline-gray-1 bg-surface-elevation-2 p-4 shadow-lg">
    <Switch v-model="darkTheme" label="Dark theme" />
    <div class="flex items-center justify-between">
      <span class="text-base text-ink-gray-7">Search</span>
      <KeyboardShortcut combo="Mod+K" bg />
    </div>
    <div class="flex gap-2 pt-1">
      <Button variant="solid" size="md" label="Save" />
      <Button variant="outline" size="md" label="Cancel" />
    </div>
  </div>
</template>
