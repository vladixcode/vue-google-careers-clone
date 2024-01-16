import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'

describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string
    uniqueValues: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {},
  ): JobFiltersSidebarCheckboxGroupProps => ({
    header: 'Some header',
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props,
  })

  const renderJobFiltersSidebarCheckboxGroup = (props: JobFiltersSidebarCheckboxGroupProps) => {
    // Setup testing environment
    const pinia = createTestingPinia()

    const push = vi.fn()

    useRouterMock.mockReturnValue({ push })

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    })

    return { push }
  }
  it('renders unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['full-time', 'part-time']),
    })
    renderJobFiltersSidebarCheckboxGroup(props)

    const button = screen.getByRole('button', {
      name: /job types/i,
    })

    await userEvent.click(button)

    const jobTypesListitems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListitems.map((node) => node.textContent)

    expect(jobTypes).toEqual(['full-time', 'part-time'])
  })
  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbox for value', async () => {
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['full-time', 'part-time']),
      })
      renderJobFiltersSidebarCheckboxGroup(props)

      const button = screen.getByRole('button', {
        name: /job types/i,
      })

      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i,
      })

      // screen.debug()

      await userEvent.click(fullTimeCheckbox)

      expect(props.action).toHaveBeenCalledWith(['full-time'])
    })

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['full-time', 'part-time']),
      })
      const { push } = renderJobFiltersSidebarCheckboxGroup(props)

      // Decouple fro mthe real store getter implementation
      // jobsStore[UNIQUE_JOB_TYPES] = new Set(['full-time'])

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
