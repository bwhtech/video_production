<script setup>
import { Avatar, Badge, Button, Sidebar, SidebarHeader, SidebarItem, SidebarLabel } from 'frappe-ui'

const modules = [
  { label: 'Employees', icon: 'lucide-users' },
  { label: 'Recruitment', icon: 'lucide-user-plus' },
  { label: 'Attendance', icon: 'lucide-calendar-check' },
  { label: 'Leaves', icon: 'lucide-plane' },
  { label: 'Expenses', icon: 'lucide-receipt' },
  { label: 'Performance', icon: 'lucide-target' },
]

const payroll = [
  { label: 'Salary Slips', icon: 'lucide-file-text', active: true },
  { label: 'Salary Structures', icon: 'lucide-layers' },
  { label: 'Income Tax', icon: 'lucide-landmark' },
]

const stats = [
  { label: 'Employees', value: '48' },
  { label: 'Gross Pay', value: '₹24.6L' },
  { label: 'Net Pay', value: '₹21.9L' },
]

const slips = [
  { name: 'Priya Nair', role: 'Team Lead', pay: '₹1,42,500', status: 'Submitted' },
  { name: 'Rohan Kulkarni', role: 'Product Designer', pay: '₹96,200', status: 'Submitted' },
  { name: 'Sneha Iyer', role: 'Accountant', pay: '₹68,900', status: 'Submitted' },
  { name: 'Kabir Shah', role: 'Sales Executive', pay: '₹54,300', status: 'Draft' },
  { name: 'Ananya Rao', role: 'HR Generalist', pay: '₹61,750', status: 'Draft' },
  { name: 'Vikram Joshi', role: 'Support Lead', pay: '₹58,400', status: 'Draft' },
]
</script>

<template>
  <div class="flex h-full bg-surface-base text-ink-gray-9">
    <Sidebar width="12rem" :collapsible="false" class="shrink-0 border-r border-outline-gray-1">
      <div class="flex h-full flex-col p-2">
        <SidebarHeader title="Frappe HR" subtitle="Acme Industries">
          <template #prefix>
            <img src="/frappe-hr-logo.svg" alt="" class="h-full w-full" />
          </template>
        </SidebarHeader>
        <div class="space-y-0.5 pt-1">
          <SidebarItem label="Home" icon="lucide-house" />
          <SidebarItem v-for="item in modules" :key="item.label" :label="item.label" :icon="item.icon" />
        </div>
        <div class="mt-2.5">
          <SidebarLabel>Payroll</SidebarLabel>
          <div class="space-y-0.5">
            <SidebarItem v-for="item in payroll" :key="item.label" :label="item.label" :icon="item.icon" :active="item.active" />
          </div>
        </div>
      </div>
    </Sidebar>

    <main class="min-w-0 flex-1">
      <header class="flex h-12 items-center justify-between border-b border-outline-gray-1 px-5">
        <h2 class="text-lg font-semibold">October Payroll</h2>
        <Button variant="solid" label="Submit" />
      </header>
      <div class="grid grid-cols-3 gap-3 px-5 pt-4">
        <div v-for="stat in stats" :key="stat.label" class="rounded-lg border border-outline-gray-1 px-3 py-2.5">
          <div class="text-sm text-ink-gray-5">{{ stat.label }}</div>
          <div class="mt-1 text-lg font-semibold tabular-nums">{{ stat.value }}</div>
        </div>
      </div>
      <div class="px-5 pt-3">
        <div
          v-for="slip in slips"
          :key="slip.name"
          class="flex items-center gap-3 border-b border-outline-gray-1 py-2.5 text-base"
        >
          <Avatar :label="slip.name" size="lg" shape="circle" />
          <div class="min-w-0 flex-1">
            <div class="truncate text-ink-gray-8">{{ slip.name }}</div>
            <div class="truncate text-sm text-ink-gray-5">{{ slip.role }}</div>
          </div>
          <span class="text-ink-gray-7 tabular-nums">{{ slip.pay }}</span>
          <Badge :theme="slip.status === 'Submitted' ? 'green' : 'gray'" :label="slip.status" class="w-[5.5rem] justify-center" />
        </div>
      </div>
    </main>
  </div>
</template>
