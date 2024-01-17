import { calibrationDocument } from './data'
import { sum } from '../utils'
import type { ValueDigit } from './types'


const VALUE_DIGITS: ValueDigit[] = [
  { spell: 'one', digit: 1 },
  { spell: 'two', digit: 2 },
  { spell: 'three', digit: 3 },
  { spell: 'four', digit: 4 },
  { spell: 'five', digit: 5 },
  { spell: 'six', digit: 6 },
  { spell: 'seven', digit: 7 },
  { spell: 'eight', digit: 8 },
  { spell: 'nine', digit: 9 },
  { spell: '1', digit: 1 },
  { spell: '2', digit: 2 },
  { spell: '3', digit: 3 },
  { spell: '4', digit: 4 },
  { spell: '5', digit: 5 },
  { spell: '6', digit: 6 },
  { spell: '7', digit: 7 },
  { spell: '8', digit: 8 },
  { spell: '9', digit: 9 },
]

const findDigits = ({ line }: { line: string }) => {
  let firstIndex: number = Number.POSITIVE_INFINITY
  let lastIndex: number = Number.NEGATIVE_INFINITY
  let firstDigit: number = -1
  let lastDigit: number = -1

  VALUE_DIGITS.forEach(({ spell, digit }) => {
    const index1 = line.indexOf(spell)
    const index2 = line.lastIndexOf(spell)

    if (index1 !== -1 && index1 < firstIndex) {
      firstIndex = index1
      firstDigit = digit
    }

    if (index2 !== -1 && index2 > lastIndex) {
      lastIndex = index2
      lastDigit = digit
    }
  })

  return { firstDigit, lastDigit }
}

const calibrationValues = calibrationDocument.map(line => {
  const { firstDigit, lastDigit } = findDigits({ line })
  return parseInt(`${firstDigit}${lastDigit}`)
})

console.log(sum(calibrationValues))
