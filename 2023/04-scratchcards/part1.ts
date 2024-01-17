import { scratchcards } from './data'
import { sum } from '../utils'
import type { CardPoint } from './types'


const cardPoints: CardPoint[] = scratchcards.map(scratchcard => {
  let points = 0
  const [ cardName, cardInfo ] = scratchcard.split(': ')
  const [ winningNumbers, myNumbers] = cardInfo
    .split(' | ')
    .map(list => list.split(' '))
    .map(list => list.filter(v => v !== ''))

  myNumbers.forEach(myNumber => {
    const isWinningNumber = winningNumbers.some(winningNumber => winningNumber === myNumber)
    if (isWinningNumber) points = !points ? 1 : points * 2
  })

  return { name: cardName, points }
})

const points = cardPoints.map(({ points }) => points)

console.log(sum(points))
