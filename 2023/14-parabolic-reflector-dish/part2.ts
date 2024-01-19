import { platform } from './data'
import { rotate90, sum } from '../utils'


const ROUNDED_ROCKS = 'O'
const CUBE_ROCKS = '#'
const EMPTY_SPACE = '.'
const CYCLES = 1000000000

const tilt = (platform: string[][]) => {
  const tiltedPlatform = [...platform]
  for (let y=0; y<tiltedPlatform.length; y++) {
    for (let x=0; x<tiltedPlatform[0].length; x++) {
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

const spinCycle = (platform: string[][]): string[][] => {
  const tiltedNorthPlatform = tilt(platform)
  const tiltedWestPlatform = tilt(rotate90(tiltedNorthPlatform))
  const tiltedSouthPlatform = tilt(rotate90(tiltedWestPlatform))
  const tiltedEastPlatform = tilt(rotate90(tiltedSouthPlatform))

  return rotate90(tiltedEastPlatform)
}

let tiltedPlatform: string[][] = [...platform.map(row => row.split(''))]

const totalLoads = []
for (let cycle=0; cycle<200; cycle++) {
  tiltedPlatform = spinCycle(tiltedPlatform)

  const loads = tiltedPlatform.map((row, index) => {
    const numOfRounded = row.filter(tile => tile === ROUNDED_ROCKS).length
    return numOfRounded * (platform.length - index)
  })

  totalLoads.push(sum(loads))
}

const loop: number[] = []
for (let i=totalLoads.length-1; i>0; i--) {
  let isLoop = false
  if (loop.length && totalLoads[i] === loop[0]) {
    isLoop = true
    for (let j=0; j<loop.length; j++) {
      if (loop[j] !== totalLoads[i-j]) {
        isLoop = false
        break
      }
    }
  }

  if (!isLoop) loop.push(totalLoads[i])
  else break
}

loop.reverse()

const loopPos = (CYCLES % loop.length) - ((totalLoads.length - loop.length + 1) % loop.length)
const totalLoad = loop[loopPos >= 0 ? loopPos : loop.length + loopPos]

console.log(totalLoad)
