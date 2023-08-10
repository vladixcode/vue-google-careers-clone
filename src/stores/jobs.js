import { defineStore } from 'pinia'

import getJobs from '@/api/getJobs'

import { useUserStore } from './user'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS_BY_ORGANIZATIONS = 'FILTERED_JOBS_BY_ORGANIZATIONS'
export const FILTERED_JOBS_BY_JOB_TYPES = 'FILTERED_JOBS_BY_JOB_TYPES'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs()
      this.jobs = jobs
    },
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set()
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization))
      return uniqueOrganizations
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set()
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType))
      return uniqueJobTypes
    },
    [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
      const userStore = useUserStore()

      if (userStore.slectedOrganizations.length === 0) {
        return state.jobs
      } else {
        return state.jobs.filter((job) => userStore.slectedOrganizations.includes(job.organization))
      }
    },
    [FILTERED_JOBS_BY_JOB_TYPES](state) {
      const userStore = useUserStore()

      if (userStore.selectedJobTypes.length === 0) {
        return state.jobs
      } else {
        return state.jobs.filter((job) => userStore.selectedJobTypes.includes(job.jobType))
      }
    },
  },
})
