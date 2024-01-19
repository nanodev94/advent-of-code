export type Direction = 'north' | 'south' | 'west' | 'east'

export type Beam = {
  direction: Direction;
  position: {
    x: number;
    y: number;
  }
}

export type Tile = {
  tile: string;
  beams: Beam[];
}
