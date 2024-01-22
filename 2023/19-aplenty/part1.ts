import { list } from './data'
import { sum } from '../utils'
import type { Part, Workflows } from './types'


const isAcceptedPart = (workflows: Workflows, part: Part) => {
  let currentWorkflow = 'in'

  while(!['A', 'R'].includes(currentWorkflow)) {
    const rules = workflows[currentWorkflow]

    for (let i=0; i<rules.length; i++) {
      const rule = rules[i]
      if (i === rules.length-1) {
        currentWorkflow = rule
        break
      }

      const [condition, targetWorkflow] = rule.split(':')
      const key = condition[0]
      const op = condition[1]
      const value = parseInt(condition.slice(2))

      if ((op === '<' && part[key] < value) || (op === '>' && part[key] > value)) {
        currentWorkflow = targetWorkflow
        break
      }
    }
  }

  return currentWorkflow === 'A'
}

const workflows = list.workflows.reduce((A, B) => {
  const [flowName, rules] = B.split('{')
  A[flowName] = rules.slice(0, -1).split(',')
  return A
}, {} as Workflows)

const parts = list.parts.map(part => {
  const formatted: Part = {}
  part.slice(1, -1).split(',').forEach(p => {
    const [partName, value] = p.split('=')
    formatted[partName] = parseInt(value)
  })
  return formatted
})

const acceptedParts = parts.filter(part => isAcceptedPart(workflows, part))

const ratingNumbers = acceptedParts.map(part => {
  return sum(Object.values(part))
})

console.log(sum(ratingNumbers))
