<script setup>
import { ref } from 'vue'
import { uniqueId } from 'lodash-es'
import FieldInstructions from './includes/FieldInstructions.vue'
import { commonPropsOptions } from './commonPropsOptions'
import { useFieldMixin } from '~/composables/useFieldMixin'

const props = defineProps({ ...commonPropsOptions })

const { getId, getName } = useFieldMixin(props)

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
  <fieldset :aria-labelledby="getId()" class="contents">
    <legend class="mb-1 block text-sm font-medium text-gray-700">
      {{ props.field.label }}
    </legend>

    <FieldInstructions :field="props.field" position="above-input" />

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table ref="table" class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="(column, cIndex) in props.field.columns"
                    :key="cIndex"
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {{ column.heading }}
                  </th>

                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(row, rIndex) in rows" :key="row.__id">
                  <td
                    v-for="(column, cIndex) in props.field.columns"
                    :key="cIndex"
                    class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                  >
                    <div v-if="column.type === 'checkbox'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="hidden"
                        aria-checked="false"
                        aria-hidden="true"
                      />

                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="checkbox"
                        value="1"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />

                      <label :for="getId([rIndex, cIndex])">
                        &nbsp;<span class="sr-only">{{ column.heading }}</span>
                      </label>
                    </div>

                    <div v-else-if="column.type === 'color'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="color"
                        value=""
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'date'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="date"
                        value=""
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'select'">
                      <select
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option
                          v-for="(option, i) in column.options"
                          :key="i"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                    </div>

                    <div v-else-if="column.type === 'email'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="email"
                        value=""
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'heading'"></div>

                    <div v-else-if="column.type === 'multiline'">
                      <textarea
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        class="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>

                    <div v-else-if="column.type === 'number'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="number"
                        value=""
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'time'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="time"
                        value=""
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'url'">
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="url"
                        value=""
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else>
                      <input
                        :id="getId([rIndex, cIndex])"
                        :name="getName([rIndex, cIndex])"
                        type="text"
                        value=""
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </td>

                  <td
                    class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                  >
                    <a
                      href="#"
                      class="text-indigo-600 hover:text-indigo-900"
                      @click.prevent="onDelete(rIndex)"
                      >Delete</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!props.field.static"
      type="button"
      class="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click.prevent="onAdd"
    >
      {{ props.field.addRowLabel }}
    </button>

    <FieldInstructions :field="props.field" position="below-input" />
  </fieldset>
</template>
