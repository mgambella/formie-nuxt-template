<script setup>
import { useAsyncQuery } from '#imports'
import { GetFormieFormsQuery } from '~/graphql/getFormieFormsQuery.js'

const { data: dataResponse } = await useAsyncQuery(GetFormieFormsQuery)
</script>

<template>
  <div class="w-full overflow-hidden rounded-md bg-white shadow">
    <div
      v-for="formieForm of dataResponse.formieForms"
      :key="formieForm.uid"
      class="hover:bg-gray-200"
    >
      <NuxtLink :to="`/forms/${formieForm.uid}`">
        <h2 class="p-5 text-lg font-semibold">{{ formieForm.title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>
