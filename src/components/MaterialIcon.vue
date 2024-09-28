<script setup lang="ts">
type Icon =
  | "assignment"
  | "assignment_turned_in"
  | "code"
  | "edit"
  | "edit_note"
  | "format_list_bulleted"
  | "id_card"
  | "info"
  | "library_books"
  | "logout"
  | "open_in_new"
  | "person"
  | "settings"
const {size = "1.5rem", isFilled = false} = defineProps<{
  icon: Icon,
  size?: string,
  isFilled?: boolean,
}>()
</script>

<template>
  <span
    class="material-symbols-rounded"
    :style="{fontVariationSettings: '\'FILL\' ' + (isFilled ? 1 : 0), fontSize: size}"
  >
    {{ icon }}
  </span>
</template>