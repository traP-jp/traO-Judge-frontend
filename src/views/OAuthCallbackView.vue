<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Oauth2Api } from '@/api/generated/apis/Oauth2Api'
import { ResponseError } from '@/api/generated/runtime'

onBeforeMount(async () => {
  const route = useRoute()

  if (
    route.params.provider !== 'google' &&
    route.params.provider !== 'github' &&
    route.params.provider !== 'traq'
  )
    throw new Error('Invalid provider')

  if (
    route.params.action !== 'login' &&
    route.params.action !== 'signup' &&
    route.params.action !== 'bind'
  )
    throw new Error('Invalid action')

  if (typeof route.query.code !== 'string') throw new Error('Invalid code')
  if (typeof route.query.state !== 'string') throw new Error('Invalid state')

  const provider = route.params.provider
  const action = route.params.action
  const code = route.query.code
  const state = route.query.state

  if (state !== sessionStorage.getItem('oauth_state'))
    throw new Error('Invalid state - Possible CSRF attack')
  sessionStorage.removeItem('oauth_state')

  const router = useRouter()

  // traQのOAuthは未実装

  try {
    if (action == 'signup') {
      const oauth2Api = new Oauth2Api()
      const response =
        provider === 'github'
          ? await oauth2Api.postGithubOAuthAuthorizeRaw({
              oauthAction: 'signup',
              oAuthAuthorizationCode: { code: code }
            })
          : await oauth2Api.postGoogleOAuthAuthorizeRaw({
              oauthAction: 'signup',
              oAuthAuthorizationCode: { code: code }
            })
      if (response.raw.status === 200) {
        const data = await response.value()
        const token = data.token
        router.push(`/signup/register?token=${token}&oauth=true`)
      } else if (response.raw.status === 204) {
        alert('The OAuth account is already registered')
        router.push('/')
      }
    } else if (action == 'login') {
      const oauth2Api = new Oauth2Api()
      const response =
        provider === 'github'
          ? await oauth2Api.postGithubOAuthAuthorizeRaw({
              oauthAction: 'login',
              oAuthAuthorizationCode: { code: code }
            })
          : await oauth2Api.postGoogleOAuthAuthorizeRaw({
              oauthAction: 'login',
              oAuthAuthorizationCode: { code: code }
            })
      if (response.raw.status === 200) {
        alert('The OAuth account is not registered, please register at first')
        const data = await response.value()
        const token = data.token
        router.push(`/signup/register?token=${token}&oauth=true`)
      } else if (response.raw.status === 204) {
        router.push('/')
      }
    } else if (action == 'bind') {
      const oauth2Api = new Oauth2Api()
      const response =
        provider === 'github'
          ? await oauth2Api.postGithubOAuthAuthorizeRaw({
              oauthAction: 'bind',
              oAuthAuthorizationCode: { code: code }
            })
          : await oauth2Api.postGoogleOAuthAuthorizeRaw({
              oauthAction: 'bind',
              oAuthAuthorizationCode: { code: code }
            })
      if (response.raw.status === 204) {
        router.push('/settings/account')
      }
    }
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      if (error.response.status === 400) {
        console.error('Invalid authorization code')
      } else if (error.response.status === 401) {
        console.error('Unauthorized')
      } else if (error.response.status === 500) {
        console.error('Internal Server Error')
      } else {
        console.error('Unknown error: ' + error.response.status)
      }
    } else {
      console.error('OAuth Error (' + action + '): ', error)
    }
  }
})
</script>

<template>
  <div class="text-text-primary">Processing OAuth callback, please wait...</div>
</template>

<style scoped></style>
