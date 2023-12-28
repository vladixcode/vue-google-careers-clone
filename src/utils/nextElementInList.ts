const nextElementInList = <T>(list: T[], currentValue: T) => {
  const currentValueIndex = list.indexOf(currentValue)
  const nextValueIndex = (currentValueIndex + 1) % list.length
  return list[nextValueIndex]
}

export default nextElementInList
