export class BigRational {
  numerator: bigint;
  denominator: bigint;

  private constructor(numerator: bigint, denominator: bigint) {
    if (denominator == 0n) {
      throw new RangeError("BigRational division by zero");
    }
    const sign = signbi(numerator) * signbi(denominator);
    numerator = absbi(numerator);
    denominator = absbi(denominator);
    const gcd = euclideanGcd(numerator, denominator);
    this.numerator = sign * numerator / gcd;
    this.denominator = denominator / gcd;
  }

  add(other: BigRational): BigRational {
    return new BigRational(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator,
    );
  }

  sub(other: BigRational): BigRational {
    return new BigRational(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator,
    );
  }

  mul(other: BigRational): BigRational {
    return new BigRational(
      this.numerator * other.numerator,
      this.denominator * other.denominator,
    );
  }

  div(other: BigRational): BigRational {
    return new BigRational(
      this.numerator * other.denominator,
      this.denominator * other.numerator,
    );
  }

  // Round this value such that it ends up with the specified denominator.
  // eg if newDenominator is 1, then will round to the nearest it. If newDeominator is 100
  // then will round to 2 decimal places.
  round(newDenominator: bigint, mode: RoundMode): BigRational {
    const s = this.sign();
    const v = this.abs();
    let newNumerator: bigint;
    switch (mode) {
      case RoundMode.DOWN:
        if (s > 0n) {
          newNumerator = v.numerator * newDenominator / v.denominator;
        } else {
          newNumerator = - ((v.numerator * newDenominator - 1n) / v.denominator + 1n);
        }
        break;
      case RoundMode.UP:
        if (s > 0n) {
          newNumerator = (v.numerator * newDenominator - 1n) / v.denominator + 1n;
        } else {
          newNumerator = -v.numerator * newDenominator / v.denominator;
        }
        break;
    }
    return new BigRational(newNumerator, newDenominator);

  }

  sign(): bigint {
    return this.numerator > 0n ? 1n : -1n;
  }

  abs(): BigRational {
    return BigRational.from(absbi(this.numerator), this.denominator);
  }

  neg(): BigRational {
    return BigRational.from(-this.numerator, this.denominator);
  }

  eq(other: BigRational): boolean {
    return this.numerator === other.numerator && this.denominator === other.denominator;
  }

  neq(other: BigRational): boolean {
    return !this.eq(other);
  }

  lt(other: BigRational): boolean {
    return this.numerator * other.denominator < other.numerator * this.denominator;
  }

  lte(other: BigRational): boolean {
    return this.numerator * other.denominator <= other.numerator * this.denominator;
  }

  gt(other: BigRational): boolean {
    return !this.lte(other);
  }

  gte(other: BigRational): boolean {
    return !this.lt(other);
  }

  toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  toDecimalString(decimals: number): string {
    const neg = this.numerator < 0;
    const scale = 10n ** BigInt(decimals);
    const numerator = absbi(this.numerator);
    const q = numerator / this.denominator;
    const r = numerator % this.denominator;
    let rs = r * scale / this.denominator;
    if ((r * scale * 10n / this.denominator) % 10n >= 5n) {
      rs += 1n;
    }
    const rss = rs.toString();
    const zpad = decimals - rss.length;

    let s = "";
    s += neg ? "-" : "";
    s += q.toString();
    s += ".";
    s += zpad > 0 ? '0'.repeat(zpad) : '';
    s += rss;

    return s;
  }

  static fromDecimalString(s: string): BigRational | null {
    {
      const m = s.match(DECIMAL_RE);
      if (m) {
        if (!m[2] && !m[3]) {
          return null;
        }
        const s = m[1] == '-' ? -1n : 1n;
        const intval = m[2] ? BigInt(m[2]) : 0n;
        const fracval = m[3] ? BigInt(m[3]) : 0n;
        const denom = m[3] ? 10n ** BigInt(m[3].length) : 1n;
        return new BigRational(s * (intval * denom + fracval), denom);
      }
    }
    return null;
  }

  static from(numerator: bigint, denominator: bigint): BigRational {
    return new BigRational(numerator, denominator);
  }

  // Construct a rational from a number, with specified decimals
  static fromNumber(v: number, decimals: number): BigRational {
    return BigRational.from(BigInt(Math.floor(v * 10 ** decimals)), 10n ** BigInt(decimals));
  }

  static fromBigIntWithDecimals(value: bigint, decimals: bigint): BigRational {
    const scale = 10n ** decimals;
    return new BigRational(value, scale);
  }

  // This rounds down
  toBigIntWithDecimals(decimals: bigint): bigint {
    const scale = 10n ** decimals;
    return this.numerator * scale / this.denominator;
  }

  static fromScaledBigInt(value: bigint, scale: bigint): BigRational {
    return new BigRational(value, scale);
  }

  // This rounds down
  toScaledBigInt(scale: bigint): bigint {
    return this.numerator * scale / this.denominator;
  }

  static ZERO = new BigRational(0n, 1n);
  static ONE = new BigRational(1n, 1n);
  static TWO = new BigRational(2n, 1n);
  static ONE_HALF = new BigRational(1n, 2n);

  static TEN = new BigRational(10n, 1n);
  static ONE_HUNDRED = new BigRational(100n, 1n);
  static ONE_THOUSAND = new BigRational(1000n, 1n);
  static TEN_THOUSAND = new BigRational(10000n, 1n);

  static ONE_E18 = new BigRational(1_000_000_000_000_000_000n, 1n);
}

const DECIMAL_RE = RegExp("^(-?)([0-9]*)[.]?([0-9]*)$");

function euclideanGcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function signbi(a: bigint) {
  return a < 0n ? -1n : 1n;
}

function absbi(a: bigint) {
  return a < 0n ? -a : a;
}

export enum RoundMode {
  DOWN,
  UP,
}
