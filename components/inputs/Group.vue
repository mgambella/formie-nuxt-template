<script setup>
import { commonPropsOptions } from './commonPropsOptions'
import FieldLabel from './includes/FieldLabel.vue'
import FieldInstructions from './includes/FieldInstructions.vue'
import { useFieldMixin } from '~/composables/useFieldMixin'
import AllInputs from '~/components/inputs'

const props = defineProps({ ...commonPropsOptions })

const { getId } = useFieldMixin(props)
</script>

<template>
  <FieldLabel :id="getId()" :field="props.field" position="above-input" />

  <FieldInstructions :field="props.field" position="above-input" />

  <fieldset
    class="relative mb-5 rounded-md border border-gray-200 bg-gray-100 p-4"
  >
    <div
      v-for="(nestedField, fieldIndex) in props.field.fields"
      :key="fieldIndex"
    >
      <Component
        :is="AllInputs[nestedField.displayName]"
        :field="nestedField"
        :namespace="[props.field.handle]"
      />
    </div>
  </fieldset>

  <FieldInstructions :field="props.field" position="below-input" />

  <FieldLabel :id="getId()" :field="props.field" position="below-input" />
</template>
