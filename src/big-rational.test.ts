import { expect, test } from 'vitest'
import { BigRational, RoundMode } from "./big-rational";

test('normalization', () => {
  {
    const x = br(1, 2);
    expect(x.numerator).toBe(1n);
    expect(x.denominator).toBe(2n);
  }
  {
    const x = br(-1, 2);
    expect(x.numerator).toBe(-1n);
    expect(x.denominator).toBe(2n);
  }
  {
    const x = br(1, -2);
    expect(x.numerator).toBe(-1n);
    expect(x.denominator).toBe(2n);
  }
  {
    const x = br(-1, -2);
    expect(x.numerator).toBe(1n);
    expect(x.denominator).toBe(2n);
  }
  {
    const x = br(2000, 4000);
    expect(x.numerator).toBe(1n);
    expect(x.denominator).toBe(2n);
  }
})

test('division by zero', () => {
  expect(() => br(2, 0)).toThrow(RangeError);
})


test('addition', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expectBrEq(x.add(y), br(1, 1));
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expectBrEq(x.add(y), br(0, 1));
  }
  {
    const x = br(2, 3);
    const y = br(7, 8);
    expectBrEq(x.add(y), br(37, 24));
  }
})

test('subtraction', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expectBrEq(x.sub(y), br(0, 1));
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expectBrEq(x.sub(y), br(1, 1));
  }
  {
    const x = br(2, 3);
    const y = br(7, 8);
    expectBrEq(x.sub(y), br(-5, 24));
  }
})

test('multiplication', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expectBrEq(x.mul(y), br(1, 4));
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expectBrEq(x.mul(y), br(-1, 4));
  }
  {
    const x = br(2, 3);
    const y = br(7, 8);
    expectBrEq(x.mul(y), br(7, 12));
  }
})

test('division', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expectBrEq(x.div(y), br(1, 1));
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expectBrEq(x.div(y), br(-1, 1));
  }
  {
    const x = br(2, 3);
    const y = br(7, 8);
    expectBrEq(x.div(y), br(16, 21));
  }
})

test('equal', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expect(x.eq(y)).toBeTruthy();
  }
  {
    const x = br(-1, 2);
    const y = br(-1, 2);
    expect(x.eq(y)).toBeTruthy();
  }
  {
    const x = br(-1, 2);
    const y = br(1, 2);
    expect(x.eq(y)).toBeFalsy();
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expect(x.eq(y)).toBeFalsy();
  }

  {
    const x = br(3, 8);
    const y = br(1, 2);
    expect(x.eq(y)).toBeFalsy();
  }
  {
    const x = br(1, 2);
    const y = br(3, 8);
    expect(x.eq(y)).toBeFalsy();
  }
})

test('not equal', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expect(x.neq(y)).toBeFalsy();
  }
  {
    const x = br(-1, 2);
    const y = br(-1, 2);
    expect(x.neq(y)).toBeFalsy();
  }
  {
    const x = br(-1, 2);
    const y = br(1, 2);
    expect(x.neq(y)).toBeTruthy();
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expect(x.neq(y)).toBeTruthy();
  }

  {
    const x = br(3, 8);
    const y = br(1, 2);
    expect(x.neq(y)).toBeTruthy();
  }
  {
    const x = br(1, 2);
    const y = br(3, 8);
    expect(x.neq(y)).toBeTruthy();
  }
})



test('less than', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expect(x.lt(y)).toBeFalsy();
  }
  {
    const x = br(-1, 2);
    const y = br(-1, 2);
    expect(x.lt(y)).toBeFalsy();
  }
  {
    const x = br(-1, 2);
    const y = br(1, 2);
    expect(x.lt(y)).toBeTruthy();
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expect(x.lt(y)).toBeFalsy();
  }

  {
    const x = br(3, 8);
    const y = br(1, 2);
    expect(x.lt(y)).toBeTruthy();
  }
  {
    const x = br(1, 2);
    const y = br(3, 8);
    expect(x.lt(y)).toBeFalsy();
  }
})

test('less than or equal', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expect(x.lte(y)).toBeTruthy();
  }
  {
    const x = br(-1, 2);
    const y = br(-1, 2);
    expect(x.lte(y)).toBeTruthy();
  }
  {
    const x = br(-1, 2);
    const y = br(1, 2);
    expect(x.lte(y)).toBeTruthy();
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expect(x.lte(y)).toBeFalsy();
  }

  {
    const x = br(3, 8);
    const y = br(1, 2);
    expect(x.lte(y)).toBeTruthy();
  }
  {
    const x = br(1, 2);
    const y = br(3, 8);
    expect(x.lte(y)).toBeFalsy();
  }
})

