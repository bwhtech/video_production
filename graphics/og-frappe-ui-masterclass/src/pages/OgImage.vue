<script setup>
import SplitTheme from '../components/SplitTheme.vue'
import OgLayout from '../components/OgLayout.vue'
</script>

<template>
  <SplitTheme v-slot="{ layer }" :width="1200" :height="630"><OgLayout :layer="layer" /></SplitTheme>
</template>
