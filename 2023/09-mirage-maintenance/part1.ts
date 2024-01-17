import { report } from './data'
import { sum } from '../utils'


const getNextExtrapolatedValue = (history: number[]): number => {
  if (history.every(value => value === 0)) return 0

  const diffs = []
  for (let i=1; i<history.length; i++) {
    diffs.push(history[i] - history[i-1])
  }

  return history[history.length-1] + getNextExtrapolatedValue(diffs)
}

const historyLines = report.map(line => line.split(' ').map(value => parseInt(value)))

const extrapolatedValues = historyLines.map(history => getNextExtrapolatedValue(history))

console.log(sum(extrapolatedValues))
