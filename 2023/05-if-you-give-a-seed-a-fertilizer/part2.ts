import { almanac } from './data'


const parseLine = (line: string) => line.split(' ').map(v => parseInt(v))

const getOutput = ({ map, source }: { map: number[][], source: number }) => {
  for (let i=0; i<map.length; i++) {
    const [ destinationStart, sourceStart, rangeLength ] = map[i]
    const sourceDiff = source - sourceStart
    if (sourceDiff >= 0 && sourceDiff < rangeLength) {
      return destinationStart + sourceDiff
    }
  }

  return source
}

const seedToSoilMap = almanac.seedToSoilMap.map(line => parseLine(line))
const soilToFertilizerMap = almanac.soilToFertilizerMap.map(line => parseLine(line))
const fertilizerToWaterMap = almanac.fertilizerToWaterMap.map(line => parseLine(line))
const waterToLightMap = almanac.waterToLightMap.map(line => parseLine(line))
const lightToTemperatureMap = almanac.lightToTemperatureMap.map(line => parseLine(line))
const temperatureToHumidityMap = almanac.temperatureToHumidityMap.map(line => parseLine(line))
const humidityToLocationMap = almanac.humidityToLocationMap.map(line => parseLine(line))

let lowestLocation = Number.POSITIVE_INFINITY
const rangesOfSeeds = parseLine(almanac.seeds)
for (let i=1; i<rangesOfSeeds.length; i+=2) {
  const rangeStart = rangesOfSeeds[i-1]
  const rangeLength = rangesOfSeeds[i]

  for (let j=0; j<rangeLength; j++) {
    const seed = rangeStart + j
    const soil = getOutput({ map: seedToSoilMap, source: seed })
    const fertilizer = getOutput({ map: soilToFertilizerMap, source: soil })
    const water = getOutput({ map: fertilizerToWaterMap, source: fertilizer })
    const light = getOutput({ map: waterToLightMap, source: water })
    const temperature = getOutput({ map: lightToTemperatureMap, source: light })
    const humidity = getOutput({ map: temperatureToHumidityMap, source: temperature })
    const location = getOutput({ map: humidityToLocationMap, source: humidity })

    if (location < lowestLocation) lowestLocation = location
  }
}

console.log(lowestLocation)
