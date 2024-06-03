<script setup>
import { upperFirst, camelCase } from 'lodash-es'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },

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

  if (props.field.labelPosition === className) {
    return true
  }

  if (!props.field.labelPosition && props.position === 'above-input') {
    return true
  }

  return false
}
</script>

<template>
  <label
    v-if="canShow()"
    :for="props.id"
    class="mb-1 block text-sm font-medium text-gray-700"
  >
    {{ props.field.label }}
    <span v-if="props.field.required" class="text-red-500">*</span>
  </label>
</template>
