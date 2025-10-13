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

test('cmp', () => {
  {
    const x = br(1, 2);
    const y = br(1, 2);
    expect(x.cmp(y)).toBe(0);
  }
  {
    const x = br(-1, 2);
    const y = br(-1, 2);
    expect(x.cmp(y)).toBe(0);
  }
  {
    const x = br(-1, 2);
    const y = br(1, 2);
    expect(x.cmp(y)).toBe(-1);
  }
  {
    const x = br(1, 2);
    const y = br(-1, 2);
    expect(x.cmp(y)).toBe(1);
  }

  {
    const x = br(3, 8);
    const y = br(1, 2);
    expect(x.cmp(y)).toBe(-1);
  }
  {
    const x = br(1, 2);
    const y = br(3, 8);
    expect(x.cmp(y)).toBe(1);
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
  expect(br(3, 1).toDecimalString(0)).toEqual('3');
  expect(br(3, 1).toDecimalString(1)).toEqual('3.0');
  expect(br(3, 1).toDecimalString(4)).toEqual('3.0000');
  expect(br(3, 2).toDecimalString(4)).toEqual('1.5000');
  expect(br(5, 3).toDecimalString(0)).toEqual('2');
  expect(br(5, 3).toDecimalString(1)).toEqual('1.7');
  expect(br(5, 3).toDecimalString(4)).toEqual('1.6667');
  expect(br(1, 2).toDecimalString(4)).toEqual('0.5000');
  expect(br(1, 20).toDecimalString(4)).toEqual('0.0500');
  expect(br(-3, 1).toDecimalString(0)).toEqual('-3');
  expect(br(-3, 1).toDecimalString(1)).toEqual('-3.0');
  expect(br(-3, 1).toDecimalString(4)).toEqual('-3.0000');
  expect(br(-3, 2).toDecimalString(4)).toEqual('-1.5000');
  expect(br(-5, 3).toDecimalString(0)).toEqual('-2');
  expect(br(-5, 3).toDecimalString(1)).toEqual('-1.7');
  expect(br(-5, 3).toDecimalString(4)).toEqual('-1.6667');
  expect(br(-1, 2).toDecimalString(4)).toEqual('-0.5000');
  expect(br(-1, 20).toDecimalString(4)).toEqual('-0.0500');

  expect(br(155554, 100000).toDecimalString(4)).toEqual('1.5555');
  expect(br(155556, 100000).toDecimalString(4)).toEqual('1.5556');
  expect(br(155555, 100000).toDecimalString(4)).toEqual('1.5556');
});

test('from decimal string', () => {
  expect(BigRational.parseDecimalString('')).toBeNull();
  expect(BigRational.parseDecimalString('.')).toBeNull();
  expect(BigRational.parseDecimalString('-')).toBeNull();
  expect(BigRational.parseDecimalString('-.')).toBeNull();
  expectBrEq(BigRational.parseDecimalString('14')!, br(14, 1));
  expectBrEq(BigRational.parseDecimalString('14.')!, br(14, 1));
  expectBrEq(BigRational.parseDecimalString('-14')!, br(-14, 1));
  expectBrEq(BigRational.parseDecimalString('-14.')!, br(-14, 1));
  expectBrEq(BigRational.parseDecimalString('.14')!, br(14, 100));
  expectBrEq(BigRational.parseDecimalString('-.14')!, br(-14, 100));
  expectBrEq(BigRational.parseDecimalString('0.14')!, br(14, 100));
  expectBrEq(BigRational.parseDecimalString('-0.14')!, br(-14, 100));
  expectBrEq(BigRational.parseDecimalString('23.14')!, br(2314, 100));
  expectBrEq(BigRational.parseDecimalString('-23.14')!, br(-2314, 100));
  expectBrEq(BigRational.parseDecimalString('23.0')!, br(23, 1));
  expectBrEq(BigRational.parseDecimalString('-23.0')!, br(-23, 1));
});

test('from number', () => {
  expectBrEq(BigRational.fromNumber(0), BigRational.ZERO);
  expectBrEq(BigRational.fromNumber(1), BigRational.ONE);
  expectBrEq(BigRational.fromNumber(-1), br(-1, 1));
  expectBrEq(BigRational.fromNumber(1.5), br(3, 2));
  expectBrEq(BigRational.fromNumber(-1.5), br(-3, 2));
  expectBrEq(BigRational.fromNumber(2), BigRational.TWO);
  expectBrEq(BigRational.fromNumber(-2), br(-2, 1));
  expectBrEq(BigRational.fromNumber(0.5), BigRational.ONE_HALF);
  expectBrEq(BigRational.fromNumber(10), BigRational.TEN);
  expectBrEq(BigRational.fromNumber(100), BigRational.ONE_HUNDRED);
  expectBrEq(BigRational.fromNumber(1000), BigRational.ONE_THOUSAND);
  expectBrEq(BigRational.fromNumber(10000), BigRational.TEN_THOUSAND);

  // The fun of binary floating point
  expectBrEq(BigRational.fromNumber(0.1), BigRational.from(3602879701896397n, 36028797018963968n));
  expectBrEq(BigRational.fromNumber(-0.1), BigRational.from(-3602879701896397n, 36028797018963968n));

  expectBrEq(BigRational.fromNumber(0.1).round(10n, RoundMode.DOWN), br(1, 10));
});

test('to number', () => {
  expect(BigRational.ZERO.toNumber()).toBe(0);
  expect(BigRational.ONE.toNumber()).toBe(1);
  expect(br(-1,1).toNumber()).toBe(-1);
  expect(br(1,10).toNumber()).toBeCloseTo(0.1);
  expect(br(1,3).toNumber()).toBeCloseTo(0.3333333333);
  expect(br(-1,3).toNumber()).toBeCloseTo(-0.3333333333);
  expect(br(10,3).toNumber()).toBeCloseTo(3.3333333333);
  expect(br(-10,3).toNumber()).toBeCloseTo(-3.3333333333);
});

test('power', () => {
  const result = BigRational.fromNumber(2).pow(3n);
  expect(result).toEqual(BigRational.fromNumber(8));

  const result2 = BigRational.fromNumber(2).pow(-3n);
  expect(result2).toEqual(
    BigRational.fromNumber(1).div(BigRational.fromNumber(8))
  );

  const result3 = BigRational.fromNumber(2).pow(0n);
  expect(result3).toEqual(BigRational.ONE);

  const result4 = BigRational.fromNumber(2).pow(1n);
  expect(result4).toEqual(BigRational.fromNumber(2));

  const result5 = BigRational.fromNumber(2).pow(2n);
  expect(result5).toEqual(BigRational.fromNumber(4));
});

function br(n: number, d: number): BigRational {
  return BigRational.from(BigInt(n), BigInt(d));
}

export function expectBrEq(br1: BigRational, br2: BigRational) {
  if (br1.numerator != br2.numerator || br1.denominator != br2.denominator) {
    expect.fail(`${br1.toString()} is not equal to ${br2.toString()}`);
  }
}

