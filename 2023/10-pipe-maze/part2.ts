import { sketch } from './data'
import { pickTheorem, shoelace } from '../utils'
import type { Tile } from './types'


const getInsideTiles = (loop: Tile[]): number => {
  const area = shoelace(loop)
  return pickTheorem(area, loop.length)
}

const areConnected = (tileA: Tile, tileB: Tile) =>
  (tileA.left && tileB.right) || (tileA.right && tileB.left) ||
  (tileA.top && tileB.bottom) || (tileA.bottom && tileB.top)

const getNextPoint = (map: Tile[][], prevPoint: Tile, currentTile: Tile): Tile | undefined => {
  const { pipe, x: currentX, y: currentY } = currentTile
  const diffX = currentX - prevPoint.x
  const diffY = currentY - prevPoint.y

  let nextCoord
  if (diffX !== 0 && pipe === '-') {
    nextCoord = { x: currentX + diffX, y: currentY }
  } else if ((diffX === 1 && pipe === '7') || (diffX === -1 && pipe === 'F')) {
    nextCoord = { x: currentX, y: currentY + 1 }
  } else if ((diffX === 1 && pipe === 'J') || (diffX === -1 && pipe === 'L')) {
    nextCoord = { x: currentX, y: currentY - 1 }
  } else if (diffY !== 0 && pipe === '|') {
    nextCoord = { x: currentX, y: currentY + diffY }
  } else if ((diffY === 1 && pipe === 'J') || (diffY === -1 && pipe === '7')) {
    nextCoord = { x: currentX - 1, y: currentY }
  } else if ((diffY === 1 && pipe === 'L') || (diffY === -1 && pipe === 'F')) {
    nextCoord = { x: currentX + 1, y: currentY }
  }

  if (nextCoord?.y === -1 || nextCoord?.y === sketch.length ||
    nextCoord?.x === -1 || nextCoord?.x === sketch[0].length) {
    return
  }

  if (nextCoord) {
    const nextTile = map[nextCoord.y][nextCoord.x]
    if (areConnected(currentTile, nextTile)){
      return nextTile
    }
  }
}

const buildLoop = (map: Tile[][], prevTile: Tile, currentTile: Tile): Tile[] => {
  let loop: Tile[] = [prevTile]

  if (!currentTile) return []

  while (currentTile.pipe !== 'S') {
    const nextTile = getNextPoint(map, prevTile, currentTile)
    if (!nextTile) {
      loop = []
      break
    }

    prevTile = currentTile
    currentTile = nextTile
    loop.push(prevTile)
  }

  return loop
}

const sketchTiles: Tile[][] = sketch.map((row, y) => {
  return row.split('').map((pipe, x) => {
    return {
      pipe,
      x,
      y,
      top: ['S', '|', 'L', 'J'].includes(pipe),
      bottom: ['S', '|', 'F', '7'].includes(pipe),
      left: ['S', '-', 'J', '7'].includes(pipe),
      right: ['S', '-', 'L', 'F'].includes(pipe),
    }
  })
})

const initialTile = sketchTiles.map(row => {
  return row.find(tile => tile.pipe === 'S')
}).find(tile => tile !== undefined)

if (initialTile) {
  const loop = [
    buildLoop([...sketchTiles], initialTile, sketchTiles[initialTile.y+1][initialTile.x]),
    buildLoop([...sketchTiles], initialTile, sketchTiles[initialTile.y-1][initialTile.x]),
    buildLoop([...sketchTiles], initialTile, sketchTiles[initialTile.y][initialTile.x+1]),
    buildLoop([...sketchTiles], initialTile, sketchTiles[initialTile.y][initialTile.x-1]),
  ].filter(loop => loop.length !== 0).at(0) || []

  const insideTiles = getInsideTiles(loop)

  console.log(insideTiles)
}
