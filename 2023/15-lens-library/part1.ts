import { initializationSequence } from './data'
import { sum } from '../utils'


const hashAlgorithm = (label: string) => {
  let currentValue = 0

  label.split('').forEach(char => {
    currentValue += char.charCodeAt(0)
    currentValue *= 17
    currentValue %= 256
  })

  return currentValue
}

const currentValues = initializationSequence.split(',').map(
  step => hashAlgorithm(step),
)

console.log(sum(currentValues))
