import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock

import JobFiltersSidebarOrganizationsVue from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

describe.skip('JobFiltersSidebarOrganizations', () => {
  const renderJobFiltersSidebarOrganizations = () => {
    // Setup testing environment
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()

    const push = vi.fn()
    useRouterMock.mockReturnValue({ push })

    render(JobFiltersSidebarOrganizationsVue, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    return { jobsStore, userStore, push }
  }
  it('renders unique list of organizations from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations()

    // Decouple fro mthe real store getter implementation
    // @ts-expect-error
    jobsStore[UNIQUE_ORGANIZATIONS] = new Set(['google', 'amazon'])

    const button = screen.getByRole('button', {
      name: /organizations/i,
    })

    await userEvent.click(button)

    const organizationListitems = screen.getAllByRole('listitem')
    const organizations = organizationListitems.map((node) => node.textContent)

    expect(organizations).toEqual(['google', 'amazon'])
  })

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for organization', async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations()

      // Decouple fro mthe real store getter implementation
      // @ts-expect-error
      jobsStore[UNIQUE_ORGANIZATIONS] = new Set(['google', 'amazon'])

      const button = screen.getByRole('button', {
        name: /organizations/i,
      })

      await userEvent.click(button)

      const googleCheckbox = screen.getByRole('checkbox', {
        name: /google/i,
      })

      await userEvent.click(googleCheckbox)

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['google'])
    })

    it('navigates user to job results page to see fresh barch of filtered jobs', async () => {
      const { jobsStore, push } = renderJobFiltersSidebarOrganizations()

      // Decouple fro mthe real store getter implementation
      // @ts-expect-error
      jobsStore[UNIQUE_ORGANIZATIONS] = new Set(['google'])

      const button = screen.getByRole('button', {
        name: /organizations/i,
      })

      await userEvent.click(button)

      const googleCheckbox = screen.getByRole('checkbox', {
        name: /google/i,
      })

      await userEvent.click(googleCheckbox)

      // check interaction with $router.push method
      expect(push).toBeCalledWith({ name: 'JobResults' })
    })
  })
})
