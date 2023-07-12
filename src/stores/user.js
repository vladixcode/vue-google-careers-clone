import { defineStore } from 'pinia'

export const LOGIN_USER = 'LOGIN_USER'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    slectedOrganizations: [],
  }),
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true
    },
  },
})
