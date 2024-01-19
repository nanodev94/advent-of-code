import { data } from './data'
import { replaceChar, sum, transpose } from '../utils'


const ASH = '.'
const ROCK = '#'

const getVerticalMirror = (map: string[], prevLine?: number) => {
  const transposedMap = transpose(map.map(row => row.split('')))
  return getHorizontalMirror(transposedMap.map(row => row.join('')), prevLine)
}

const getHorizontalMirror = (map: string[], prevLine?: number) => {
  for (let i=0; i<map.length-1; i++) {
    if (map[i] === map[i+1] && (!prevLine || i+1 !== prevLine)) {
      if (i === 0 || i === map.length - 2) return i
      for (let j=i-1; j>=0; j--) {
        const index2 = i + 1 + (i - j)
        if (map[j] !== map[index2]) break
        if (j === 0 || index2 === map.length-1) return i
      }
    }
  }

  return -1
}

const maps = data.join(',').split(',,').map(map => map.split(','))

const lineReflections = maps.map(map => {
  const prevHorizontal = 100 * (getHorizontalMirror(map) + 1)
  const prevVertical = !prevHorizontal ? getVerticalMirror(map) + 1 : 0
  const prevResult = prevHorizontal || prevVertical

  for (let i=0; i<map.length; i++) {
    for (let j=0; j<map[0].length; j++) {
      const newMap = [...map]
      const newSymbol = newMap[i][j] === ROCK ? ASH : ROCK
      newMap[i] = replaceChar(newMap[i], j, newSymbol)

      const horizontal = 100 * (getHorizontalMirror(newMap, prevHorizontal/100) + 1)
      const vertical = getVerticalMirror(newMap, prevVertical) + 1
      const result = horizontal || vertical

      if (result && result !== prevResult) return result
    }
  }

  return 0
})

console.log(sum(lineReflections))
