<script setup>
import { useRoute } from '#imports'
import FormieForm from '~/components/FormieForm.vue'

const route = useRoute()
const { uid } = route.params

const routeUid = getFirstString(uid)

function getFirstString(str) {
  if (Array.isArray(str)) {
    if (str.length > 0) {
      return str[0].toString()
    } else {
      return ''
    }
  } else {
    return str.toString()
  }
}
</script>

<template>
  <ClientOnly>
    <FormieForm :uid="routeUid" />
  </ClientOnly>
</template>
