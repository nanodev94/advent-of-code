import { map } from './data'
import { lcm } from '../utils'
import type { Nodes } from './types'


const NUM_INSTRUCTIONS = map.instructions.length

const nodeEndsWithA = (node: string) => node.at(-1) === 'A'
const nodeEndsWithZ = (node: string) => node.at(-1) === 'Z'

const nodes = map.nodes.reduce((A, B) => {
  const [node, nextNodes] = B.split(' = ')
  const [L, R] = nextNodes.slice(1, -1).split(', ')
  return { ...A, [node]: { L, R }}
}, {} as Nodes)

const initialNodes = Object.keys(nodes).filter(node => nodeEndsWithA(node))

const stepsToEnd = initialNodes.map(node => {
  let step = 0
  let currentNode = node

  while (!nodeEndsWithZ(currentNode)) {
    const currentInstruction = map.instructions[step % NUM_INSTRUCTIONS]
    currentNode = nodes[currentNode][currentInstruction]
    step++
  }

  return step
})

let lcmSteps = 1
stepsToEnd.forEach(step => { lcmSteps = lcm(step, lcmSteps) })

console.log(lcmSteps)
