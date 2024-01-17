import { data } from './data'
import { mult } from '../utils'


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

const [times, records] = data.map(line =>
  line.split(' ').filter(v => v !== '').slice(1).map(v => parseInt(v)),
)

const waysBeatRecord: number[] = []
for (let i=0; i<times.length; i++) {
  waysBeatRecord.push(getBeatRecordWays({ time: times[i], record: records[i] }))
}

console.log(mult(waysBeatRecord))
