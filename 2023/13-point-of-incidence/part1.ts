import { data } from './data'
import { sum, transpose } from '../utils'


const getVerticalMirror = (map: string[]) => {
  const transposedMap = transpose(map.map(row => row.split('')))
  return getHorizontalMirror(transposedMap.map(row => row.join('')))
}

const getHorizontalMirror = (map: string[]) => {
  for (let i=0; i<map.length-1; i++) {
    if (map[i] === map[i+1]) {
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
  const horizontal = 100 * (getHorizontalMirror(map) + 1)
  const vertical = !horizontal ? getVerticalMirror(map) + 1 : 0
  return horizontal || vertical
})

console.log(sum(lineReflections))
