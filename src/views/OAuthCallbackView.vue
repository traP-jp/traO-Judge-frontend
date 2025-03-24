<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

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

if (state !== localStorage.getItem('oauth_state'))
  throw new Error('Invalid state - Possible CSRF attack')

const router = useRouter()

if (action == 'signup') {
  try {
    const response = await fetch(`${provider}-oauth2/signup/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })
    if (response.status === 200) {
      const data = await response.json()
      const token = data.token
      router.push(`/signup/register?token=${token}&oauth=true`)
    } else if (response.status === 204) {
      alert('The OAuth account is already registered')
      router.push('/')
    } else if (response.status === 400) {
      throw new Error('Invalid authorization code')
    } else if (response.status === 500) {
      throw new Error('Internal Server Error')
    } else {
      throw new Error('Unknown error: ' + response.status)
    }
  } catch (error) {
    console.error('OAuth Signup Error:', error)
  }
} else if (action == 'login') {
  try {
    const response = await fetch(`${provider}-oauth2/login/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })
    if (response.status === 200) {
      alert('The OAuth account is not registered, please register at first')
      const data = await response.json()
      const token = data.token
      router.push(`/signup/register?token=${token}&oauth=true`)
    } else if (response.status === 204) {
      router.push('/')
    } else if (response.status === 400) {
      throw new Error('Invalid authorization code')
    } else if (response.status === 500) {
      throw new Error('Internal Server Error')
    } else {
      throw new Error('Unknown error: ' + response.status)
    }
  } catch (error) {
    console.error('OAuth Login Error:', error)
  }
} else if (action == 'bind') {
  try {
    const response = await fetch(`${provider}-oauth2/bind/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })
    if (response.status === 204) {
      router.push('/settings/account')
    } else if (response.status === 400) {
      throw new Error('Invalid authorization code')
    } else if (response.status === 500) {
      throw new Error('Internal Server Error')
    } else {
      throw new Error('Unknown error: ' + response.status)
    }
  } catch (error) {
    console.error('OAuth Bind Error:', error)
  }
}
</script>

<template>
  <div class="text-text-primary">Processing OAuth callback, please wait...</div>
</template>

<style scoped></style>
