import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'

import { useRoute } from 'vue-router'
vi.mock('vue-router')

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useJobsStore } from '@/stores/jobs'

describe('TheSubnav', () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobStore = useJobsStore()

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    return { jobStore }
  }
  describe('when user is on jobs page', () => {
    it('displays job count', async () => {
      useRoute.mockReturnValue({ name: 'JobResults' })
      const { jobStore } = renderTheSubnav()
      const numberOfJobs = 12

      jobStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      await nextTick()
      // screen.debug()
      const jobCount = screen.getByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT display job count', async () => {
      useRoute.mockReturnValue({ name: 'Home' })
      const { jobStore } = renderTheSubnav()
      const numberOfJobs = 300

      jobStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      await nextTick()

      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
