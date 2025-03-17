<script setup lang="ts">
export type Icon =
  | 'assignment'
  | 'assignment_turned_in'
  | 'close'
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
  | 'search'
  | 'settings'
  | 'star_half'
  | 'star_rate'
  | 'tune'
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
