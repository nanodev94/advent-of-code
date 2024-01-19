import { platform } from './data'
import { sum } from '../utils'


const ROUNDED_ROCKS = 'O'
const CUBE_ROCKS = '#'
const EMPTY_SPACE = '.'

const tilt = (platform: string[][]) => {
  const tiltedPlatform = [...platform]
  for (let y=0; y<platform.length; y++) {
    for (let x=0; x<platform[0].length; x++) {
      if (tiltedPlatform[y][x] === ROUNDED_ROCKS) {
        for (let i=y-1; i>=-1; i--) {
          if ((i === -1 || [CUBE_ROCKS, ROUNDED_ROCKS].includes(tiltedPlatform[i][x]))) break
          tiltedPlatform[i][x] = ROUNDED_ROCKS
          tiltedPlatform[i+1][x] = EMPTY_SPACE
        }
      }
    }
  }
  return tiltedPlatform
}

const tiltedPlatform = tilt(platform.map(row => row.split('')))

const loads = tiltedPlatform.map((row, index) => {
  const numOfRounded = row.filter(tile => tile === ROUNDED_ROCKS).length
  return numOfRounded * (platform.length - index)
})

console.log(sum(loads))
