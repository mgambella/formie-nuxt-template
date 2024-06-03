<script setup>
import { commonPropsOptions } from './commonPropsOptions'

const props = defineProps({ ...commonPropsOptions })
</script>

<template>
  <Component :is="props.field.headingSize" :class="props.field.headingSize">{{
    props.field.name
  }}</Component>
</template>
