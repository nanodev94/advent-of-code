import { data } from './data'
import type { Hand } from './types'


const CAMEL_CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const HAND_TYPES = [
  'HighCard', 'OnePair', 'TwoPair', 'ThreeKind','FullHouse', 'FourKind', 'FiveKind',
]

const getCardValue = (hand: string, i: number) => CAMEL_CARDS.indexOf(hand.at(i) || '')

const getHandType = ({ hand }: { hand: string }) => {
  let type = 'HighCard'

  const cards: {[key:string]: number} = {}
  hand.split('').forEach(card => {
    if (!cards[card]) cards[card] = 0
    cards[card]++
  })

  const counts = Object.values(cards)
  if (counts.some(c => c === 5)) type = 'FiveKind'
  else if (counts.some(c => c === 4)) type = 'FourKind'
  else if (counts.some(c => c === 3) && counts.some(c => c === 2)) type = 'FullHouse'
  else if (counts.some(c => c === 3)) type = 'ThreeKind'
  else if (counts.filter(c => c === 2).length === 2) type = 'TwoPair'
  else if (counts.filter(c => c === 2).length === 1) type = 'OnePair'

  return type
}

const hands: Hand[] = data.map(line => {
  const [hand, bid] = line.split(' ')
  return { hand, bid: parseInt(bid), type: getHandType({ hand }) }
})

const handsByType = hands
  .reduce((A, B) => {
    A[B.type] = A[B.type] || []
    A[B.type].push(B)
    return A
  }, {} as { [key: string]: Hand[] })

const handsByTypeOrdered: {[key:string]: Hand[]} = {}
Object.entries(handsByType).forEach(([handType, hands]) => {
  handsByTypeOrdered[handType] = hands.sort((A, B) => {
    for (let i=0; i<A.hand.length; i++) {
      const cardAValue = getCardValue(A.hand, i)
      const cardBValue = getCardValue(B.hand, i)
      if (cardAValue !== cardBValue) return cardBValue - cardAValue
    }
    return 0
  })
})

let totalWinnings = 0
let rank = 1
HAND_TYPES.forEach(handType => {
  if (handsByTypeOrdered[handType]) {
    handsByTypeOrdered[handType].forEach(hand => {
      totalWinnings += hand.bid * rank
      rank++
    })
  }
})

console.log(totalWinnings)
