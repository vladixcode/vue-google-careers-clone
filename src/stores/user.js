import { defineStore } from 'pinia'

export const LOGIN_USER = 'LOGIN_USER'
export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    slectedOrganizations: [],
  }),
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true
    },
    [ADD_SELECTED_ORGANIZATIONS](payload) {
      this.slectedOrganizations = payload
    },
  },
})
