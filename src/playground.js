export const evenOrOdd = (number) => {
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
