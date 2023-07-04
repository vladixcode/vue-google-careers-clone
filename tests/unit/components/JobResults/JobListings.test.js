import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import axios from 'axios'

vi.mock('axios')

import JobsListings from '@/components/JobResults/JobListings.vue'

describe('JobListings', () => {
  it('fetches jobs', () => {
    axios.get.mockResolvedValue({ data: [] })
    render(JobsListings)

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs')
  })

  it('creates a job listing for every job', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) })
    render(JobsListings, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(15)
  })
})
