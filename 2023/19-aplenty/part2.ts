import { list } from './data'
import { mult } from '../utils'
import type { PossibleRatings, Workflows } from './types'


const getDistinctCombinations = (
  currentWorkflow: string,
  workflows: Workflows,
  possibleRatings: PossibleRatings,
) => {
  if (currentWorkflow === 'R') return 0

  if (currentWorkflow === 'A')
    return mult(Object.values(possibleRatings).map(({ min, max }) => max - min + 1))

  let distinctCombinations = 0
  const copyPossibleRatings = { ...possibleRatings }
  const rules = workflows[currentWorkflow]
  for (let i=0; i<rules.length; i++) {
    const rule = rules[i]
    if (i === rules.length-1) {
      distinctCombinations += getDistinctCombinations(rule, workflows, copyPossibleRatings)
    } else {
      const [condition, targetWorkflow] = rule.split(':')
      const key = condition[0]
      const op = condition[1]
      const value = parseInt(condition.slice(2))
      const { max, min } = copyPossibleRatings[key]

      if (op === '<' && value > min) {
        const newPossibleRatings = { ...copyPossibleRatings }

        copyPossibleRatings[key] = {
          min: value < max ? value : min,
          max,
        }
        newPossibleRatings[key] = {
          min,
          max: value < max ? value - 1 : max,
        }

        distinctCombinations += getDistinctCombinations(
          targetWorkflow,
          workflows,
          newPossibleRatings,
        )
      } else if (op === '>' && value < max) {
        const newPossibleRatings = { ...copyPossibleRatings }

        copyPossibleRatings[key] = {
          min,
          max: value > min ? value : min,
        }
        newPossibleRatings[key] = {
          min: value > min ? value + 1 : min,
          max,
        }

        distinctCombinations += getDistinctCombinations(
          targetWorkflow,
          workflows,
          newPossibleRatings,
        )
      }
    }
  }

  return distinctCombinations
}

const workflows = list.workflows.reduce((A, B) => {
  const [flowName, rules] = B.split('{')
  A[flowName] = rules.slice(0, -1).split(',')
  return A
}, {} as Workflows)

const possibleRatings: PossibleRatings = {
  x: { min: 1, max: 4000 },
  m: { min: 1, max: 4000 },
  a: { min: 1, max: 4000 },
  s: { min: 1, max: 4000 },
}

const distinctCombinations = getDistinctCombinations('in', workflows, possibleRatings)

console.log(distinctCombinations)
