import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('CollapsibleAccordian', () => {
  const renderCollapsibleAccordian = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: 'my category',
      },
      ...config,
    })
  }

  it('renders child content', async () => {
    renderCollapsibleAccordian({
      props: {
        header: 'my category',
      },
      slots: {
        default: '<h3>my nested child</h3>',
      },
    })

    expect(screen.queryByText('my nested child')).not.toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /my category/i,
    })

    await userEvent.click(button)

    expect(screen.queryByText('my nested child')).toBeInTheDocument()
  })

  describe('when parent does not provide custom child content', () => {
    it('renders default content', async () => {
      renderCollapsibleAccordian({
        props: {
          header: 'my category',
        },
      })

      const button = screen.getByRole('button', {
        name: /my category/i,
      })

      await userEvent.click(button)

      expect(screen.queryByText(/Default or fallback slot HTML content/i)).toBeInTheDocument()
    })
  })
})
