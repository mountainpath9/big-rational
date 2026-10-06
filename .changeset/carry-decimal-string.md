---
"@mountainpath9/big-rational": patch
---

`toDecimalString` carries a rounded-up fraction into the integer part: 9.998 at 2 dp is now "10.00", not "9.100".
