<template>
  <Body class="bg-gray-100 font-sans antialiased" />

  <main class="container mx-auto">
    <div class="mb-3 flex items-center justify-center p-4 sm:p-10">
      <NuxtLink to="/">
        <h1
          class="rounded px-6 py-4 text-3xl font-bold text-amber-800 hover:bg-gray-300 sm:text-4xl"
        >
          Forms
        </h1>
      </NuxtLink>
    </div>

    <div class="container mx-auto w-full max-w-5xl px-5 md:px-0">
      <slot />
    </div>

    <div class="py-14" />
  </main>
</template>
