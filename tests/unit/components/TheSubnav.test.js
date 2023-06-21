import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/TheSubnav.vue'

describe('TheSubnav', () => {
  describe('when user is on jobs page', () => {
    it('displays job count', () => {
      render(TheSubnav, {
        data() {
          return {
            onJobResultPage: true,
          }
        },
      })
      const jobCount = screen.getByText('42')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT display job count', () => {
      render(TheSubnav, {
        data() {
          return {
            onJobResultPage: false,
          }
        },
      })
      const jobCount = screen.gueryByText('42')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
