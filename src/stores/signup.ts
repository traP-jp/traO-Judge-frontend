import { defineStore } from 'pinia'

export const useSignupStore = defineStore('signup', {
  state: () => ({
    email: '',
    tokenExpiry: null as number | null
  }),
  actions: {
    setEmail(email: string) {
      this.email = email
      this.tokenExpiry = Date.now() + 60 * 60 * 1000
    },
    clearEmail() {
      this.email = ''
      this.tokenExpiry = null
    }
  },
  getters: {
    isValid: (state) => {
      return state.email && state.tokenExpiry && Date.now() < state.tokenExpiry
    }
  }
})
