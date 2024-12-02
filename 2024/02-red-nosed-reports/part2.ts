import { sum } from '../utils'
import { UNUSUAL_DATA } from './data'
import type { Report } from './types'

const start = new Date()

const isSafeReport = (report: Report, hasTolerance = true): number => {
  const isIncreasing = report[0] < report[1]
  const isDecreasing = report[0] > report[1]

  for(let i=1; i<report.length; i++) {
    const differ = report[i] - report[i-1]
    if (![1, 2, 3].includes(Math.abs(differ)) ||
      (isIncreasing && differ < 0) ||
      (isDecreasing && differ > 0)) {
      if (hasTolerance) {
        for(let j=0; j<report.length; j++) {
          const newReport = report.filter((_v, pos) => pos !== j)
          if (isSafeReport(newReport, false)) return 1
        }
      }

      return 0
    }
  }

  return 1
}

const safeReports = sum(UNUSUAL_DATA.map(
  report => isSafeReport(report),
))

console.log(safeReports)

const end = new Date()

console.log(`Time: ${end.getTime() - start.getTime()}ms`)