<script setup>
import FieldLabel from './includes/FieldLabel.vue'
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId } = useFieldMixin(props)
</script>

<template>
  <FieldLabel :id="getId()" :field="props.field" position="above-input" />

  <FieldInstructions :field="props.field" position="above-input" />

  <div v-html="props.field.htmlContent"></div>

  <FieldInstructions :field="props.field" position="below-input" />

  <FieldLabel :id="getId()" :field="props.field" position="below-input" />
</template>
