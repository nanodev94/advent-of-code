import { report } from './data'
import { sum } from '../utils'


const getPrevExtrapolatedValue = (history: number[]): number => {
  if (history.every(value => value === 0)) return 0

  const diffs = []
  for (let i=1; i<history.length; i++) {
    diffs.push(history[i] - history[i-1])
  }

  return history[0] - getPrevExtrapolatedValue(diffs)
}

const historyLines = report.map(line => line.split(' ').map(value => parseInt(value)))

const extrapolatedValues = historyLines.map(history => getPrevExtrapolatedValue(history))

console.log(sum(extrapolatedValues))
