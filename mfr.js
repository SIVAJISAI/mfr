const heading = (text) => console.log("-".repeat(20) + text + "-".repeat(20));

const shorten = (data, method, initialValue) => data.reduce(method, initialValue);

const isBlueRibbon = (count, currentRibbon) => currentRibbon.toLowerCase() === "blue" ? count + 1 : count;

const blueRibbons = (data) => shorten(data, isBlueRibbon, 0);

const filter = (data, method) => data.filter(method);

const uniqueConstellations = (data) => filter(data.flat(), isUnique);

const isUnique = (element, index, array) => array.indexOf(element) === index;

// const uniqueBirds = (data) => filter(data, isUnique);

const uniqueBirds = (data) => {
  return data.reduce((accumalator, bird) => {
    if (!accumalator.includes(bird)) {
      accumalator.push(bird);
    }
    return accumalator;
  }, []);
};


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

const testResults = function (type, description, data, expectedOutput) {
  const actualResult = type(data);
  console.log(formatText(description, data, actualResult, expectedOutput));
}
const testAttenddance = () => {
  heading("BLUE RIBBONS");
  testResults(attendance, "at least once", [["Asha", "Ravi", "Neel"],["Ravi"],["Asha", "Meera"]], ["Asha","Ravi","Neel","Meera"])
}
const testRibbons = () => {
  heading("BLUE RIBBONS");
  testResults(blueRibbons, "blue ribbons count is 3", ["red", "blue", "blue", "green", "blue", "blue"], 4)
  testResults(blueRibbons, "there are no blue ribbons", ["green", "yellow", "red"], 0);
  testResults(blueRibbons, "ribbon is in UPPERCASE", ["BLUE", "blue", "blue", "blue"], 4);
  testResults(blueRibbons, "empty list", [], 0);
}

const testUniqueConstellations = () => {
  heading("UNIQUE CONSTELLATIONS");
  testResults(uniqueConstellations, "unique constellations", [["orion", "tautarus"], ["orion", "leo", "gemini"]], ["orion", "tautarus", "leo", "gemini"]);
  testResults(uniqueConstellations, "same constellation on sasme night", [["orion", "tautarus", "orion"], ["orion", "leo", "gemini"]], ["orion", "tautarus", "leo", "gemini"]);

}
const testUniqueBirds = () => {
  heading("UNIQUE BIRDS");
  testResults(uniqueBirds, "unique birds", ["sparrow", "crow", "sparrow", "eagle", "crow"], ["sparrow", "crow", "eagle"]);
  testResults(uniqueBirds, "empty list", [], []);
}

const testAll = function () {
  testRibbons();
  testUniqueConstellations();
  testUniqueBirds();

}
testAll();