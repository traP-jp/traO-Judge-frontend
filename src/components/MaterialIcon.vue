<script setup lang="ts">
export type Icon =
  | 'assignment'
  | 'assignment_turned_in'
  | 'code'
  | 'edit'
  | 'edit_note'
  | 'error'
  | 'format_list_bulleted'
  | 'id_card'
  | 'info'
  | 'library_books'
  | 'logout'
  | 'open_in_new'
  | 'person'
  | 'settings'
  | 'visibility'
  | 'visibility_off'
const { size = '1.5rem', isFilled = false } = defineProps<{
  icon: Icon
  size?: string
  isFilled?: boolean
}>()
</script>

<template>
  <span
    class="material-symbols-rounded"
    :style="{ fontVariationSettings: '\'FILL\' ' + (isFilled ? 1 : 0), fontSize: size }"
  >
    {{ icon }}
  </span>
</template>
