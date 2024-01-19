import { image } from './data'
import { max, min, sum, transpose } from '../utils'
import type { Point } from './types'

const GALAXY = '#'
const TIMES = 1000000

const galaxies: Point[] = []
image.forEach((row, y) => {
  row.split('').forEach((tile, x) => {
    if (tile === GALAXY) galaxies.push({ x, y })
  })
})

const emptyRows = image
  .map((row, y) => row.indexOf(GALAXY) === -1 ? y : -1)
  .filter(n => n !== -1)

const emptyCols = transpose(image.map(row => row.split('')))
  .map((col, x) => col.indexOf(GALAXY) === -1 ? x : -1)
  .filter(n => n !== -1)

const shortestPaths = galaxies.map((galaxy1, index) => {
  const paths: number[] = []
  const { x: x1, y: y1 } = galaxy1
  galaxies.slice(index+1).forEach(galaxy2 => {
    const { x: x2, y: y2 } = galaxy2
    const [minX, maxX] = [min([x1, x2]), max([x1, x2])]
    const [minY, maxY] = [min([y1, y2]), max([y1, y2])]
    const padX = (TIMES-1) * emptyCols.filter(n => minX < n && n < maxX).length
    const padY = (TIMES-1) * emptyRows.filter(n => minY < n && n < maxY).length

    paths.push(maxX-minX+padX + maxY-minY+padY)
  })
  return paths
}).flat()

console.log(sum(shortestPaths))
