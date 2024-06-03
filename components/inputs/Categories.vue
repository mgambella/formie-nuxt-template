<script setup>
import { computed } from 'vue'
import { commonPropsOptions } from './commonPropsOptions'
import Checkboxes from '~/components/inputs/Checkboxes.vue'
import Dropdown from '~/components/inputs/Dropdown.vue'
import Radio from '~/components/inputs/Radio.vue'

const props = defineProps({ ...commonPropsOptions })

const suffix = computed(() => {
  if (props.field.displayType !== 'checkboxes') {
    return ['']
  }

  return []
})

const componentType = computed(() => {
  if (props.field.displayType === 'checkboxes') {
    return Checkboxes
  } else if (props.field.displayType === 'dropdown') {
    return Dropdown
  } else if (props.field.displayType === 'radio') {
    return Radio
  }

  return null
})

const fieldWithFormattedOptions = computed(() => {
  return {
    ...props.field,
    options:
      props.field.categories?.map((option) => {
        return { label: option.title, value: option.id }
      }) || [],
  }
})
</script>

<template>
  <Component
    :is="componentType"
    :field="fieldWithFormattedOptions"
    :namespace-suffix="suffix"
  />
</template>
