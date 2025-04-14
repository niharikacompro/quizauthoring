<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4">
      <h1 class="text-2xl">Quiz Application</h1>
    </header>

    <!-- Body: Sidebar and Content -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-64  p-4" style="border: 1px solid black;">
        <nav>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/dashboard" class="block text-gray-800 hover:text-gray-600">Dashboard</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/temp" class="block text-gray-800 hover:text-gray-600">Quizzes</NuxtLink>
            </li>
            <li>
            
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-4">
      <slot></slot>
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
