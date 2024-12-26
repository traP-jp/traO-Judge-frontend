<script setup lang="ts">
export type Column = { id: string; textAlign?: 'start' | 'end' | 'center' }

const { cols, rowIds } = defineProps<{
  cols: Column[]
  rowIds: string[]
}>()
</script>

<template>
  <table class="w-full">
    <thead class="h-10 bg-background-tertiary">
      <tr>
        <th
          v-for="{ id, textAlign } in cols"
          :key="id"
          class="px-2 first:pl-4 last:pr-4"
          :style="{ textAlign }"
        >
          <slot name="head" :col-id="id" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="rowId in rowIds"
        :key="rowId"
        class="h-9 border-b border-solid border-border-secondary"
      >
        <th
          v-for="col in cols"
          :key="col.id"
          class="px-2 first:pl-4 last:pr-4"
          :style="{ textAlign: col.textAlign }"
        >
          <slot name="cell" :row-id="rowId" :col-id="col.id" />
        </th>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
