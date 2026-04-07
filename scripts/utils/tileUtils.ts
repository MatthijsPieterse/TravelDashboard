// Encode numeric tile keys
export const encodeTile = (x: number, y: number) => (x << 16) | y;

// Decode numeric tile keys
export const decodeTile = (key: number): [number, number] => [
  (key >> 16) & 0xffff,
  key & 0xffff,
];
