import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { UNIQUE_ORGANIZATIONS, useJobsStore } from '@/stores/jobs'

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
})
