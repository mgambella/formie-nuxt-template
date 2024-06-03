<script setup>
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId, getName } = useFieldMixin(props)
</script>

<template>
  <fieldset :aria-labelledby="getId()">
    <legend class="mb-1 block text-sm font-medium text-gray-700">
      {{ props.field.label }}
      <span v-if="props.field.required" class="text-red-500">*</span>
    </legend>

    <FieldInstructions :field="props.field" position="fieldset-start" />

    <div class="mt-2 space-y-2">
      <div
        v-for="(option, index) in props.field.options"
        :key="index"
        class="flex items-center"
      >
        <input
          :id="getId([index])"
          :name="getName()"
          :value="option.value"
          :required="props.field.required"
          type="radio"
          class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />

        <label
          :for="getId([index])"
          class="ml-3 block text-sm font-medium text-gray-700"
        >
          {{ option.label }}
        </label>
      </div>
    </div>

    <FieldInstructions :field="props.field" position="fieldset-end" />
  </fieldset>
</template>
