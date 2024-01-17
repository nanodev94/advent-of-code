import { engineSchematic } from './data'
import { sum } from '../utils'
import type { PartNumbers, Point } from './types'


const isDigit = (char : string) => /[0-9]/.test(char)
const isSymbol = (char: string) => char !== '.' && !isDigit(char)

const getPartNumber = (schematic: string[], point: Point) => {
  const { x, y } = point
  if (y < 0 || x === schematic.length) return { point, value: 0 }
  if (x < 0 || x === schematic[0].length) return { point, value: 0 }
  if (!isDigit(schematic[y][x])) return { point, value: 0 }

  const firstIndex = schematic[y].slice(0, x).split('').findLastIndex(c => !isDigit(c)) + 1
  const lastIndex = schematic[y].slice(x).split('').findIndex(c => !isDigit(c)) + x

  return {
    point: { x: firstIndex, y },
    value: parseInt(schematic[y].slice(firstIndex, lastIndex)),
  }
}

const filledEngineSchematic = engineSchematic.map(line => `.${line}.`)

const symbolPoints: Point[] = []
filledEngineSchematic.forEach((row, y) => {
  row.split('').forEach((tile, x) => {
    if (isSymbol(tile)) symbolPoints.push({ x, y })
  })
})

const partNumbers: PartNumbers = {}
symbolPoints.forEach(({ x, y }) => {
  const adjacentPoints: Point[] = [
    { x: x+1, y }, { x: x+1, y: y-1 }, { x: x+1, y: y+1 }, { x, y: y+1 },
    { x: x-1, y }, { x: x-1, y: y-1 }, { x: x-1, y: y+1 }, { x, y: y-1 },
  ]
  adjacentPoints.forEach(adjacent => {
    const { point, value } = getPartNumber(filledEngineSchematic, adjacent)
    if (value) partNumbers[`${point.x},${point.y}`] = value
  })
})

console.log(sum(Object.values(partNumbers)))
