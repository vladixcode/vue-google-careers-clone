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

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText('Page: 1')).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number', () => {
      const queryParams = { page: '3' }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText('Page: 3')).toBeInTheDocument()
    })
  })

  describe('when a user is on the first page', () => {
    it('does not show link to previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      // Additional check that the UI is up to date and fetch async operation is done and component re-rendered
      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole('link', {
        name: /previous/i,
      })

      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to the next page', async () => {
      axios.get.mockResolvedValue({ data: Array(12).fill({}) })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)

      renderJobListings($route)

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
      axios.get.mockResolvedValue({ data: Array(12).fill({}) })
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      await screen.findAllByRole('listitem')

      const nextLink = screen.queryByRole('link', {
        name: /next/i,
      })

      expect(nextLink).not.toBeInTheDocument()
    })

    it('show link to the previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(17).fill({}) })
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      await screen.findAllByRole('listitem')

      const previousLink = screen.queryByRole('link', {
        name: /previous/i,
      })

      expect(previousLink).toBeInTheDocument()
    })
  })
})
