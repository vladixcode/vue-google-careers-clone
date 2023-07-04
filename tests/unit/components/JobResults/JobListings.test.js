import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import axios from 'axios'

vi.mock('axios')

import JobsListings from '@/components/JobResults/JobListings.vue'

describe('JobListings', () => {
  // Factory function
  const createRoute = (queryParams = {}) => ({ query: { page: '5', ...queryParams } })

  // Helper function
  const renderJobListings = ($route) => {
    render(JobsListings, {
      global: {
        mocks: {
          $route,
        },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  }

  it('fetches jobs', () => {
    axios.get.mockResolvedValue({ data: [] })
    renderJobListings(createRoute())

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs')
  })

  it('displayes maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) })

    renderJobListings(createRoute({ page: '1' }))

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })
})
