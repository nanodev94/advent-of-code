import { games } from './data'
import { sum } from '../utils'
import type{ GameConfig } from './types'


const minGameConfigs = games.map(gameInfo => {
  const minGameConfig: GameConfig = { blue: 0, green: 0, red: 0 }

  const sets = gameInfo.split(': ')[1]
  const cubes = sets.split('; ').map(setInfo => setInfo.split(', ')).flat()
  cubes.forEach(cube => {
    const [ count, color ] = cube.split(' ')
    const countNumber = parseInt(count)

    if (countNumber > minGameConfig[color]) {
      minGameConfig[color] = countNumber
    }
  })

  return minGameConfig
})

const gamesPower = minGameConfigs.map(conf => conf.blue * conf.green * conf.red)

console.log(sum(gamesPower))
