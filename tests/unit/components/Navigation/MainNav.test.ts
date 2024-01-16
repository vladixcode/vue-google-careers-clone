import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import { useRoute } from 'vue-router'
vi.mock('vue-router')

// Component is the default export of the file
import MainNav from '@/components/Navigation/MainNav.vue'
import { useUserStore } from '@/stores/user'

const useRouteMock = useRoute as Mock

describe('MainNav', () => {
  const renderMainNav = () => {
    // Use store without mocking its state and actions if you prefer integration tests to test component & store
    // const pinia = createTestingPinia({ stubActions: false }) // Real world implementation with no mocks of store actions etc
    const pinia = createTestingPinia() // Default and prefered way with mocking

    useRouteMock.mockReturnValue({
      name: 'Home',
    })

    render(MainNav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    })
  }
  it('displays company name', () => {
    renderMainNav()
    // screen.debug()
    const companyName = screen.getByText(/bobo careers/i)
    expect(companyName).toBeInTheDocument()
  })

  /**
   * The expected outcome might be hardcoded
   * If we would follow TDD approach this would be the test we would write
   */
  it('displays manu items for navigation', () => {
    renderMainNav()
    // screen.getByRole('listitem')
    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent)
    // console.log(navigationMenuTexts)
    // expect(navigationMenuTexts).toBe()
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Bobo corp',
      'How we hire',
      'Students',
      'Jobs',
    ])
  })

  describe('when the user logs in', () => {
    it('displayes user profile picture', async () => {
      // write all test assertions
      renderMainNav()
      const userStore = useUserStore()

      // screen.getByRole('img')
      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        name: /sign in/i,
      })

      // We are focused on testing the component rather than the store
      // This is a user test for MainNav component and its responsibility
      // Simulate expected result of pinia action
      userStore.isLoggedIn = true
      await userEvent.click(loginButton)

      // By this point our ProfileImage should exist
      profileImage = screen.getByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})

/**
 * This is not good appraoch since it goes too deep into the implementation details
 */
// describe('MainNav with second argument', () => {
//   it('displayes company name', () => {
//     render(MainNav, {
//       data() {
//         return {
//           company: 'Some other name',
//         }
//       },
//     })
//     const companyName = screen.getByText('Bobo Careers')
//     expect(companyName).toBeInTheDocument()
//   })
// })
