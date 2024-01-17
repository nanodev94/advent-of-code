import { data } from './data'


const getBeatRecordWays = ({ time, record }: { time: number, record: number }) => {
  let beatRecordWays = 0

  for (let speed=1; speed<time/2; speed++) {
    const currentDistance = (time - speed) * speed
    if (currentDistance > record) {
      beatRecordWays = (time - speed) - speed + 1
      break
    }
  }

  return beatRecordWays
}

const [time, record] = data.map(s =>
  parseInt(s.replaceAll(' ', '').split(':')[1]),
)

const waysToWin = getBeatRecordWays({ time, record })

console.log(waysToWin)
