import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

// Component is the default export of the file
import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('displays company name', () => {
    render(MainNav)
    screen.debug()
    const companyName = screen.getByText('Bobo careers')
    expect(companyName).toBeInTheDocument()
  })

  /**
   * The expected outcome might be hardcoded
   * If we would follow TDD approach this would be the test we would write
   */
  it('displays manu items for navigation', () => {
    render(MainNav)
    // screen.getByRole('listitem')
    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent)
    console.log(navigationMenuTexts)
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
      render(MainNav)

      // screen.getByRole('img')
      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        name: /sign in/i,
      })

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
describe('MainNav with second argument', () => {
  it('displayes company name', () => {
    render(MainNav, {
      data() {
        return {
          company: 'Some other name',
        }
      },
    })
    const companyName = screen.getByText('Some other name')
    expect(companyName).toBeInTheDocument()
  })
})
