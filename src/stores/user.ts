import { defineStore } from 'pinia'

export const LOGIN_USER = 'LOGIN_USER'
export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS'
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES'
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES'

export interface UserState {
  isLoggedIn: boolean
  selectedOrganizations: string[]
  selectedJobTypes: string[]
  selectedDegrees: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
  }),
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
      this.selectedOrganizations = organizations
    },
    [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes
    },
    [ADD_SELECTED_DEGREES](degrees: string[]) {
      this.selectedDegrees = degrees
    },
  },
})
