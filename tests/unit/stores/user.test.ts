import { createPinia, setActivePinia } from 'pinia'

import { useUserStore, LOGIN_USER } from '@/stores/user'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('user inital state', () => {
  it('keeps track of if user is logged in', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('stores organizations that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })

  it('stores jobs types that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })

  it('stores degrees that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedDegrees).toEqual([])
  })
})

describe('user store actions', () => {
  it('logs the user in', () => {
    const store = useUserStore()
    store[LOGIN_USER]()
    expect(store.isLoggedIn).toBe(true)
  })

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGANIZATIONS(['org1', 'org2'])
      expect(store.selectedOrganizations).toEqual(['org1', 'org2'])
    })
  })

  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates job types the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_JOB_TYPES(['full-time', 'part-time'])
      expect(store.selectedJobTypes).toEqual(['full-time', 'part-time'])
    })
  })

  describe('ADD_SELECTED_DEGREES', () => {
    it('updates degrees the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_DEGREES(['degree 1', 'degree 2'])
      expect(store.selectedDegrees).toEqual(['degree 1', 'degree 2'])
    })
  })
})
