<script setup>
import { commonPropsOptions } from './commonPropsOptions'

const props = defineProps({ ...commonPropsOptions })
</script>

<template>
  <hr
    :style="[
      props.field.borderStyle
        ? `border-top-style: ${props.field.borderStyle}`
        : null,
      props.field.borderWidth
        ? `border-top-width: ${props.field.borderWidth}px`
        : null,
      props.field.borderColor
        ? `border-top-color: ${props.field.borderColor}`
        : null,
    ]"
  />
</template>
