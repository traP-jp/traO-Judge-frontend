<script setup lang="ts">
import { AuthenticationApi } from '@/api/generated'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import { passwordValidator } from '@/utils/validator'

const route = useRoute()
const router = useRouter()
const token = Array.isArray(route.query.token) ? undefined : route.query.token

const password = ref<string>('')
const confirmation = ref<string>('')
const isValid = computed(() => passwordValidator(password.value))
const isConfirmed = computed(() => password.value === confirmation.value)

const submit = async () => {
  const authApi = new AuthenticationApi()
  try {
    await authApi.postResetPassword({
      tokenWithUserid: token ?? undefined,
      resetPasswordRequest: {
        password: password.value,
        token: token ?? ''
      }
    })
    router.push('/reset-password/success')
  } catch (error) {
    alert('パスワードの再設定に失敗しました。もう一度お試しください。')
    console.error('パスワード再設定エラー:', error)
  }
}
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary p-6">
    <div class="flex max-w-form-max flex-col gap-6 rounded-15 bg-background-primary px-14 py-10">
      <h1 class="fontstyle-ui-title text-text-primary">パスワードの再設定</h1>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <PasswordTextbox
            id="password"
            v-model="password"
            label="パスワード"
            required
            :error-message="isValid[0] || password.length === 0 ? '' : isValid[1]"
          />
          <div
            class="col-start-2 row-start-2 flex shrink-0 grow basis-0 flex-col items-start justify-center"
          >
            <p class="fontstyle-ui-caption text-text-secondary">
              半角英数字と記号(@, $, !, %, *, ?,
              &)を用いた8文字以上64文字以下のパスワードが利用できます。
            </p>
            <p class="fontstyle-ui-caption text-text-secondary">
              大文字と小文字の英字をそれぞれ1文字ずつ使用する必要があります。
            </p>
          </div>
        </div>

        <PasswordTextbox
          id="confirmation"
          v-model="confirmation"
          label="パスワード (確認)"
          required
          :error-message="
            isConfirmed || confirmation.length === 0 ? '' : 'パスワードが一致しません'
          "
        />
      </div>

      <form class="flex flex-col items-center gap-5 p-2.5" @submit.prevent="submit">
        <PrimaryButton
          :disabled="!(isValid && isConfirmed)"
          class="h-10 w-5/12 px-8"
          @click="submit"
        >
          再設定
        </PrimaryButton>
      </form>
    </div>
  </div>
</template>
