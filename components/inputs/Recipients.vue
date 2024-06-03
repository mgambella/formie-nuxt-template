<script setup>
import { computed } from 'vue'
import { commonPropsOptions } from './commonPropsOptions'

import Checkboxes from '~/components/inputs/Checkboxes.vue'
import Dropdown from '~/components/inputs/Dropdown.vue'
import Hidden from '~/components/inputs/Hidden.vue'
import Radio from '~/components/inputs/Radio.vue'

const props = defineProps({ ...commonPropsOptions })

const componentType = computed(() => {
  if (props.field.displayType === 'checkboxes') {
    return Checkboxes
  } else if (props.field.displayType === 'dropdown') {
    return Dropdown
  } else if (props.field.displayType === 'hidden') {
    return Hidden
  } else if (props.field.displayType === 'radio') {
    return Radio
  }

  return null
})
</script>

<template>
  <Component :is="componentType" :field="field" />
</template>
