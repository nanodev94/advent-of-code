import { map } from './data'
import type { Nodes } from './types'


const INITIAL_NODE = 'AAA'
const FINAL_NODE = 'ZZZ'
const NUM_INSTRUCTIONS = map.instructions.length

const nodes = map.nodes.reduce((A, B) => {
  const [node, nextNodes] = B.split(' = ')
  const [L, R] = nextNodes.slice(1, -1).split(', ')
  return { ...A, [node]: { L, R }}
}, {} as Nodes)

let steps = 0
let currentNode = INITIAL_NODE
while (currentNode !== FINAL_NODE) {
  const currentInstruction = map.instructions[steps % NUM_INSTRUCTIONS]
  currentNode = nodes[currentNode][currentInstruction]
  steps++
}

console.log(steps)
