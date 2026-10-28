<script setup>
import { Badge } from 'frappe-ui'

const tickets = [
  { id: 1042, subject: 'Unable to log in to portal', sla: 'Due in 2h', priority: 'Urgent', theme: 'red' },
  { id: 1041, subject: 'Invoice PDF is missing', sla: 'Due in 6h', priority: 'High', theme: 'amber' },
  { id: 1039, subject: 'Refund for order #882', sla: 'Resolved', priority: 'Low', theme: 'gray' },
]
</script>

<template>
  <div class="w-72 rounded-4 border border-outline-gray-1 bg-surface-elevation-2 px-4 py-3 shadow-lg">
    <div class="flex items-center gap-2">
      <img src="/helpdesk-logo.svg" alt="" class="size-4" />
      <span class="text-base font-medium text-ink-gray-9">Tickets</span>
      <span class="ml-auto text-sm text-ink-gray-5">12 open</span>
    </div>
    <div class="mt-2">
      <div v-for="ticket in tickets" :key="ticket.id" class="flex items-center gap-2.5 border-t border-outline-gray-1 py-2.5 first:border-t-0">
        <div class="min-w-0 flex-1">
          <div class="truncate text-base text-ink-gray-8">{{ ticket.subject }}</div>
          <div class="text-sm text-ink-gray-5">#{{ ticket.id }} · {{ ticket.sla }}</div>
        </div>
        <Badge :label="ticket.priority" :theme="ticket.theme" />
      </div>
    </div>
  </div>
</template>
