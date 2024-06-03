<script setup>
import FieldLabel from './includes/FieldLabel.vue'
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId, attrs } = useFieldMixin(props)
</script>

<template>
  <FieldLabel :id="getId()" :field="props.field" position="above-input" />

  <FieldInstructions :field="props.field" position="above-input" />

  <textarea
    v-bind="attrs()"
    rows="3"
    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
  ></textarea>

  <FieldInstructions :field="props.field" position="below-input" />

  <FieldLabel :id="getId()" :field="props.field" position="below-input" />
</template>
