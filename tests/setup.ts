import { cleanup } from '@testing-library/vue'
import matchers from '@testing-library/jest-dom/matchers'
import { expect, afterEach } from 'vitest'

expect.extend(matchers)

// Global setting: This will run after every test is executed by vitest
afterEach(() => {
  cleanup() // Remove component from Virtual DOM and delete Virtual DOM, clan everything to prevent cross test pollution
})
