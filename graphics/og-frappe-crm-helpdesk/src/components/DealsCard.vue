<script setup>
import { Avatar, Badge } from 'frappe-ui'

const deals = [
  { org: 'Acme Corp', amount: '₹4,80,000', status: 'Negotiation', theme: 'amber' },
  { org: 'Globex', amount: '₹2,15,000', status: 'Demo', theme: 'blue' },
  { org: 'Initech', amount: '₹1,60,000', status: 'Won', theme: 'green' },
]
</script>

<template>
  <div class="w-72 rounded-4 border border-outline-gray-1 bg-surface-elevation-2 px-4 py-3 shadow-lg">
    <div class="flex items-center gap-2">
      <img src="/crm-logo.svg" alt="" class="size-4" />
      <span class="text-base font-medium text-ink-gray-9">Deals</span>
      <span class="ml-auto text-sm text-ink-gray-5">₹8.5L open</span>
    </div>
    <div class="mt-2">
      <div v-for="deal in deals" :key="deal.org" class="flex items-center gap-2.5 border-t border-outline-gray-1 py-2.5 first:border-t-0">
        <Avatar :label="deal.org" size="md" shape="square" />
        <div class="min-w-0 flex-1">
          <div class="truncate text-base text-ink-gray-8">{{ deal.org }}</div>
          <div class="text-sm text-ink-gray-5 tabular-nums">{{ deal.amount }}</div>
        </div>
        <Badge :label="deal.status" :theme="deal.theme" />
      </div>
    </div>
  </div>
</template>
