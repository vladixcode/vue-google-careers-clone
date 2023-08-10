import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { UNIQUE_ORGANIZATIONS, UNIQUE_JOB_TYPES, useJobsStore } from '@/stores/jobs'
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
  describe('UNIQUE_ORGANIZATIONS', () => {
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

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from the list of jobs', () => {
      const store = useJobsStore()

      store.jobs = [{ jobType: 'full-time' }, { jobType: 'part-time' }, { jobType: 'full-time' }]

      const result = store[UNIQUE_JOB_TYPES]

      expect(result).toEqual(new Set(['full-time', 'part-time']))
    })
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

    describe('when the user has not selected any organization', () => {
      it('returns all jobs', () => {
        const jobsStore = useJobsStore()
        jobsStore.jobs = [
          { organization: 'amazon' },
          { organization: 'google' },
          { organization: 'microsoft' },
        ]

        const userStore = useUserStore()
        userStore.slectedOrganizations = []

        const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS

        expect(result).toEqual([
          { organization: 'amazon' },
          { organization: 'google' },
          { organization: 'microsoft' },
        ])
      })
    })
  })

  describe('FILTERED_JOBS_BY_JOB_TYPES', () => {
    it('identifies jobs that are associated with given job types', () => {
      const jobsStore = useJobsStore()

      jobsStore.jobs = [
        { jobType: 'full-time' },
        { jobType: 'temporary' },
        { jobType: 'part-time' },
      ]

      const userStore = useUserStore()

      userStore.selectedJobTypes = ['part-time', 'full-time']

      const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES

      expect(result).toEqual([{ jobType: 'full-time' }, { jobType: 'part-time' }])
    })

    describe('when the user has not selected any job type', () => {
      it('returns all jobs', () => {
        const jobsStore = useJobsStore()
        jobsStore.jobs = [
          { jobType: 'full-time' },
          { jobType: 'temporary' },
          { jobType: 'part-time' },
        ]

        const userStore = useUserStore()
        userStore.selectedJobTypes = []

        const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES

        expect(result).toEqual([
          { jobType: 'full-time' },
          { jobType: 'temporary' },
          { jobType: 'part-time' },
        ])
      })
    })
  })
})
