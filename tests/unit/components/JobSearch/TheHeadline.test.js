import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'

import TheHeadline from '@/components/JobSearch/TheHeadline.vue'

describe('TheHeadline', () => {
  beforeEach(() => {
    // This will run only for this file for this describe block and its nested tests
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('displays introductory action verb', () => {
    render(TheHeadline)

    const actionPhrase = screen.getByRole('heading', {
      name: /build for everyone/i, // context of name here is text inside h1/h2/h3...
    })

    expect(actionPhrase).toBeInTheDocument()
  })

  it('changes action verb at a consistent interval', () => {
    const mock = vi.fn()
    vi.stubGlobal('setInterval', mock)
    render(TheHeadline)

    expect(mock).toHaveBeenCalled()
  })

  it('swaps action verb after interval', async () => {
    render(TheHeadline)
    vi.advanceTimersToNextTimer()

    await nextTick() // Next state of component, after data update and re-render

    const actionPhrase = screen.getByRole('heading', {
      name: /create for everyone/i,
    })

    expect(actionPhrase).toBeInTheDocument()
  })

  it('clears intervals when component unmount', () => {
    const clearIntervalMock = vi.fn()
    vi.stubGlobal('clearInterval', clearIntervalMock)
    const { unmount } = render(TheHeadline)
    unmount()

    expect(clearIntervalMock).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
  // describe('Vitest playground', () => {
  //   it('tracks whether it has been called', () => {
  //     const mockFunction = vi.fn()
  //     mockFunction(1, 7)
  //     expect(mockFunction).toHaveBeenCalledWith(1, 7)
  //   })
  // })
})
