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

  it("store's user's search term for skills and qualifications", () => {
    const store = useUserStore()
    expect(store.skillsSearchTerm).toBe('')
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

  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('receives search term for skills the user has entered ', () => {
      const store = useUserStore()
      store.skillsSearchTerm = ''
      store.UPDATE_SKILLS_SEARCH_TERM('javascript developer')
      expect(store.skillsSearchTerm).toBe('javascript developer')
    })
  })

  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useUserStore()

      store.selectedDegrees = ['degree 1']
      store.selectedJobTypes = ['job type 1']
      store.selectedOrganizations = ['organization 1']
      store.skillsSearchTerm = 'vue dev'

      store.CLEAR_USER_JOB_FILTER_SELECTIONS()

      expect(store.selectedDegrees).toEqual([])
      expect(store.selectedJobTypes).toEqual([])
      expect(store.selectedOrganizations).toEqual([])
      expect(store.skillsSearchTerm).toBe('')
    })
  })
})
