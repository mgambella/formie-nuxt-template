<script setup>
import { ref, computed } from 'vue'
import Pristine from 'pristinejs'
import { useQuery, useMutation } from '#imports'
import { GetFormieFormQuery } from '~/graphql/getFormieFormQuery.js'
import { getFormMutation, getMutationVariables } from '~/utils/mutations'
import {
  resetValidation,
  runValidation,
  applyServerValidation,
} from '~/utils/validation'
import Alert from '~/components/Alert.vue'
import FormiePage from '~/components/FormiePage.vue'

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
})

const formElement = ref(null)
const formPageElements = ref([])
const formieForm = ref(null)
const activePage = ref(0)
const error = ref(false)
const loading = ref(false)
const alertState = ref(null)
const validator = ref(null)

const stepPercentage = computed(() =>
  parseInt(((activePage.value + 1) / form.value.pages.length) * 100, 10),
)

const { onError, onResult } = useQuery(
  GetFormieFormQuery,
  () => ({ uid: props.uid }),
  { fetchPolicy: 'no-cache' },
)

onResult((result) => {
  formieForm.value = result.data.form
})

onError((error) => {
  error.value = error.message
})

function handleTabClick(index) {
  activePage.value = index
}

async function handleSubmit() {
  loading.value = true
  alertState.value = false

  const $formElementValue = formElement.value
  const $formPageElementValue = formPageElements.value[activePage.value]

  console.log($formElementValue)
  console.log($formPageElementValue)

  validator.value = new Pristine($formElementValue)

  resetValidation($formElementValue)
  console.log('resetValidation')

  const isLastPage = activePage.value === formieForm.value.pages.length - 1
  const valid = runValidation(validator.value, $formPageElementValue)
  console.log('runValidation', valid)

  if (!valid) {
    loading.value = false
    alertState.value = 'error'
    return
  }

  if (!isLastPage) {
    loading.value = false
    activePage.value += 1
    return
  }

  const formData = getMutationVariables(formieForm.value, $formElementValue)
  const formMutation = getFormMutation(formieForm.value)

  try {
    const { mutate: submitForm } = useMutation(formMutation)

    const { data } = await submitForm(formData)
    loading.value = false
    const response = data[`save_${props.handle}_Submission`]
    handleSuccess(response)
  } catch (error) {
    loading.value = false
    alertState.value = 'error'
    applyServerValidation(validator.value, $formElementValue, error)
    console.error(error)
  }
}

function handleSuccess() {
  if (formieForm.value.settings.submitAction === 'message') {
    alertState.value = 'success'
  }

  formElement.value?.reset()
}
</script>

<template>
  <div class="w-full overflow-hidden rounded-md bg-white shadow">
    <form
      v-if="formieForm"
      ref="formElement"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <Alert
        v-model="alertState"
        :success-text="formieForm.settings?.submitActionMessageHtml"
        :error-text="formieForm.settings?.errorMessageHtml"
      />

      <div v-if="formieForm.settings?.displayFormTitle" class="text-center">
        <h2 class="my-4 text-xl font-semibold leading-6 text-gray-900 sm:my-6">
          {{ formieForm.title }}
        </h2>

        <hr />
      </div>

      <div
        v-if="formieForm.settings?.displayPageTabs"
        class="border-b border-gray-200 px-4 sm:px-6"
      >
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="(page, index) in formieForm.pages"
            :key="index"
            href="#"
            :class="
              index === activePage
                ? 'whitespace-nowrap border-b-2 border-indigo-500 px-1 py-4 text-sm font-medium text-indigo-600'
                : 'whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            "
            @click.prevent="handleTabClick(index)"
          >
            {{ page.name }}
          </a>
        </nav>
      </div>

      <div
        v-if="formieForm.settings?.displayPageProgress"
        class="mt-4 px-4 sm:px-6"
      >
        <div
          class="flex h-5 overflow-hidden rounded-md bg-gray-200 text-xs font-medium text-white"
        >
          <div
            class="flex flex-col justify-center bg-indigo-500 text-center"
            :style="'width: ' + stepPercentage + '%'"
            role="progressbar"
            :aria-valuenow="stepPercentage"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span class="">{{ stepPercentage }}%</span>
          </div>
        </div>
      </div>
      <FormiePage
        v-for="(page, index) in formieForm.pages"
        :key="index"
        :ref="(el) => (formPageElements[index] = el?.$el)"
        v-model="activePage"
        :page="page"
        :page-index="index"
        :form="formieForm"
        :loading="loading"
      />
    </form>

    <div
      v-else-if="formieForm === null"
      class="bg-white p-24 text-center text-red-500"
    >
      Unable to find form with uid "{{ props.uid }}".
    </div>

    <div v-else class="bg-white p-24 text-center text-red-500">
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div v-else class="loading loading-lg"></div>
    </div>
  </div>
</template>
