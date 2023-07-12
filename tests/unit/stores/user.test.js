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
    expect(store.slectedOrganizations).toEqual([])
  })
})

describe('user store actions', () => {
  it('logs the user in', () => {
    const store = useUserStore()
    store[LOGIN_USER]()
    expect(store.isLoggedIn).toBe(true)
  })
})

describe('ADD_SELECTED_ORGANIZATIONS', () => {
  it('updates organizations the user has chosen to filter jobs by', () => {
    const store = useUserStore()
    store.ADD_SELECTED_ORGANIZATIONS(['org1', 'org2'])
    expect(store.slectedOrganizations).toEqual(['org1', 'org2'])
  })
})
