import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { UNIQUE_ORGANIZATIONS, useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

vi.mock('axios')

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Jobs global state', () => {
  it('stores job listing', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

describe('FETCH_JOBS', () => {
  it('makes API request and stores received jobs', async () => {
    axios.get.mockResolvedValue({ data: ['job 1', 'job 2'] })
    const store = useJobsStore()
    await store.FETCH_JOBS()
    expect(store.jobs).toEqual(['job 1', 'job 2'])
  })
})

describe('jobs getters', () => {
  it('finds unique organizations from list of jobs ', () => {
    const store = useJobsStore()

    // To mutate state we always use store actions
    // In test ecosystem we go with the simplest approach that test needs
    store.jobs = [
      { organization: 'google' },
      { organization: 'amazon' },
      { organization: 'google' },
    ]

    const result = store[UNIQUE_ORGANIZATIONS]

    expect(result).toEqual(new Set(['google', 'amazon']))
  })

  describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
    it('identifies jobs that are associated with the given organizations', () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [
        { organization: 'amazon' },
        { organization: 'google' },
        { organization: 'microsoft' },
      ]

      const userStore = useUserStore()
      userStore.slectedOrganizations = ['google', 'microsoft']

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS

      expect(result).toEqual([{ organization: 'google' }, { organization: 'microsoft' }])
    })
  })
})
