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
    <div
      class="flex w-[800px] flex-col items-start justify-center gap-5 rounded-[15px] bg-background-primary px-14 py-10"
    >
      <h1 class="fontstyle-ui-title text-[#1E1E1E]">パスワードの再設定</h1>
      <div class="flex flex-col items-start gap-2 self-stretch">
        <p class="fontstyle-ui-body text-right text-[#3A3A3A]">パスワードを再設定します。</p>
      </div>
      <form class="flex flex-col items-start self-stretch p-2.5">
        <div class="flex items-center justify-center gap-6 self-stretch">
          <div class="flex w-50 items-center justify-end gap-2.5">
            <label for="password" class="fontstyle-ui-body-strong text-[#3A3A3A]">パスワード</label>
          </div>
          <div class="flex grow flex-col gap-1">
            <PasswordTextbox
              id="password"
              v-model="password"
              :error-message="
                isValid || password.length === 0 ? '' : 'このパスワードは使用できません'
              "
              class="grow gap-1"
            />
            <div class="flex shrink-0 grow basis-0 flex-col items-start justify-center">
              <p class="fontstyle-ui-caption-strong text-text-secondary">
                文字数は〇以上〇以下で、半角英数字と記号が使用できます。
              </p>
              <p class="fontstyle-ui-caption-strong text-text-secondary">
                英字、数字、記号がそれぞれ1文字以上含まれている必要があります。
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center gap-6 self-stretch pb-5">
          <div class="flex w-50 items-center justify-end gap-2.5">
            <label for="confirmation" class="fontstyle-ui-body-strong text-[#3A3A3A]">パスワード (確認)</label>
          </div>
          <PasswordTextbox
            id="confirmation"
            v-model="confirmation"
            :error-message="
              isConfirmed || confirmation.length === 0 ? '' : 'パスワードが一致しません'
            "
            class="grow gap-1"
          />
        </div>
        <div class="flex items-center justify-center gap-4 self-stretch">
          <PrimaryButton
            text="再設定"
            :disabled="!(isValid && isConfirmed)"
            class="flex items-end justify-center gap-2.5 px-8 py-2"
            @click="submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
