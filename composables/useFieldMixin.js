import { ref } from 'vue'
import { camelCase } from 'lodash-es'
import {
  getId as _getId,
  getName as _getName,
  attributesTable,
} from '../utils/helpers'

export function useFieldMixin({ field, namespace = [], namespaceSuffix = [] }) {
  // NOTE: subFields was originally present in the mixin's data() method, decide if you want to keep it here or not
  // data() {
  //     return {
  //         subFields: [],
  //     };
  // },
  const subFields = ref([])

  const attrs = (fieldParam = null, handles = []) => {
    if (fieldParam === null) {
      fieldParam = field
    }

    return {
      id: getId(handles),
      name: getName(handles),
      required: fieldParam.required,
      placeholder: fieldParam.placeholder,
      value: fieldParam.defaultValue,
      ...attributesTable(fieldParam.inputAttributes),
    }
  }

  const getId = (handles = []) => {
    const parts = [...namespace, field.handle, ...handles, ...namespaceSuffix]

    return _getId(parts)
  }

  const getName = (handles = []) => {
    const parts = [...namespace, field.handle, ...handles, ...namespaceSuffix]

    return _getName(parts)
  }

  const getSubFields = (subFields = []) => {
    const enabledSubFields = []

    subFields.forEach((subFields, groupIndex) => {
      subFields?.forEach((subField) => {
        if (field[`${subField}Enabled`]) {
          const subFieldOptions = {}

          Object.keys(field).forEach((key) => {
            if (key.startsWith(subField)) {
              const newKey = camelCase(key.replace(subField, ''))

              subFieldOptions[newKey] = field[key]
            }
          })

          if (!enabledSubFields[groupIndex]) {
            enabledSubFields[groupIndex] = {}
          }

          enabledSubFields[groupIndex][subField] = subFieldOptions
        }
      })
    })

    return enabledSubFields
  }

  return {
    subFields,
    attrs,
    getId,
    getName,
    getSubFields,
  }
}
