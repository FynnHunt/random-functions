type PositiveInteger<T extends number> = number extends T
  ? never
  : `${T}` extends `-${string}`
  ? never
  : T;

interface RomanToIntLookup {
  M: number;
  CM: number;
  D: number;
  CD: number;
  C: number;
  XC: number;
  L: number;
  XL: number;
  X: number;
  IX: number;
  V: number;
  IV: number;
  I: number;
}

// ordered in reverse so the loop can traverse through the numerals to find the next largest numeral
const reverseOrderedromanToIntLookup: RomanToIntLookup = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const recursiveRomanator = <N extends number>(
  number: PositiveInteger<N>,
  romanAcc: string = ""
): string => {
  let localNum = number;
  if (number > 0) {
    for (const numeral in reverseOrderedromanToIntLookup) {
      if (localNum >= reverseOrderedromanToIntLookup[numeral]) {
        romanAcc += numeral;
        localNum = (localNum -
          reverseOrderedromanToIntLookup[numeral]) as PositiveInteger<N>;
        break;
      }
    }
    return recursiveRomanator(localNum, romanAcc);
  }

  return romanAcc;
};

/**
 * Note: PositiveInteger has been typed in a way that will not allow you to call recursiveRomanator with a negative number, a compiler error will be triggered.
 * This protects the function at compile time from being called incorrectly, avoiding run time errors.
 **/

console.log("** Converting selection of integers to roman numerals **");
console.log(recursiveRomanator(1));
console.log(recursiveRomanator(3));
console.log(recursiveRomanator(4));
console.log(recursiveRomanator(5));
console.log(recursiveRomanator(7));
console.log(recursiveRomanator(9));
console.log(recursiveRomanator(10));
console.log(recursiveRomanator(36));
console.log(recursiveRomanator(435));
console.log(recursiveRomanator(1043));
console.log("** Conversion complete **");
