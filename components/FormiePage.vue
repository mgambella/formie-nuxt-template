<script setup>
import { computed } from 'vue'
import FormieField from '~/components/FormieField.vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => {},
  },

  page: {
    type: Object,
    default: () => {},
  },

  pageIndex: {
    type: Number,
    default: 0,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

const activePage = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
})

const position = computed(() => {
  if (props.page.settings.buttonsPosition === 'left-right') {
    return 'justify-between'
  }

  if (props.page.settings.buttonsPosition === 'center') {
    return 'justify-center'
  }

  if (props.page.settings.buttonsPosition === 'right') {
    return 'justify-end'
  }

  return ''
})

function handleGoBack() {
  activePage.value -= 1
}
</script>

<template>
  <div v-show="pageIndex === activePage">
    <div class="bg-white p-4 pb-0 sm:p-6">
      <div v-if="props.form?.settings?.displayCurrentPageTitle">
        <h3 class="mb-6 text-lg font-medium leading-6 text-gray-900">
          {{ props.page.name }}
        </h3>
      </div>

      <div
        v-for="(row, rowIndex) in props.page.rows"
        :key="rowIndex"
        class="flex flex-wrap"
      >
        <FormieField
          v-for="(field, fieldIndex) in row.fields"
          :key="fieldIndex"
          :field="field"
        />
      </div>
    </div>

    <div class="bg-gray-50 px-4 py-3 sm:px-6">
      <div class="flex" :class="position">
        <button
          v-if="props.page.settings.showBackButton"
          type="button"
          class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click.prevent="handleGoBack"
        >
          {{ props.page.settings.backButtonLabel }}
        </button>

        <button
          :disabled="props.loading"
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          :class="{ loading: props.loading }"
        >
          {{ props.page.settings.submitButtonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
