import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useJobsStore } from '@/stores/jobs'

describe('TheSubnav', () => {
  const renderTheSubnav = (routeName) => {
    const pinia = createTestingPinia()
    const jobStore = useJobsStore()

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    return { jobStore }
  }
  describe('when user is on jobs page', () => {
    it('displays job count', async () => {
      const routeName = 'JobResults'
      const { jobStore } = renderTheSubnav(routeName)
      const numberOfJobs = 12

      jobStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      await nextTick()
      // screen.debug()
      const jobCount = screen.getByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT display job count', () => {
      const routeName = 'Home'
      const { jobStore } = renderTheSubnav(routeName)
      const numberOfJobs = 300

      jobStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
