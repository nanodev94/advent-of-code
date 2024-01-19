import { contraption } from './data'
import { max, sum } from '../utils'
import type { Beam, Tile } from './types'


const EMPTY_SPACE = '.'
const MIRROR_1 = '/'
const MIRROR_2 = 'x'
const SPLITTER_1 = '|'
const SPLITTER_2 = '-'
const ROWS = contraption.length
const COLS = contraption[0].length

const getNextPosition = (beam: Beam): Beam => {
  const { direction, position } = beam

  const diffX = direction === 'west' ? -1 : direction === 'east' ? 1 : 0
  const diffY = direction === 'north' ? -1 : direction === 'south' ? 1 : 0

  const x = position.x + diffX
  const y = position.y + diffY

  return { direction, position: { x, y } }
}

const moveBeam = (layout: Tile[][], beam: Beam) => {
  const { direction, position } = beam
  const { x, y } = position
  if (x < 0 || x === COLS) return layout
  if (y < 0 || y === ROWS) return layout

  const { tile, beams } = layout[y][x]
  if (beams.find(b => b.direction === beam.direction)) return layout

  let energizedLayout: Tile[][] = [...layout]
  if (!energizedLayout[y][x].beams.length || tile === EMPTY_SPACE) {
    energizedLayout[y][x].beams.push(beam)
  }

  if (
    tile === EMPTY_SPACE ||
    (tile === SPLITTER_1 && ['north', 'south'].includes(direction)) ||
    (tile === SPLITTER_2 && ['west', 'east'].includes(direction))
  ) {
    const newBeam = getNextPosition(beam)
    energizedLayout = moveBeam(energizedLayout, newBeam)
  } else if (
    tile === SPLITTER_1 && ['west', 'east'].includes(direction)
  ) {
    const newBeam1 = getNextPosition({ ...beam, direction: 'north' })
    const newBeam2 = getNextPosition({ ...beam, direction: 'south' })
    energizedLayout = moveBeam(energizedLayout, newBeam1)
    energizedLayout = moveBeam(energizedLayout, newBeam2)
  } else if (
    tile === SPLITTER_2 && ['north', 'south'].includes(direction)
  ) {
    const newBeam1 = getNextPosition({ ...beam, direction: 'west' })
    const newBeam2 = getNextPosition({ ...beam, direction: 'east' })
    energizedLayout = moveBeam(energizedLayout, newBeam1)
    energizedLayout = moveBeam(energizedLayout, newBeam2)
  } else if (
    (tile === MIRROR_2 && direction === 'north') ||
    (tile === MIRROR_1 && direction === 'south')
  ) {
    const newBeam = getNextPosition({ ...beam, direction: 'west' })
    energizedLayout = moveBeam(energizedLayout, newBeam)
  } else if (
    (tile === MIRROR_1 && direction === 'north') ||
    (tile === MIRROR_2 && direction === 'south')
  ) {
    const newBeam = getNextPosition({ ...beam, direction: 'east' })
    energizedLayout = moveBeam(energizedLayout, newBeam)
  } else if (
    (tile === MIRROR_2 && direction === 'west') ||
    (tile === MIRROR_1 && direction === 'east')
  ) {
    const newBeam = getNextPosition({ ...beam, direction: 'north' })
    energizedLayout = moveBeam(energizedLayout, newBeam)
  } else if (
    (tile === MIRROR_1 && direction === 'west') ||
    (tile === MIRROR_2 && direction === 'east')
  ) {
    const newBeam = getNextPosition({ ...beam, direction: 'south' })
    energizedLayout = moveBeam(energizedLayout, newBeam)
  }

  return energizedLayout
}

const initialLayout: Tile[][] = contraption.map(
  row => row.split('').map(
    tile => ({ tile, beams: [] }),
  ),
)

const edgeBeams: Beam[] = []
for (let y=0; y<initialLayout.length; y++) {
  for (let x=0; x<initialLayout[0].length; x++) {
    if (y === 0) {
      edgeBeams.push({ direction: 'south', position: { x, y } })
    }
    if (y === initialLayout.length - 1) {
      edgeBeams.push({ direction: 'north', position: { x, y } })
    }
    if (x === 0) {
      edgeBeams.push({ direction: 'east', position: { x, y } })
    }
    if (x === initialLayout[0].length - 1) {
      edgeBeams.push({ direction: 'west', position: { x, y } })
    }
  }
}

const energizedTiles = edgeBeams.map(beam => {
  const copyLayout = JSON.parse(JSON.stringify(initialLayout))
  const energizedLayout = moveBeam(copyLayout, beam)
  return sum(energizedLayout.map(row => {
    return row.filter(tile => tile.beams.length).length
  }))
})

console.log(max(energizedTiles))
