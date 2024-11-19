<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'
import TextboxLabel from '@/components/Controls/Textbox/TextboxLabel.vue'
import { ref } from 'vue'

const { errorMessage = '', label = '' } = defineProps<{
  disabled?: boolean
  errorMessage?: string
  isRequired?: boolean
  label?: string
  placeholder?: string
  autocomplete?: string
}>()
const value = defineModel<string>()
const passwordShown = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-col gap-2">
    <TextboxLabel v-if="label != ''" :is-required="isRequired" :label="label" />
    <span class="relative">
      <input
        v-model="value"
        :class="[
          {
            'border-border-secondary outline-text-primary focus:border-text-primary':
              errorMessage == ''
          },
          { 'border-status-error outline outline-1 outline-status-error': errorMessage != '' },
          'fontstyle-ui-body w-full rounded border bg-background-primary py-1 pl-4 pr-11.5 text-text-primary placeholder:text-text-tertiary focus:outline focus:outline-1 disabled:bg-background-secondary'
        ]"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="passwordShown ? 'text' : 'password'"
        :autocomplete="autocomplete"
      />
      <span
        class="absolute right-4 top-1.75 select-none"
        @click="() => (passwordShown = !passwordShown)"
      >
        <MaterialIcon :icon="passwordShown ? 'visibility_off' : 'visibility'" size="1.25rem" />
      </span>
    </span>
    <div v-if="errorMessage != ''" class="flex items-start gap-2 pl-1 text-status-error">
      <MaterialIcon icon="error" size="1.25rem" />
      <span class="fontstyle-ui-control">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped></style>
