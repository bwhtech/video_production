<script setup>
import { Sidebar, SidebarHeader, SidebarItem, SidebarLabel, KeyboardShortcut } from 'frappe-ui'
import { ref } from 'vue'
import PluginLogo from './PluginLogo.vue'

// `full` lists every core section, for crops that frame the Plugins section mid-sidebar.
// `mainInset` pushes the page down by the same amount the crop pushes the sidebar up, so it stays in frame.
defineProps({
  full: { type: Boolean, default: false },
  mainInset: { type: Number, default: 0 },
})

const plugins = ref(null)
defineExpose({ plugins })

const core = [
  { label: 'Orders', icon: 'lucide-shopping-bag' },
  { label: 'Customers', icon: 'lucide-users' },
  { label: 'Products', icon: 'lucide-package' },
]

const fullCore = [
  { label: 'Orders', icon: 'lucide-shopping-bag' },
  { label: 'Customers', icon: 'lucide-users' },
]

const groups = [
  {
    label: 'Catalog',
    items: [
      { label: 'Products', icon: 'lucide-package' },
      { label: 'Collections', icon: 'lucide-layers' },
      { label: 'Attributes', icon: 'lucide-tags' },
    ],
  },
  {
    label: 'Storefront',
    items: [
      { label: 'Theme', icon: 'lucide-palette' },
      { label: 'Navigation', icon: 'lucide-list-tree' },
      { label: 'Pages', icon: 'lucide-file-text' },
      { label: 'Reviews', icon: 'lucide-star' },
    ],
  },
]

const links = [
  { name: 'Instagram floor mats offer', slug: '/buy/floor-mats', clicks: 276 },
  { name: 'Diwali gift box', slug: '/buy/diwali-box', clicks: 184 },
  { name: 'Newsletter bundle', slug: '/buy/bundle', clicks: 92 },
  { name: 'Influencer kit', slug: '/buy/kit', clicks: 41 },
]
</script>

<template>
  <div class="flex h-full bg-surface-base text-ink-gray-9">
    <Sidebar width="14rem" :collapsible="false" class="shrink-0 border-r border-outline-gray-1">
      <div class="flex h-full flex-col p-2">
        <SidebarHeader title="Commera" subtitle="Hussain's Store">
          <template #prefix>
            <img src="/commera.svg" alt="" class="h-full w-full object-cover" />
          </template>
        </SidebarHeader>
        <div class="space-y-0.5 pt-1">
          <SidebarItem label="Overview" icon="lucide-layout-dashboard" />
          <SidebarItem label="Search" icon="lucide-search">
            <template #suffix><KeyboardShortcut class="mr-1" combo="Mod+K" /></template>
          </SidebarItem>
          <SidebarItem v-for="item in full ? fullCore : core" :key="item.label" :label="item.label" :icon="item.icon" />
          <SidebarItem v-if="full" label="Analytics" icon="lucide-chart-line">
            <template #suffix>
              <span class="lucide-chevron-right mr-1 size-3.5 text-ink-gray-5" aria-hidden="true" />
            </template>
          </SidebarItem>
        </div>

        <template v-if="full">
          <div v-for="group in groups" :key="group.label" class="mt-2.5">
            <SidebarLabel>{{ group.label }}</SidebarLabel>
            <div class="space-y-0.5">
              <SidebarItem v-for="item in group.items" :key="item.label" :label="item.label" :icon="item.icon" />
            </div>
          </div>
        </template>

        <div ref="plugins" class="mt-2.5">
          <SidebarLabel>Plugins</SidebarLabel>
          <div class="space-y-0.5">
            <SidebarItem label="Buy Links">
              <template #prefix><PluginLogo /></template>
              <template #suffix>
                <span class="lucide-chevron-down mr-1 size-3.5 text-ink-gray-5" aria-hidden="true" />
              </template>
            </SidebarItem>
            <div class="space-y-0.5 pl-5">
              <SidebarItem label="Links" icon="lucide-link" :active="true" />
              <SidebarItem label="Analytics" icon="lucide-chart-line" />
            </div>
            <SidebarItem label="My Commera Plugin" icon="lucide-rocket" />
          </div>
        </div>
      </div>
    </Sidebar>

    <main class="min-w-0 flex-1" :style="{ paddingTop: `${mainInset}px` }">
      <header class="flex h-12 items-center justify-between border-b border-outline-gray-1 px-5">
        <h2 class="text-lg font-semibold">Links</h2>
      </header>
      <div class="px-5 pt-3">
        <div
          v-for="link in links"
          :key="link.slug"
          class="flex items-center gap-3 border-b border-outline-gray-1 py-2.5 text-base"
        >
          <span class="lucide-link size-4 shrink-0 text-ink-gray-5" aria-hidden="true" />
          <div class="min-w-0 flex-1">
            <div class="truncate text-ink-gray-8">{{ link.name }}</div>
            <div class="truncate font-mono text-sm text-ink-gray-5">{{ link.slug }}</div>
          </div>
          <span class="text-ink-gray-6 tabular-nums">{{ link.clicks }}</span>
        </div>
      </div>
    </main>
  </div>
</template>
