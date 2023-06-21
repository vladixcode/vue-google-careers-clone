import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/TheSubnav.vue'

describe('TheSubnav', () => {
  describe('when user is on jobs page', () => {
    it('displays job count', () => {
      render(TheSubnav, {
        data() {
          return {
            onJobResultsPage: true,
          }
        },
      })
      const jobCount = screen.getByText('42')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT display job count', () => {
      // ! This test is not the best since it is not interacting with component in a way that the user will
      // ! This test knows a little too much about the implementation and the specifics of the component
      // The way to properly test this is to have router and to use the user click event etc
      render(TheSubnav, {
        data() {
          return {
            onJobResultsPage: false,
          }
        },
      })
      const jobCount = screen.queryByText('42')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
