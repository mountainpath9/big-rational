An arbitrary precision rational number library

# Features

* implemented in typescript
* uses the native `bigint` type
* no dependencies

# API

## BigRational Class

The `BigRational` class represents arbitrary precision rational numbers (fractions) using native `bigint` values for both numerator and denominator. All BigRational instances are normalized (reduced to lowest terms) upon construction.

### Properties

```typescript
numerator: bigint;    // The numerator of the fraction
denominator: bigint;  // The denominator of the fraction (always positive)
```

### Static Factory Methods

#### `BigRational.from(numerator: bigint, denominator: bigint): BigRational`
Creates a new BigRational for the given ratio.

#### `BigRational.parseDecimalString(s: string): BigRational | null`
Returns a BigRational from parsing a decimal string, or null if string is invalid.

#### `BigRational.fromDecimalString(s: string): BigRational`
Returns a BigRational from parsing a decimal string. Throws an Error if the string is invalid.

#### `BigRational.fromNumber(v: number): BigRational`
Constructs a BigRational from a floating point number, keeping available precision.

#### `BigRational.fromRoundedNumber(v: number, decimalPrecision: number): BigRational`
Constructs a BigRational from a floating point number, using the specified decimal places.

#### `BigRational.fromBigIntWithDecimals(value: bigint, decimals: bigint): BigRational`
Constructs a BigRational from a bigint scaled by the given number of decimals.

#### `BigRational.fromScaledBigInt(value: bigint, scale: bigint): BigRational`
Constructs a BigRational from a bigint scaled by the given factor.

### Arithmetic Operations

#### `add(other: BigRational): BigRational`
Returns a new BigRational that is the sum of this and other.

#### `sub(other: BigRational): BigRational`
Returns a new BigRational that is the difference between this and other.

#### `mul(other: BigRational): BigRational`
Returns a new BigRational that is the product of this and other.

#### `div(other: BigRational): BigRational`
Returns a new BigRational that is the quotient of this and other.

#### `pow(exponent: bigint): BigRational`
Raise this value to the given integer power.

#### `round(newDenominator: bigint, mode: RoundMode): BigRational`
Round this value such that it ends up with the specified denominator. For example, if newDenominator is 1, then will round to the nearest int. If newDenominator is 100 then will round to 2 decimal places.

### Utility Methods

#### `sign(): bigint`
Returns -1n if this is negative, 1n otherwise.

#### `abs(): BigRational`
Returns a new BigRational that is the absolute value of this.

#### `neg(): BigRational`
Returns a new BigRational that is this value negated.

### Comparison Methods

#### `eq(other: BigRational): boolean`
Returns true if this is equal to other.

#### `neq(other: BigRational): boolean`
Returns true if this is not equal to other.

#### `lt(other: BigRational): boolean`
Returns true if this is less than other.

#### `lte(other: BigRational): boolean`
Returns true if this is less than or equal to other.

#### `gt(other: BigRational): boolean`
Returns true if this is greater than other.

#### `gte(other: BigRational): boolean`
Returns true if this is greater than or equal to other.

#### `cmp(other: BigRational): number`
Returns:
- -1 if this is less than other
- 1 if this is greater than other
- 0 if this is equal to other

### Conversion Methods

#### `toString(): string`
Returns a string representing the exact value of this (in the format "numerator/denominator").

#### `toNumber(): number`
Returns the closest number to this value.

#### `toDecimalString(decimals: number): string`
Returns a string that is a decimal approximation to this, correct to the specified number of decimal places.

#### `toBigIntWithDecimals(decimals: bigint): bigint`
Returns a bigint that approximates this BigRational scaled by the given number of decimal places. Rounds down.

#### `toScaledBigInt(scale: bigint): bigint`
Returns a bigint that approximates this BigRational scaled by the given factor. Rounds down.

### Static Constants

```typescript
static ZERO = BigRational.from(0n, 1n);
static ONE = BigRational.from(1n, 1n);
static TWO = BigRational.from(2n, 1n);
static ONE_HALF = BigRational.from(1n, 2n);
static TEN = BigRational.from(10n, 1n);
static ONE_HUNDRED = BigRational.from(100n, 1n);
static ONE_THOUSAND = BigRational.from(1000n, 1n);
static TEN_THOUSAND = BigRational.from(10000n, 1n);
static ONE_E18 = BigRational.from(1_000_000_000_000_000_000n, 1n);
```

### RoundMode Enum

```typescript
enum RoundMode {
  DOWN,  // Round towards zero
  UP     // Round away from zero
}
```

### Usage Examples

```typescript
import { BigRational } from '@mountainpath9/big-rational';

// Create rational numbers
const half = BigRational.from(1n, 2n);
const third = BigRational.from(1n, 3n);

// Arithmetic operations
const sum = half.add(third);
const product = half.mul(third);

// From decimal strings
const decimal = BigRational.fromDecimalString("0.125");

// Convert to decimal string
console.log(third.toDecimalString(6));

// Comparisons
console.log(half.gt(third));
console.log(sum.eq(BigRational.from(5n, 6n)));
```


# Development

## build and test

```
yarn
yarn build
yarn test
```

## publish

```
yarn build
(cd dist; npm publish --access=public)
```
