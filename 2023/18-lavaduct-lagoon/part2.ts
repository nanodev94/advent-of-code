import { digPlan } from './data'
import { pickTheorem, shoelace } from '../utils'


const DIR_CODES: {[key:string]: string} = {
  0: 'R',
  1: 'D',
  2: 'L',
  3: 'U',
}

const getTerrainPolygon = (digPlan: string[]) => {
  let boundaryPoints = 0
  const polygon = [{ x: 0, y: 0 }]

  digPlan.forEach(line => {
    const hex = line.split(' ')[2].slice(1, -1)

    const amount = parseInt(hex.slice(1, -1), 16)
    const dir = DIR_CODES[hex.slice(-1)]

    const nextVertex = {...polygon[polygon.length-1]}
    if (dir === 'U') nextVertex.y += amount
    else if (dir === 'D') nextVertex.y -= amount
    else if (dir === 'L') nextVertex.x -= amount
    else if (dir === 'R') nextVertex.x += amount

    boundaryPoints += amount
    polygon.push(nextVertex)
  })

  return { terrainPolygon: polygon.slice(0, -1), boundaryPoints }
}

const { terrainPolygon, boundaryPoints } = getTerrainPolygon(digPlan)

const area = shoelace(terrainPolygon)
const cubicMetersOfLava = pickTheorem(area, boundaryPoints) + boundaryPoints

console.log(cubicMetersOfLava)
