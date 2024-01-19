export type Lens = {
  label: string;
  focalLength: number;
}

export type Book = {[key:string]: Lens[]}
