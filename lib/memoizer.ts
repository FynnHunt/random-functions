type MemoizableFunction = (arg: string) => string;

// this memoizer only supports functions with the MemoizableFunction type signature above
// this could be extended to read multiple args by spreading the args in the function below and iterating over them
// checking the cache
const memoize = (fn: MemoizableFunction) => {
  let cache = {};
  return (arg: string) => {
    if (arg in cache) {
      console.log("Fetching from cache");
      return cache[arg];
    } else {
      console.log("Calculating result");
      let result = fn(arg);
      cache[arg] = result;
      return result;
    }
  };
};

const testFn: MemoizableFunction = (name: string) => `My name is ${name}`;
const memoizedTestFn: MemoizableFunction = memoize(testFn);

// the functions below are new
console.log(memoizedTestFn("What?"));
console.log(memoizedTestFn("Who?"));
console.log(memoizedTestFn("Chika Chika"));
console.log(memoizedTestFn("Slim Shady"));
// the functions below should be retrieved from cache
console.log(memoizedTestFn("What?"));
console.log(memoizedTestFn("Who?"));
console.log(memoizedTestFn("Chika Chika"));
console.log(memoizedTestFn("Slim Shady"));
