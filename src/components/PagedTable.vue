<script setup lang="ts">
const { colIds, rowIds } = defineProps<{
  colIds: string[]
  rowIds: string[]
}>()
</script>

<template>
  <table class="w-full table-fixed">
    <thead class="h-10 bg-[#F5F5F5]">
      <tr>
        <th v-for="colId in colIds" :key="colId">
          <slot name="head" :col-id="colId" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rowId in rowIds" :key="rowId">
        <th v-for="colId in colIds" :key="colId">
          <slot name="cell" :row-id="rowId" :col-id="colId" />
        </th>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
