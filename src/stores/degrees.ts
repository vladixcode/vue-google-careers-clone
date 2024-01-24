import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import getDegrees from '@/api/getDegrees'
import type { Degree } from '@/api/types'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const FETCH_DEGREES = async () => {
    const receivedDegress = await getDegrees()
    degrees.value = receivedDegress
  }

  const UNIQUE_DEGREES = computed(() => degrees.value.map((degree) => degree.degree))

  // expose it from the store to the store user
  return {
    degrees,
    FETCH_DEGREES,
    UNIQUE_DEGREES,
  }
})
