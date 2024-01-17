import { scratchcards } from './data'
import { sum } from '../utils'
import type { Scratchcard } from './types'


const cards: Scratchcard[] = scratchcards.map(scratchcard => {
  const [ cardName, cardInfo ] = scratchcard.split(': ')
  const [ winningNumbers, myNumbers] = cardInfo
    .split(' | ')
    .map(list => list.split(' '))
    .map(list => list.filter(v => v !== ''))

  const matchingNumbers = myNumbers
    .filter(myNumber => winningNumbers.some(winningNumber => winningNumber === myNumber))
    .length

  return { name: cardName, winningNumbers, myNumbers, matchingNumbers }
})

const scratchcardCounts = new Array(scratchcards.length).fill(1)
cards.forEach(({ matchingNumbers }, index) => {
  for (let i=1; i<=matchingNumbers; i++) {
    scratchcardCounts[index + i] += scratchcardCounts[index]
  }
})

console.log(sum(scratchcardCounts))
