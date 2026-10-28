<script setup>
import SplitTheme from '../components/SplitTheme.vue'
import LinkedInLayout from '../components/LinkedInLayout.vue'
</script>

<template>
  <SplitTheme v-slot="{ layer }" :width="1080" :height="1350"><LinkedInLayout :layer="layer" /></SplitTheme>
</template>
