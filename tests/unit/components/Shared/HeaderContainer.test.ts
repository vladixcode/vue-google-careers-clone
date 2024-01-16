import { render, screen } from '@testing-library/vue'

import HeaderContainerVue from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer', () => {
  it('allows parent component to provide title content', () => {
    render(HeaderContainerVue, {
      slots: {
        title: '<h2>some title</h2>',
      },
    })

    expect(screen.getByText('some title')).toBeInTheDocument()
  })

  it('allows parent component to provide subtitle content', () => {
    render(HeaderContainerVue, {
      slots: {
        subtitle: '<h2>some subtitle</h2>',
      },
    })

    expect(screen.getByText('some subtitle')).toBeInTheDocument()
  })
})
