<script setup>
import { computed } from 'vue'
import { attributesTable } from '~/utils/helpers'
import AllInputs from '~/components/inputs'
import Group from '~/components/inputs/Group.vue'
import Repeater from '~/components/inputs/Repeater.vue'

const props = defineProps({
  field: {
    type: Object,
    default: () => {},
  },
})

const canInclude = computed(() => props.field.visibility !== 'disabled')

const canShow = computed(
  () =>
    props.field.visibility !== 'hidden' && props.field.displayName !== 'Hidden',
)

const attrs = computed(() => ({
  class: props.field.cssClasses,
  ...attributesTable(props.field.containerAttributes),
}))

const componentType = computed(() => {
  switch (props.field.displayName) {
    case 'Group':
      return Group
    case 'Repeater':
      return Repeater
    default:
      return AllInputs[props.field.displayName]
  }
})
</script>

<template>
  <div
    v-if="canInclude"
    v-show="canShow"
    class="mb-5 w-full flex-1"
    v-bind="attrs"
  >
    <Component :is="componentType" :field="field" />
  </div>
</template>
