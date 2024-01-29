import { describe, type Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'
import { useUserStore } from '@/stores/user'

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {},
  ): JobFiltersSidebarCheckboxGroupProps => ({
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props,
  })

  const renderJobFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    // Setup testing environment
    const pinia = createTestingPinia({ stubActions: false })
    const userStore = useUserStore()

    const push = vi.fn()

    useRouterMock.mockReturnValue({ push })

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    })

    return { push, userStore }
  }
  it('renders unique list of values', () => {
    const props = createProps({
      uniqueValues: new Set(['full-time', 'part-time']),
    })
    renderJobFiltersSidebarCheckboxGroup(props)

    const jobTypesListitems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListitems.map((node) => node.textContent)

    expect(jobTypes).toEqual(['full-time', 'part-time'])
  })
  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      const props = createProps({
        uniqueValues: new Set(['full-time', 'part-time']),
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      })

      // screen.debug()

      await userEvent.click(fullTimeCheckbox)

      expect(props.action).toHaveBeenCalledWith(['full-time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const props = createProps({
        uniqueValues: new Set(['full-time', 'part-time']),
      })
      const { push } = renderJobFiltersSidebarCheckboxGroup(props)

      // Decouple from the real store getter implementation
      // jobsStore[UNIQUE_JOB_TYPES] = new Set(['full-time'])

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      })

      await userEvent.click(fullTimeCheckbox)

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })

  describe('when user clears job filters', () => {
    it('unchecks any checked checkbox', async () => {
      const props = createProps({
        uniqueValues: new Set(['full-time', 'part-time']),
      })
      const { userStore } = renderJobFiltersSidebarCheckboxGroup(props)

      const checkboxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i,
      })

      await userEvent.click(checkboxBeforeAction)

      expect(checkboxBeforeAction.checked).toBe(true)

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS()

      const checkboxAfterAction = await screen.findByRole<HTMLInputElement>('checkbox', {
        name: /full-time/i,
      })

      expect(checkboxAfterAction.checked).toBe(false)
    })
  })
})
