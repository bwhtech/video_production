import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/og' },
    { path: '/og', component: () => import('./pages/OgImage.vue') },
    { path: '/og-b', component: () => import('./pages/OgImageCentered.vue') },
  ],
})
