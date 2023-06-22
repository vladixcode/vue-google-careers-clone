import nextElementInList from '@/utils/nextElementInList'

describe('nextElementInLIst', () => {
  it('locates element in list and returns the next element in list', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const currentValue = 'C'
    const result = nextElementInList(list, currentValue)
    expect(result).toBe('D')
  })

  describe('when the element is at the end of the list', () => {
    it('locates next element at start of the list', () => {
      const list = ['A', 'B', 'C', 'D', 'E']
      const currentValue = 'E'
      const result = nextElementInList(list, currentValue)
      expect(result).toBe('A')
    })
  })
})
