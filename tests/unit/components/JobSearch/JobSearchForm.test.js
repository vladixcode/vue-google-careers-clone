import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { useRouter } from 'vue-router'
vi.mock('vue-router')

import JobsSearchForm from '@/components/JobSearch/JobSearchForm.vue'

describe('JobSearchForm', () => {
  describe('when user submits form', () => {
    it("directs user to job results page with user's search parameteres", async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({
        push,
      })
      render(JobsSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      })

      const roleInput = screen.getByRole('textbox', {
        name: /role/i, // Text of label for role input field (context)
      })

      await userEvent.type(roleInput, 'Vue developer')

      const locationInput = screen.getByRole('textbox', {
        name: /where/i,
      })

      await userEvent.type(locationInput, 'New York')

      const submitButton = screen.getByRole('button', {
        name: /search/i, // internal text of button
      })

      await userEvent.click(submitButton)

      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: {
          role: 'Vue developer',
          location: 'New York',
        },
      })
    })
  })
})
