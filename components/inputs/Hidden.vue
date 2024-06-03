<script setup>
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { attrs } = useFieldMixin(props)
</script>

<template>
  <input v-bind="attrs()" type="hidden" :value="props.field.defaultValue" />
</template>
