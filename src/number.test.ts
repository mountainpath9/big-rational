import { expect, test } from 'vitest'
import { MAX_MANTISSA, getNumberParts } from './number';

test('parts', () => {
  // not exactly comprehensive

  {
    const parts = getNumberParts(0);
    expect(parts.sign).toBe(0);
    expect(parts.mantissa).toBe(0);
    expect(parts.biasedExponent).toBe(-1023);
  }

  {
    const parts = getNumberParts(1);
    expect(parts.sign).toBe(0);
    expect(parts.mantissa).toBe(0);
    expect(parts.biasedExponent).toBe(0);
  }

  {
    const parts = getNumberParts(-1);
    expect(parts.sign).toBe(1);
    expect(parts.mantissa).toBe(0);
    expect(parts.biasedExponent).toBe(0);
  }

  {
    const parts = getNumberParts(1.5);
    expect(parts.sign).toBe(0);
    expect(parts.mantissa).toBe(MAX_MANTISSA / 2);
    expect(parts.biasedExponent).toBe(0);
  }


  {
    const parts = getNumberParts(2);
    expect(parts.sign).toBe(0);
    expect(parts.mantissa).toBe(0);
    expect(parts.biasedExponent).toBe(1);
  }

  {
    const parts = getNumberParts(3);
    expect(parts.sign).toBe(0);
    expect(parts.mantissa).toBe(MAX_MANTISSA / 2);
    expect(parts.biasedExponent).toBe(1);
  }

  {
    const parts = getNumberParts(0.5);
    expect(parts.sign).toBe(0);
    expect(parts.mantissa).toBe(0);
    expect(parts.biasedExponent).toBe(-1);
  }
});
