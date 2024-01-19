import { initializationSequence } from './data'
import { sum } from '../utils'
import type{ Book } from './types'


const EQUAL_OPERATOR = '='
const DASH_OPERATOR = '-'

const hashAlgorithm = (label: string) => {
  let currentValue = 0

  label.split('').forEach(char => {
    currentValue += char.charCodeAt(0)
    currentValue *= 17
    currentValue %= 256
  })

  return currentValue
}

const boxes: Book = {}

initializationSequence.split(',').forEach(step => {
  const operation = step.indexOf(EQUAL_OPERATOR) !== -1 ? EQUAL_OPERATOR : DASH_OPERATOR
  const label = step.split(operation)[0]

  const relevantBox = hashAlgorithm(label)

  if (operation === DASH_OPERATOR) {
    const oldLensIndex = boxes[relevantBox]?.findIndex(box => box.label === label)
    if (boxes[relevantBox] && oldLensIndex !== -1) {
      boxes[relevantBox] = [
        ...boxes[relevantBox].slice(0, oldLensIndex),
        ...boxes[relevantBox].slice(oldLensIndex + 1),
      ]
    }
  } else if (operation === EQUAL_OPERATOR) {
    if (!boxes[relevantBox]) boxes[relevantBox] = []

    const focalLength = parseInt(step.split(operation)[1])
    const oldLensIndex = boxes[relevantBox]?.findIndex(box => box.label === label)

    if (oldLensIndex === -1) {
      boxes[relevantBox].push({ label, focalLength })
    } else {
      boxes[relevantBox][oldLensIndex].focalLength = focalLength
    }
  }
})

const focusingPower = sum(Object.entries(boxes).map(([box, lens]) => {
  return sum(lens.map(({ focalLength }, index) => {
    const boxIndex = parseInt(box) + 1
    const slotIndex = index + 1
    return boxIndex * slotIndex * focalLength
  }))
}))

console.log(focusingPower)
