import type { Mock } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import type { Job } from '@/api/types'
import { UNIQUE_ORGANIZATIONS, UNIQUE_JOB_TYPES, useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { createJob } from 'tests/utils/createJob'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

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
    axiosGetMock.mockResolvedValue({ data: ['job 1', 'job 2'] })
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
        createJob({ organization: 'google' }),
        createJob({ organization: 'amazon' }),
        createJob({ organization: 'google' }),
      ]

      const result = store[UNIQUE_ORGANIZATIONS]

      expect(result).toEqual(new Set(['google', 'amazon']))
    })
  })

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from the list of jobs', () => {
      const store = useJobsStore()

      store.jobs = [
        createJob({ jobType: 'full-time' }),
        createJob({ jobType: 'part-time' }),
        createJob({ jobType: 'full-time' }),
      ]

      const result = store[UNIQUE_JOB_TYPES]

      expect(result).toEqual(new Set(['full-time', 'part-time']))
    })
  })

  describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes a job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []

        const store = useJobsStore()
        const job = createJob({ organization: 'google' })

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given organizations', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = ['google', 'microsoft']

        const store = useJobsStore()
        const job = createJob({ organization: 'google' })

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })
    })
  })

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any job type', () => {
      it('includes a job', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []

        const store = useJobsStore()
        const job = createJob({ jobType: 'full-time' })

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given job types', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = ['full-time', 'part-time']

        const store = useJobsStore()
        const job = createJob({ jobType: 'part-time' })

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

        expect(result).toBe(true)
      })
    })
  })

  describe('INCLUDE_JOB_BY_DEGREE', () => {
    describe('when the user has not selected any degrees', () => {
      it('includes a job', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []

        const store = useJobsStore()
        const job = createJob()

        const result = store.INCLUDE_JOB_BY_DEGREE(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given degrees', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = ['degree 1', 'degree 2']

        const store = useJobsStore()
        const job = createJob({ degree: 'degree 1' })

        const result = store.INCLUDE_JOB_BY_DEGREE(job)

        expect(result).toBe(true)
      })
    })
  })

  describe('INCLUDE_JOB_BY_SKILL', () => {
    describe("when the user doesn't enter search term", () => {
      it('includes a job', () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = ''

        const jobStore = useJobsStore()
        const job = createJob({ title: 'Vue developer' })

        const result = jobStore.INCLUDE_JOB_BY_SKILL(job)

        expect(result).toBe(true)
      })
    })
    describe('when the user enter search term', () => {
      it("identifies if the job matches user's skill", () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = 'vue'

        const jobStore = useJobsStore()
        const job = createJob({ title: 'Vue developer' })

        const result = jobStore.INCLUDE_JOB_BY_SKILL(job)

        expect(result).toBe(true)
      })

      it('handles inconsistent character casing', () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = 'vUE dEv'

        const jobStore = useJobsStore()
        const job = createJob({ title: 'Vue developer' })

        const result = jobStore.INCLUDE_JOB_BY_SKILL(job)

        expect(result).toBe(true)
      })
    })
  })
})
