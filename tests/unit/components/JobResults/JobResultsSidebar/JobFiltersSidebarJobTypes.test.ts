import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock

import JobFiltersSidebarJobTypesVue from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue'
import { useJobsStore, UNIQUE_JOB_TYPES } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

describe.skip('JobFiltersSidebarJobTypes', () => {
  const renderJobFiltersSidebarJobTypes = () => {
    // Setup testing environment
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()

    const push = vi.fn()

    useRouterMock.mockReturnValue({ push })

    render(JobFiltersSidebarJobTypesVue, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    return { jobsStore, userStore, push }
  }
  it('renders unique list of job types from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes()

    // Decouple fro mthe real store getter implementation
    // @ts-expect-error
    jobsStore[UNIQUE_JOB_TYPES] = new Set(['full-time', 'part-time'])

    const button = screen.getByRole('button', {
      name: /job types/i,
    })

    await userEvent.click(button)

    const jobTypesListitems = screen.getAllByRole('listitem')
    const organizations = jobTypesListitems.map((node) => node.textContent)

    expect(organizations).toEqual(['full-time', 'part-time'])
  })
  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for job types', async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarJobTypes()

      // Decouple fro mthe real store getter implementation
      // @ts-expect-error
      jobsStore[UNIQUE_JOB_TYPES] = new Set(['full-time', 'part-time'])

      const button = screen.getByRole('button', {
        name: /job types/i,
      })

      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      })

      // screen.debug()

      await userEvent.click(fullTimeCheckbox)

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(['full-time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const { jobsStore, push } = renderJobFiltersSidebarJobTypes()

      // Decouple fro mthe real store getter implementation
      // @ts-expect-error
      jobsStore[UNIQUE_JOB_TYPES] = new Set(['full-time'])

      const button = screen.getByRole('button', {
        name: /job types/i,
      })

      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      })

      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
