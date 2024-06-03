<script setup>
import { computed } from 'vue'
import { commonPropsOptions } from './commonPropsOptions'
import FieldInstructions from './includes/FieldInstructions.vue'
import FieldLabel from './includes/FieldLabel.vue'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId, attrs } = useFieldMixin(props)

const maxlength = computed(() => {
  if (props.field.limit && props.field.limitType === 'characters') {
    return props.field.limitAmount
  }

  return null
})

function wordCheck(e) {
  if (!props.field.limit || props.field.limitType !== 'words') {
    return
  }

  setTimeout(() => {
    const { value } = e.target
    const wordCount = value.split(/\S+/).length - 1
    const regex = new RegExp(
      `^\\s*\\S+(?:\\s+\\S+){0,${props.field.limitAmount - 1}}`,
    )

    if (wordCount >= props.field.limitAmount) {
      e.target.value = value.match(regex)
    }
  }, 1)
}
</script>

<template>
  <FieldLabel :id="getId()" :field="props.field" position="above-input" />

  <FieldInstructions :field="props.field" position="above-input" />

  <input
    v-bind="attrs()"
    :maxlength="maxlength"
    type="text"
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    @keydown="wordCheck"
  />

  <FieldInstructions :field="props.field" position="below-input" />

  <FieldLabel :id="getId()" :field="props.field" position="below-input" />
</template>
