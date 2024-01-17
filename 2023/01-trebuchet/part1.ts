import { calibrationDocument } from './data'
import { sum } from '../utils'


const calibrationValues = calibrationDocument.map(line => {
  const firstDigit = line.split('').find(char => char.match(/\d/)) ?? ''
  const lastDigit = line.split('').findLast(char => char.match(/\d/)) ?? ''

  return parseInt(`${firstDigit}${lastDigit}`)
})

console.log(sum(calibrationValues))
