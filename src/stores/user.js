import { defineStore } from 'pinia'

export const LOGIN_USER = 'LOGIN_USER'
export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS'
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: [],
  }),
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true
    },
    [ADD_SELECTED_ORGANIZATIONS](payload) {
      this.selectedOrganizations = payload
    },
    [ADD_SELECTED_JOB_TYPES](payload) {
      this.selectedJobTypes = payload
    },
  },
})
