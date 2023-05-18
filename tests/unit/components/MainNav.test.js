import { render, screen } from '@testing-library/vue'

// Component is the default export of the file
import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('displayes company name', () => {
    render(MainNav)
    screen.debug()
    const companyName = screen.getByText('Bobo careers')
    expect(companyName).toBeInTheDocument()
  })
})
