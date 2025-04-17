<template>
  <div class="min-h-screen flex flex-col">
    <!-- Fixed Header -->
    <header class="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <h1 class="text-2xl">Quiz Application</h1>
    </header>

    <!-- Main Container with top padding (equal to header height) -->
    <div class="flex flex-1 pt-16">
      <!-- Fixed Sidebar -->
      <aside
        class="w-64 p-4 h-[calc(100vh-4rem)] fixed top-16 left-0 border-r border-black overflow-y-auto z-40 bg-white"
      >
        <nav>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/dashboard"
                class="block text-gray-800 bold hover:text-gray-600"
                >Dashboard</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/create-quiz"
                class="block text-gray-800 hover:text-gray-600"
                >Create Quiz</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content Area with left margin to make room for sidebar -->
      <main class="flex-1 p-4 ml-64">
        <slot></slot>
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>
