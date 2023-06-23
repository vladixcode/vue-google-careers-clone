const nextElementInList = (list, currentValue) => {
  const currentValueIndex = list.indexOf(currentValue)
  const nextValueIndex = (currentValueIndex + 1) % list.length
  return list[nextValueIndex]
}

export default nextElementInList
