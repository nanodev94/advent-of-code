import { digPlan } from './data'
import { pickTheorem, shoelace } from '../utils'


const getTerrainPolygon = (digPlan: string[]) => {
  let boundaryPoints = 0
  const polygon = [{ x: 0, y: 0 }]

  digPlan.forEach(line => {
    const [dir, amount] = line.split(' ')

    const nextVertex = {...polygon[polygon.length-1]}
    if (dir === 'U') nextVertex.y += parseInt(amount)
    else if (dir === 'D') nextVertex.y -= parseInt(amount)
    else if (dir === 'L') nextVertex.x -= parseInt(amount)
    else if (dir === 'R') nextVertex.x += parseInt(amount)

    boundaryPoints += parseInt(amount)
    polygon.push(nextVertex)
  })

  return { terrainPolygon: polygon.slice(0, -1), boundaryPoints }
}

const { terrainPolygon, boundaryPoints } = getTerrainPolygon(digPlan)

const area = shoelace(terrainPolygon)
const cubicMetersOfLava = pickTheorem(area, boundaryPoints) + boundaryPoints

console.log(cubicMetersOfLava)
