import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'

describe('TheSubnav', () => {
  const renderTheSubnav = (routeName) => {
    render(TheSubnav, {
      global: {
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
  }
  describe('when user is on jobs page', () => {
    it('displays job count', () => {
      renderTheSubnav('JobResults')
      // screen.debug()
      const jobCount = screen.getByText('42')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT display job count', () => {
      // The way to properly test this is to have router and to use the user click event etc
      renderTheSubnav('Home')

      const jobCount = screen.queryByText('42')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
