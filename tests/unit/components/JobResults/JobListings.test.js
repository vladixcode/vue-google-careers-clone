import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRoute } from 'vue-router'
vi.mock('vue-router')
// import axios from 'axios'

// vi.mock('axios')

import JobsListings from '@/components/JobResults/JobListings.vue'
import { useJobsStore, FETCH_JOBS } from '@/stores/jobs'

describe('JobListings', () => {
  // Factory function
  // const createRoute = (queryParams = {}) => ({ query: { page: '5', ...queryParams } }) // Options API

  // Helper function
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    render(JobsListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    return { jobsStore }
  }

  it('fetches jobs', () => {
    useRoute.mockReturnValue({ query: {} })

    const { jobsStore } = renderJobListings()

    expect(jobsStore[FETCH_JOBS]).toHaveBeenCalled()
  })

  it('displayes maximum of 10 jobs', async () => {
    useRoute.mockReturnValue({ query: { page: '1' } })
    // renderJobListings(createRoute({ page: '1' }))
    const { jobsStore } = renderJobListings()

    // Simulates end result of an API call / Fetch operation.
    // This appraoch of accessing and updating store directly without using Pinia Actions should be allowd only in unit tests
    // In this test we do not test component interaction with Pinia store and its Actions or fetching logic details
    // We test component responsibility of displaying 10 jobs per page if there is N jobs in the jobs array
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      useRoute.mockReturnValue({ query: { page: undefined } }) // Compostion API
      // const queryParams = { page: undefined } // Options API
      // const $route = createRoute(queryParams)

      renderJobListings()

      expect(screen.getByText('Page: 1')).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number', () => {
      useRoute.mockReturnValue({ query: { page: '3' } }) // Composition API
      // const queryParams = { page: '3' }
      // const $route = createRoute(queryParams)

      renderJobListings()

      expect(screen.getByText('Page: 3')).toBeInTheDocument()
    })
  })

  describe('when a user is on the first page', () => {
    it('does not show link to previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } }) // Composition API
      // const queryParams = { page: '1' }
      // const $route = createRoute(queryParams)

      const { jobsStore } = renderJobListings()

      jobsStore.FILTERED_JOBS = Array(15).fill({})

      // Additional check that the UI is up to date and fetch async operation is done and component re-rendered
      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole('link', {
        name: /previous/i,
      })

      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to the next page', async () => {
      useRoute.mockReturnValue({ query: { page: '1' } }) // Composition API
      // const queryParams = { page: '1' }
      // const $route = createRoute(queryParams)

      renderJobListings()

      const jobsStore = useJobsStore()
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      // Additional check to await component to re-render
      await screen.findAllByRole('listitem')

      const nextLink = screen.queryByRole('link', {
        name: /next/i,
      })

      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when the user is on the last page', () => {
    it('does not show the link to the next page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } }) // Composition API
      // const queryParams = { page: '2' }
      // const $route = createRoute(queryParams)

      const { jobsStore } = renderJobListings()

      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')

      const nextLink = screen.queryByRole('link', {
        name: /next/i,
      })

      expect(nextLink).not.toBeInTheDocument()
    })

    it('show link to the previous page', async () => {
      useRoute.mockReturnValue({ query: { page: '2' } }) // Composition API
      // const queryParams = { page: '2' }
      // const $route = createRoute(queryParams)

      const { jobsStore } = renderJobListings()
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole('link', {
        name: /previous/i,
      })

      expect(previousLink).toBeInTheDocument()
    })
  })
})
