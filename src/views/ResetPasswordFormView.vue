<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AuthenticationApi } from '@/api/generated'

import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import { passwordValidator } from '@/utils/validator'

const route = useRoute()
const token = Array.isArray(route.query.token) ? undefined : route.query.token

const password = ref<string>('')
const confirmation = ref<string>('')
const isValid = computed(() => passwordValidator(password.value))
const isConfirmed = computed(() => password.value === confirmation.value)

const submit = async () => {
  const authApi = new AuthenticationApi()
  await authApi.postResetPassword({
    tokenWithUserid: token ?? undefined,
    resetPasswordRequest: {
      password: password.value,
      token: token ?? ''
    }
  })
}
</script>

<template>
  <div class="flex h-[calc(100vh-56px)] items-center justify-center bg-background-secondary">
    <div class="flex w-[800px] flex-col gap-5 rounded-[15px] bg-background-primary px-14 py-10">
      <h1 class="fontstyle-ui-title text-[#1E1E1E]">パスワードの再設定</h1>

      <p class="fontstyle-ui-body text-[#3A3A3A]">パスワードを再設定します。</p>

      <form class="flex flex-col items-center gap-5 p-2.5">
        <div class="grid grid-cols-[200px_1fr] items-center gap-x-6 self-stretch">
          <label
            for="password"
            class="fontstyle-ui-body-strong col-start-1 row-start-1 text-right text-[#3A3A3A]"
          >
            パスワード
          </label>
          <div class="col-start-2 row-start-1 grow">
            <PasswordTextbox
              id="password"
              v-model="password"
              :error-message="
                isValid || password.length === 0 ? '' : 'このパスワードは使用できません'
              "
              class="grow gap-1"
            />
          </div>
          <div
            class="col-start-2 row-start-2 flex shrink-0 grow basis-0 flex-col items-start justify-center"
          >
            <p class="fontstyle-ui-caption-strong text-text-secondary">
              文字数は〇以上〇以下で、半角英数字と記号が使用できます。
            </p>
            <p class="fontstyle-ui-caption-strong text-text-secondary">
              英字、数字、記号がそれぞれ1文字以上含まれている必要があります。
            </p>
          </div>
        </div>

        <div class="flex items-center gap-6 self-stretch">
          <label for="confirmation" class="fontstyle-ui-body-strong w-50 text-right text-[#3A3A3A]">
            パスワード (確認)
          </label>
          <div class="grow">
            <PasswordTextbox
              id="confirmation"
              v-model="confirmation"
              :error-message="
                isConfirmed || confirmation.length === 0 ? '' : 'パスワードが一致しません'
              "
            />
          </div>
        </div>

        <PrimaryButton
          text="再設定"
          :disabled="!(isValid && isConfirmed)"
          class="px-8"
          @click="submit"
        />
      </form>
    </div>
  </div>
</template>

<style scoped></style>
