import { LOCATIONS_LIST_1, LOCATIONS_LIST_2 } from './data';
import type { OccurrencesList } from './types';
import { sum } from '../utils';

const occurrences: OccurrencesList = {}
LOCATIONS_LIST_2.forEach(num => {
  if (!occurrences[num]) occurrences[num] = 0
  occurrences[num]++
})

const distances = LOCATIONS_LIST_1.map(
  num => num * (occurrences[num] ?? 0),
)

console.log(sum(distances))
