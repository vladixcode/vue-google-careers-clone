// * Thise functions are set globally
// import { describe, it, expect } from 'vitest'

import { evenOrOdd } from '@/playground.js'

describe('basic math', () => {
  it('adds two numbers', () => {
    expect(1 + 1).toBe(2)
  })

  describe('evenOrOdd', () => {
    describe('when number is even', () => {
      it('indicates the number is even', () => {
        expect(evenOrOdd(4)).toBe('Even')
      })
    })

    describe('wen number is odd', () => {
      it('indicates the number is odd', () => {
        expect(evenOrOdd(7)).toBe('Odd')
      })
    })
  })
})

// describe('another top level describe in file', () => {
//   it('subtracting two numbers', () => {
//     expect(1 - 1).toBe(0)
//   })
// })
