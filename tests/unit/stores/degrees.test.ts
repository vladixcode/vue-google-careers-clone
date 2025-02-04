import { describe, type Mock } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useDegreesStore } from '@/stores/degrees'

import { createDegree } from 'tests/utils/createDegree'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores all degrees that jobs may require', () => {
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_DEGREES', () => {
    it('makes API request and stores received degrees', async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: 'some degree',
          },
        ],
      })

      const store = useDegreesStore()
      await store.FETCH_DEGREES()

      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: 'some degree',
        },
      ])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_DEGREES', () => {
    it('finds unique degrees from collection of degrees', () => {
      const store = useDegreesStore()
      store.degrees = [
        createDegree({ degree: 'degree sample Z' }),
        createDegree({ degree: 'degree sample W' }),
      ]

      const result = store.UNIQUE_DEGREES

      expect(result).toEqual(['degree sample Z', 'degree sample W'])
    })
  })
})
