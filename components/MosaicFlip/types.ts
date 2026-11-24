export const FACES = [
  'face-front',
  'face-rear',
  'face-right',
  'face-left',
  'face-top',
  'face-bottom',
] as const

export type Face = (typeof FACES)[number]

export interface Tile {
  element: HTMLDivElement
  faces: Record<Face, HTMLDivElement>
  row: number
  col: number
}

export interface MosaicConfig {
  tilesX?: number
  tilesY?: number
  tileSize?: number
  images: string[]
  tileClassName: string
  faceClassPrefix: string
}
