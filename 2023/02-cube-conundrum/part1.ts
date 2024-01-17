import { games } from './data'
import { sum } from '../utils'
import type{ GameConfig } from './types'


const gameConfig: GameConfig = {
  blue: 14,
  green: 13,
  red: 12,
}

const validGameIds = games.map(gameInfo => {
  const [ gameName, sets ] = gameInfo.split(': ')
  let gameId = parseInt(gameName.split(' ')[1])

  sets.split('; ').forEach(setInfo => {
    setInfo.split(', ').forEach(cube => {
      const [ count, color ] = cube.split(' ')
      if (parseInt(count) > gameConfig[color]) {
        gameId = -1
      }
    })
  })

  return gameId
}).filter(id => id !== -1)

console.log(sum(validGameIds))
