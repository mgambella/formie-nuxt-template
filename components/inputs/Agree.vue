<script setup>
import FieldLabel from './includes/FieldLabel.vue'
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId, getName } = useFieldMixin(props)
</script>

<template>
  <FieldLabel :id="getId()" :field="props.field" position="above-input" />

  <FieldInstructions :field="props.field" position="above-input" />

  <div class="mt-2 space-y-2">
    <input
      type="hidden"
      aria-checked="false"
      aria-hidden="true"
      :name="getName()"
      value=""
    />

    <div class="flex items-center">
      <input
        :id="getId()"
        :name="getName()"
        value="1"
        type="checkbox"
        :required="props.field.required"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />

      <label
        :for="getId()"
        class="ml-3 block text-sm font-medium text-gray-700"
      >
        {{ props.field.descriptionHtml }}
      </label>
    </div>
  </div>

  <FieldInstructions :field="props.field" position="below-input" />

  <FieldLabel :id="getId()" :field="props.field" position="below-input" />
</template>
