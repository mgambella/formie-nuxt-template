<script setup>
import { upperFirst, camelCase } from 'lodash-es'

const props = defineProps({
  field: {
    type: Object,
    default: () => {},
  },

  position: {
    type: String,
    default: 'above-input',
  },
})

function canShow() {
  const className = `verbb\\formie\\positions\\${upperFirst(
    camelCase(props.position),
  )}`

  if (props.field.instructionsPosition === className) {
    return true
  }

  if (
    !props.field.instructionsPosition &&
    (props.position === 'above-input' || props.position === 'fieldset-start')
  ) {
    return true
  }

  return false
}
</script>

<template>
  <p v-if="canShow()" class="mb-1 text-sm text-gray-500">
    {{ props.field.instructions }}
  </p>
</template>
