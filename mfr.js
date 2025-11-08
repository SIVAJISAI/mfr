// ### **1. Festival Ribbon Count**

// A craft booth cuts ribbons of different colors throughout the day:

// ```
// ["red", "blue", "red", "green", "red", "blue"]
// ```

// They want to know how many **blue** ribbons were cut.

const countRibbons = (count, currentRibbon) => {
  if (currentRibbon === "blue" || currentRibbon === "BLUE") {
    return count + 1;
  }
  return count;
}

const reduce = (data, method) => {
  return data.reduce(method, 0);
}

const areArraysEqual = function (array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let index = 0; index < array1.length; index++) {
    if (!areDeepEqual(array1[index], array2[index])) {
      return false;
    }
  }

  return true;
}

const areDeepEqual = function (array1, array2) {
  if (typeof array1 !== typeof array2) {
    return false;
  }

  if (Array.isArray(array1) && Array.isArray(array2)) {
    return areArraysEqual(array1, array2);
  }

  return array1 === array2;
}

const formatText = function (description, numbers, actualResult, expectedOutput) {
  const isPass = areDeepEqual(actualResult, expectedOutput);
  const status = isPass ? "✅" : "❌";
  const message = "  " + description;
  const inputFragment = !isPass ? "\n\n\tinput  :  | " + numbers : "";
  const expectFragment = !isPass ? "\n\texpect :  | " + expectedOutput : "";
  const actualFragment = !isPass ? "\n\tactual :  | " + actualResult + "\n\t" : "";
  return status + message + inputFragment + expectFragment + actualFragment;
}

const testResults = function (type, method, description, data, expectedOutput) {
  const actualResult = type(data, method);
  console.log(formatText(description, data, actualResult, expectedOutput));
}

const testRibbons = function () {
  testResults(reduce, countRibbons, "blue ribbons count is 3", ["red", "blue", "blue", "green", "blue", "blue"], 4)
  testResults(reduce, countRibbons, "there are no blue ribbons", ["green", "yellow", "red"], 0);
  testResults(reduce, countRibbons, "ribbon is in UPPERCASE", ["BLUE", "blue", "blue", "blue"], 4);
  testResults(reduce, countRibbons, "empty list", [], 0);
}
const testAll = function () {
  testRibbons();
}
testAll();