import { sum } from '../utils';
import { UNUSUAL_DATA } from './data';
import type { Report } from './types';

const isSafeReport = (report: Report) => {
  const isIncreasing = report[0] < report[1]
  const isDecreasing = report[0] > report[1]

  for(let i=0; i<report.length-1; i++) {
    const differ = report[i+1] - report[i]
    if (![1, 2, 3].includes(Math.abs(differ)) ||
        (isIncreasing && differ < 0) ||
        (isDecreasing && differ > 0)) return 0
  }

  return 1
}

const safeReports = sum(UNUSUAL_DATA.map(
  report => isSafeReport(report),
))

console.log(safeReports)
