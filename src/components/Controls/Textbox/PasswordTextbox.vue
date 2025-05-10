<script setup lang="ts">
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import type { Icon } from '@/components/MaterialIcon.vue'
import { computed, ref } from 'vue'

const visible = ref<boolean>(false)
const rightIcon = computed<Icon>(() => (visible.value ? 'visibility_off' : 'visibility'))
const toggleVisibility = () => (visible.value = !visible.value)
</script>

<template>
  <PlainTextbox
    displays-length
    :right-icon="rightIcon"
    :type="visible ? 'text' : 'password'"
    class="h-6.5"
    @click-right="toggleVisibility"
  />
</template>

<style scoped></style>
