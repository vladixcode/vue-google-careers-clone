import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useJobsStore } from '@/stores/jobs'

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