test('rounding', () => {
  {
    const x = br(100, 3);
    expectBrEq(x.round(10n, RoundMode.DOWN), br(333, 10));
  }
  {
    const x = br(100, 3);
    expectBrEq(x.round(10n, RoundMode.UP), br(334, 10));
  }
  {
    const x = br(-100, 3);
    expectBrEq(x.round(10n, RoundMode.DOWN), br(-334, 10));
  }
  {
    const x = br(-100, 3);
    expectBrEq(x.round(10n, RoundMode.UP), br(-333, 10));
  }
})


test('to bigint with decimals', () => {
  expect(br(0, 1).toBigIntWithDecimals(6n)).toEqual(0n);
  expect(br(1, 2).toBigIntWithDecimals(6n)).toEqual(500000n);
  expect(br(1, 3).toBigIntWithDecimals(6n)).toEqual(333333n);
  expect(br(-1, 3).toBigIntWithDecimals(6n)).toEqual(-333333n);
})

test('to scaled bigint', () => {
  expect(br(0, 1).toScaledBigInt(1000000n)).toEqual(0n);
  expect(br(1, 2).toScaledBigInt(1000000n)).toEqual(500000n);
  expect(br(1, 3).toScaledBigInt(1000000n)).toEqual(333333n);
  expect(br(-1, 3).toScaledBigInt(1000000n)).toEqual(-333333n);
})

test('to decimal string', () => {
  expect(br(3, 1).toDecimalString(4)).toEqual('3.0000');
  expect(br(3, 2).toDecimalString(4)).toEqual('1.5000');
  expect(br(5, 3).toDecimalString(4)).toEqual('1.6667');
  expect(br(1, 2).toDecimalString(4)).toEqual('0.5000');
  expect(br(1, 20).toDecimalString(4)).toEqual('0.0500');
  expect(br(-3, 1).toDecimalString(4)).toEqual('-3.0000');
  expect(br(-3, 2).toDecimalString(4)).toEqual('-1.5000');
  expect(br(-5, 3).toDecimalString(4)).toEqual('-1.6667');
  expect(br(-1, 2).toDecimalString(4)).toEqual('-0.5000');
  expect(br(-1, 20).toDecimalString(4)).toEqual('-0.0500');

  expect(br(155554, 100000).toDecimalString(4)).toEqual('1.5555');
  expect(br(155556, 100000).toDecimalString(4)).toEqual('1.5556');
  expect(br(155555, 100000).toDecimalString(4)).toEqual('1.5556');
});

test('from decimal string', () => {
  expect(BigRational.fromDecimalString('')).toBeNull();
  expect(BigRational.fromDecimalString('.')).toBeNull();
  expect(BigRational.fromDecimalString('-')).toBeNull();
  expect(BigRational.fromDecimalString('-.')).toBeNull();
  expectBrEq(BigRational.fromDecimalString('14')!, br(14, 1));
  expectBrEq(BigRational.fromDecimalString('14.')!, br(14, 1));
  expectBrEq(BigRational.fromDecimalString('-14')!, br(-14, 1));
  expectBrEq(BigRational.fromDecimalString('-14.')!, br(-14, 1));
  expectBrEq(BigRational.fromDecimalString('.14')!, br(14, 100));
  expectBrEq(BigRational.fromDecimalString('-.14')!, br(-14, 100));
  expectBrEq(BigRational.fromDecimalString('0.14')!, br(14, 100));
  expectBrEq(BigRational.fromDecimalString('-0.14')!, br(-14, 100));
  expectBrEq(BigRational.fromDecimalString('23.14')!, br(2314, 100));
  expectBrEq(BigRational.fromDecimalString('-23.14')!, br(-2314, 100));
  expectBrEq(BigRational.fromDecimalString('23.0')!, br(23, 1));
  expectBrEq(BigRational.fromDecimalString('-23.0')!, br(-23, 1));
});


function br(n: number, d: number): BigRational {
  return BigRational.from(BigInt(n), BigInt(d));
}

export function expectBrEq(br1: BigRational, br2: BigRational) {
  if (br1.numerator != br2.numerator || br1.denominator != br2.denominator) {
    expect.fail(`${br1.toString()} is not equal to ${br2.toString()}`);
  }
}

