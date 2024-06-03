<script setup>
import FieldLabel from './includes/FieldLabel.vue'
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId, getName } = useFieldMixin(props)
</script>

<template>
  <FieldLabel :id="getId()" :field="field" position="above-input" />

  <FieldInstructions :field="field" position="above-input" />

  <select
    :id="getId()"
    :name="getName()"
    :multiple="props.field.multiple"
    :required="props.field.required"
    class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
  >
    <option
      v-for="(option, index) in props.field.options"
      :key="index"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>

  <FieldInstructions :field="props.field" position="below-input" />

  <FieldLabel :id="getId()" :field="props.field" position="below-input" />
</template>
