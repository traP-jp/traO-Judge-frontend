<script setup lang="ts">
export type Column = { id: string; textAlign?: 'start' | 'end' | 'center'; width?: string }

// TODO: add sorting and filtering features
const { cols, rowIds } = defineProps<{
  cols: Column[]
  rowIds: string[]
}>()
</script>

<template>
  <table class="w-full">
    <thead class="h-10 bg-background-tertiary text-text-secondary">
      <tr>
        <th
          v-for="{ id, textAlign, width } in cols"
          :key="id"
          class="fontstyle-ui-control-strong border-r border-border-secondary px-3 py-2 last:border-r-0"
          :style="{ textAlign, width }"
        >
          <slot name="head" :col-id="id" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="rowId in rowIds"
        :key="rowId"
        class="h-9 border-b border-solid border-border-secondary text-text-primary"
      >
        <th
          v-for="col in cols"
          :key="col.id"
          class="fontstyle-ui-body h-12 px-3"
          :style="{ textAlign: col.textAlign, width: col.width }"
        >
          <slot name="cell" :row-id="rowId" :col-id="col.id" />
        </th>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
