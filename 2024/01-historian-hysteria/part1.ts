import { LOCATIONS_LIST_1, LOCATIONS_LIST_2 } from './data';
import { sum } from '../utils';

const sortFn = (A: number, B: number) => A < B ? -1 : 1

const sortedList1 = LOCATIONS_LIST_1.toSorted(sortFn)
const sortedList2 = LOCATIONS_LIST_2.toSorted(sortFn)

const distances = sortedList1.map(
  (num, i) => Math.abs(num - sortedList2[i]),
)

console.log(sum(distances))
