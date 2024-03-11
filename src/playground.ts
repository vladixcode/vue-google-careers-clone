/**
 * @file testing various vue or JS related features and concepts
 *
 * * You can ingore this file
 *
 */

// const { ref, toRef, toRefs, reactive, computed } = require('vue')

// // import { ref } from 'vue'

// let a = ref(1)
// let b = ref(2)
// let c = computed(() => a.value + b.value)

// console.log(c.value)

// a.value = 5
// console.log(c.value)

// const person = reactive({
//   firstName: 'Boris',
//   lastName: 'Paskharev',
// })

// const { firstName, lastName } = toRefs(person)

// const title = computed(() => `${firstName.value} ${lastName.value} the Great`)
// console.log(title.value)

// person.firstName = 'Vladimir'
// console.log(title.value)

export const evenOrOdd = (number: number): string => {
  if (number % 2 === 0) {
    return 'Even'
  } else {
    return 'Odd'
  }
}

// const axios = require('axios')

// const url = 'http://localhost:3000/jobs'

// const fetchJobsThenSyntax = () => {
//   axios.get(url).then((response) => {
//     console.log(response.data)
//   })
// }

// const fetchJobsNewSyntax = async () => {
//   const response = await axios.get(url)
//   console.log(response.data)
// }

import type { Job } from '@/api/types'

const state1: Partial<Job> = {}

const state2: Partial<Job> = {
  organization: 'Microsoft',
}

// const state3: Partial<Job> = {
//   organization: 'Facebook',
//   jobType: 'something',
//   somethingelse: 'something',
// }

// console.log(state1, state2)
