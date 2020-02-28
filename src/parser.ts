

function boundValue<T>(input: number, arr: T[]): T {
  return input < arr.length ? arr[input] : boundValue(input - arr.length, arr);
}

function boundIndex<T>(input: number, arr: T[]): number {
  return input < arr.length ? input : boundIndex(input - arr.length, arr)
}

function fromCharCode(arr: number[]) {
  return arr.map(v => String.fromCharCode(v))
}

function range(start: number, end: number) {
  return Array.from({ length: end - start }, (v, i) => i + start)
}

function splitHalf<T>(arr: T[]) {
  const middle = Math.round(arr.length / 2)
  const fst = arr.slice(0, middle)
  const snd = arr.slice(middle)
  return [fst, snd]
}


function sum(arr: number[]): number {
  if(arr.length === 0) return 0
  if(arr.length === 1) return arr[0]
  const [fst, snd] = splitHalf(arr)
  return sum(fst) + sum(snd)
}



function scramble<T>(key: number, arr: T[], resultArr: T[] = [], startIndex = 0): T[]{
  if(arr.length === 0) return resultArr
  const index = boundIndex(key + startIndex, arr)
  return scramble(key, remove(index, 1, arr), [...resultArr, arr[index]], index)
}


function remove<T>(start: number, count: number, arr: T[]) {
  const first = arr.slice(0, start)
  const second = arr.slice(start + count)
  return [...first, ...second]
}



function repeat<T>(n: number, fn: (acc: T) => T, acc?: T): T | undefined {
  if(n === 0) return acc
  return repeat(n -1, fn, fn(acc!))
}

function recursiveScramble<T>(key: number, layer: number, arr: T[]): T[] {
  if(layer === 0) return arr
  return repeat(layer, (acc) => scramble(key, acc), arr)!
}




function createKey(key: string) {
  return sum(key.split("").map(x => x.charCodeAt(0)))
}

function isSubSetOf<T>(s1: T[], s2: T[]) {
  return s1.every(x => s2.includes(x))
}

const upperCaseLetters = fromCharCode(range(65, 91))
const lowerCaseLetters = fromCharCode(range(97, 123))
const numbers = fromCharCode(range(48, 58))
const symbols = fromCharCode([...range(33, 48), ...range(58, 65), ...range(91, 97), ...range(123, 127)])





export interface Profile {
  upperCaseLetters: boolean,
  lowerCaseLetters: boolean,
  numbers: boolean,
  symbols: boolean,
  recursionLayer: number,
  length: number
}

const allCombinations = numbers.concat(upperCaseLetters, lowerCaseLetters, symbols)




// user@website.com
/**
 * 
 * @param user `user@website.com`
 * @param passw 
 * @param options 
 */
export function createPassword(user: string, passw: string, options: Profile): string {
  const length = options.length;
  const layer = options.recursionLayer;

  const _lowerCaseLetters = options.lowerCaseLetters ? lowerCaseLetters : [];
  const _upperCaseLetters = options.upperCaseLetters ? upperCaseLetters : [];
  const _numbers = options.numbers ? numbers : [];
  const _symbols = options.symbols ? symbols : [];

  
  const combinations = _lowerCaseLetters.concat(
    _upperCaseLetters,
    _numbers,
    _symbols
    );
    
  const key = createKey(user + passw);
  const combinationSet = scramble(
    key + length,
    [_lowerCaseLetters, _upperCaseLetters, _numbers, _symbols].filter(
      v => v.length !== 0
    )
  );


  //ensures the password has some characters of all selected combinations
  const result = Array.from(
    { length },
    (v, i) =>
      recursiveScramble(key + length * layer + i, layer, combinations)
      .find((v) => boundValue(i, combinationSet).includes(v))
  ).join("");


  return result
}

export const profile = {
  upperCaseLetters: true,
  lowerCaseLetters: true,
  numbers: true,
  symbols: true,
  recursionLayer: 9, //max 940
  length: 24,
  websites: []
}




