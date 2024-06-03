<script setup>
import { ref } from 'vue'
import { uniqueId } from 'lodash-es'
import FieldLabel from './includes/FieldLabel.vue'
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'
import AllInputs from '~/components/inputs'

const props = defineProps({ ...commonPropsOptions })

const { getId } = useFieldMixin(props)

const rows = ref([])

function onAdd() {
  rows.value.push({
    __id: uniqueId(),
  })
}

function onDelete(rIndex) {
  rows.value.splice(rIndex, 1)
}
</script>

<template>
  <FieldLabel :id="getId()" :field="props.field" position="above-input" />

  <FieldInstructions :field="props.field" position="above-input" />

  <fieldset
    v-for="(row, rIndex) in rows"
    :key="row.__id"
    class="relative mb-5 rounded-md border border-gray-200 bg-gray-100 p-4"
  >
    <div
      v-for="(nestedField, fieldIndex) in props.field.fields"
      :key="fieldIndex"
    >
      <Component
        :is="AllInputs[nestedField.displayName]"
        :field="nestedField"
        :namespace="[props.field.handle, 'rows', rIndex]"
      />
    </div>

    <button
      type="button"
      class="absolute right-0 top-0 -mr-3 -mt-3 rotate-45 transform rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click.prevent="onDelete(rIndex)"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </fieldset>

  <button
    type="button"
    class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    @click.prevent="onAdd"
  >
    Add row
  </button>

  <FieldInstructions :field="props.field" position="below-input" />

  <FieldLabel :id="getId()" :field="props.field" position="below-input" />
</template>
