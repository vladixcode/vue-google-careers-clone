import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarOrganizationsVue from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs'

describe('JobFiltersSidebarOrganizations', () => {
  it('renders unique list of organizations from jobs', async () => {
    // Setup testing environment
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    // Decouple fro mthe real store getter implementation
    jobsStore[UNIQUE_ORGANIZATIONS] = new Set(['google', 'amazon'])

    render(JobFiltersSidebarOrganizationsVue, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    const button = screen.getByRole('button', {
      name: /organizations/i,
    })

    await userEvent.click(button)

    const organizationListitems = screen.getAllByRole('listitem')
    const organizations = organizationListitems.map((node) => node.textContent)

    expect(organizations).toEqual(['google', 'amazon'])
  })
})
