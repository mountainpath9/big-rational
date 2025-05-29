// See Victor Stafusa's answer here
// 
// https://stackoverflow.com/questions/9383593/extracting-the-exponent-and-mantissa-of-a-javascript-number/78431217#78431217

const isBigEndian: boolean = (() => {
  const array = new Uint8Array(4);
  const view = new Uint32Array(array.buffer);
  return !((view[0] = 1) & array[0]);
})();

export interface NumberParts {
  sign: number,
  rawExponent: number,
  biasedExponent: number,
  mantissa: number,
}

export function getNumberParts(x: number): NumberParts {
  const order = isBigEndian ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  const asDouble = new Float64Array(1);
  const asBytes = new Uint8Array(asDouble.buffer);

  asDouble[0] = x;

  const sign = asBytes[order[7]] >> 7;
  const exponent = ((asBytes[order[7]] & 0x7f) << 4 | asBytes[order[6]] >> 4);

  asBytes[order[7]] = 0x43;
  asBytes[order[6]] &= 0x0f;
  asBytes[order[6]] |= 0x30;

  return {
    sign: sign,
    rawExponent: exponent,
    biasedExponent: exponent - 1023,
    mantissa: Number(BigInt(asDouble[0]) - 2n ** 52n)
  };
}
