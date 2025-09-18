<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import SelectBox from '@/components/Controls/SelectBox.vue'

// モックデータ
const languages = ref([
  { id: '1', name: 'C++23 (gcc 15.1)' },
  { id: '2', name: 'C (gcc 15.1)' },
  { id: '3', name: 'Python 3.12' },
  { id: '4', name: 'Java 17' }
])

const selectedLanguage = ref(languages.value[0])
const sourceCode = ref(`#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`)

const handleSubmit = () => {
  console.log('Submit code:', sourceCode.value)
}
</script>

<template>
  <div class="flex w-full flex-col gap-6 py-6">
    <div class="flex flex-col gap-4">
      <h2 class="fontstyle-ui-subtitle text-text-primary">問題文</h2>
      <div class="flex w-full items-center justify-center bg-background-tertiary py-16">
        <p class="fontstyle-ui-body-2 text-text-primary">問題本文をここに</p>
      </div>
    </div>

    <hr class="border-t border-border-secondary" />
    <div class="flex flex-col gap-4">
      <h2 class="fontstyle-ui-subtitle text-text-primary">提出</h2>
      <div class="w-80">
        <SelectBox
          v-model="selectedLanguage"
          :options="languages"
          label="言語"
          placeholder="言語を選択"
          required
        />
      </div>
      <div class="w-full">
        <CodeBlock v-model="sourceCode" :language="selectedLanguage" class="w-full" />
      </div>
      <div class="mt-2">
        <PrimaryButton class="h-12 w-24" right-icon="send" @click="handleSubmit">
          提出
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
