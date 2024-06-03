<script setup>
import FieldLabel from './includes/FieldLabel.vue'
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId, getName, getSubFields, attrs } = useFieldMixin(props)

const subFields = [['prefix', 'firstName', 'middleName', 'lastName']]

const autocomplete = {
  prefix: 'honorific-prefix',
  firstName: 'given-name',
  middleName: 'additional-name',
  lastName: 'family-name',
}
</script>

<template>
  <template v-if="props.field.useMultipleFields">
    <fieldset :aria-labelledby="getId()" class="-mb-5">
      <legend class="mb-1 block text-sm font-medium text-gray-700">
        {{ props.field.label }}
      </legend>

      <FieldInstructions :field="props.field" position="fieldset-start" />

      <div
        v-for="(fields, i) in getSubFields(subFields)"
        :key="i"
        class="-mx-2 flex flex-wrap"
      >
        <div
          v-for="(subField, index) in fields"
          :key="index"
          class="mb-5 flex-1 px-2"
        >
          <FieldLabel
            :id="getId([index])"
            :field="subField"
            position="above-input"
          />

          <div v-if="index === 'prefix'">
            <select
              :id="getId([index])"
              :name="getName([index])"
              :autocomplete="autocomplete[index]"
              class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option
                v-for="(option, j) in subField.options"
                :key="j"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div v-else>
            <input
              v-bind="attrs(subField, [index])"
              :autocomplete="autocomplete[index]"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <FieldLabel
            :id="getId([index])"
            :field="subField"
            position="below-input"
          />
        </div>
      </div>
    </fieldset>
  </template>

  <template v-else>
    <FieldLabel :id="getId()" :field="props.field" position="above-input" />

    <FieldInstructions :field="props.field" position="above-input" />

    <input
      v-bind="attrs()"
      type="text"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />

    <FieldInstructions :field="props.field" position="below-input" />

    <FieldLabel :id="getId()" :field="props.field" position="below-input" />
  </template>
</template>
