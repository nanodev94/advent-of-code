/* eslint-disable @typescript-eslint/no-explicit-any */
export const sum = (nums: number[]) => nums.reduce((sum, v) => sum + v, 0)

export const mult = (nums: number[]) => nums.reduce((mult, v) => mult * v, 1)

export const max = (nums: number[]) =>
  nums.reduce((max, v) => v > max ? v : max, Number.NEGATIVE_INFINITY)

export const min = (nums: number[]) =>
  nums.reduce((min, v) => v < min ? v : min, Number.POSITIVE_INFINITY)

export const gcd = (a: number, b: number): number => {
  const temp = a % b
  if (temp === 0) return b

  return gcd(b, temp)
}

export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)

// Shoelace formula: https://en.wikipedia.org/wiki/Shoelace_formula
export const shoelace = (polygon: { x: number, y: number }[]) => {
  const length = polygon.length

  let sum = 0
  for (let i=0; i<length; i++) {
    const { x: x1, y: y1 } = polygon[i]
    const { x: x2, y: y2 } = polygon[(i+1)%length]
    sum += x1*(length-y2) - x2*(length-y1)
  }

  return sum / 2
}

// Pick's theorem: https://en.wikipedia.org/wiki/Pick%27s_theorem
export const pickTheorem = (area: number, boundaryPoints: number) => {
  const i = area + 1 - boundaryPoints/2
  return i
}

export const transpose = (mat: any[][]): any[][] => {
  const transposed: any[][] = []

  for (let x=0; x<mat[0].length; x++) {
    const newRow = []
    for (let y=0; y<mat.length; y++) {
      newRow.push(mat[y][x])
    }
    transposed.push(newRow)
  }

  return transposed
}

export const rotate90 = (mat: any[][]): any[][] => {
  return mat[0].map((_val, index) => mat.map(row => row[index]).reverse())
}

export const replaceChar = (str: string, index: number, newChar: string) =>
  str.slice(0, index) + newChar + str.slice(index+1)
