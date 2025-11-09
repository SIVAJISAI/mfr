const heading = text => console.log("-".repeat(20) + text + "-".repeat(20));

const blueRibbons = ribbons => ribbons.reduce((count, currentRibbon) =>
  currentRibbon.toLowerCase() === "blue" ? count + 1 : count, 0);

const uniqueConstellations = constellations => constellations.flat().reduce(isUnique, []);

const uniqueBirds = allBirds => allBirds.reduce(isUnique, []);

const isUnique = (uniqueItems, item) => {
  if (!uniqueItems.includes(item)) {
    uniqueItems.push(item);
  }
  return uniqueItems;
}

const attendance = students => students.flat().reduce(isUnique, []);

const candiescount = candies => candies.flat().reduce((count, candy) => candy + count, 0);

const areArraysEqual = (array1, array2) => {
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

const areDeepEqual = (array1, array2) => {
  if (typeof array1 !== typeof array2) {
    return false;
  }

  if (Array.isArray(array1) && Array.isArray(array2)) {
    return areArraysEqual(array1, array2);
  }

  return array1 === array2;
}

const formatText = (description, input, actualResult, expectedOutput) => {
  const isPass = areDeepEqual(actualResult, expectedOutput);
  const status = isPass ? "✅" : "❌";
  const message = "  " + description;
  const inputFragment = !isPass ? "\n\n\tinput  :  | " + input : "";
  const expectFragment = !isPass ? "\n\texpect :  | " + expectedOutput : "";
  const actualFragment = !isPass ? "\n\tactual :  | " + actualResult + "\n\t" : "";
  return status + message + inputFragment + expectFragment + actualFragment;
}

const testResults = (type, description, data, expectedOutput) => {
  const actualResult = type(data);
  console.log(formatText(description, data, actualResult, expectedOutput));
}

const testCandiesCount = () => {
  heading("CANDIES COUNT");
  testResults(candiescount, "total cnadies is 15", [[5, 3], [2], [4, 1]], 15);
  testResults(candiescount, "one day candies are not refilled", [[5, 3], [], [4, 9]], 21);
  testResults(candiescount, "no candies are refilled", [[], [], [], []], 0);

}
const testAttenddanceAtLeastOnce = () => {
  heading("ATTENDANCE");
  testResults(attendance, "some students attended multiple times", [["Ravi", "Asha"], ["Asha", "Ravi"], ["Meera"]],
    ["Ravi", "Asha", "Meera"]);
  testResults(attendance, "no students at all in class", [], []);
  testResults(attendance, "nested empty arrays", [[], []], []);
  testResults(attendance, "names in upper and lower cases", [["Ravi", "ravi"], ["RAVI"]],
    ["Ravi", "ravi", "RAVI"]);
  testResults(attendance, "students with extra spaces", [["Ravi ", "Asha"], [" Ravi", "Asha"]],
    ["Ravi ", "Asha", " Ravi"]);
}

const testRibbons = () => {
  heading("BLUE RIBBONS");
  testResults(blueRibbons, "blue ribbons count is 4", ["red", "blue", "blue", "green", "blue", "blue"], 4);
  testResults(blueRibbons, "there are no blue ribbons", ["green", "yellow", "red"], 0);
  testResults(blueRibbons, "ribbon is in UPPERCASE", ["BLUE", "blue", "blue", "blue"], 4);
  testResults(blueRibbons, "no openings are done", [], 0);
}

const testUniqueConstellations = () => {
  heading("UNIQUE CONSTELLATIONS");
  testResults(uniqueConstellations, "repeated constellations", [["orion", "orion", "taurus"], ["taurus", "orion"]],
    ["orion", "taurus"]);
  testResults(uniqueConstellations, "empty inner arrays", [[], [], []], []);
  testResults(uniqueConstellations, "single night observation",
    [["gemini", "leo", "leo"]], ["gemini", "leo"]);
  testResults(uniqueConstellations, "constellation in upper and lower cases",
    [["Orion"], ["orion"]], ["Orion", "orion"]);
  testResults(uniqueConstellations, "too many constellations",
    [["orion", "leo"], ["gemini", "leo"], ["orion", "virgo"]], ["orion", "leo", "gemini", "virgo"]);
  testResults(uniqueConstellations, "unique constellations", [["orion", "tautarus"], ["orion", "leo", "gemini"]],
    ["orion", "tautarus", "leo", "gemini"]);
}

const testUniqueBirds = () => {
  heading("UNIQUE BIRDS");
  testResults(uniqueBirds, "repeated birds with mixed case", ["Crow", "crow", "CROW", "eagle"],
    ["Crow", "crow", "CROW", "eagle"]);
  testResults(uniqueBirds, "all unique birds", ["peacock", "pigeon", "eagle"],
    ["peacock", "pigeon", "eagle"]);
  testResults(uniqueBirds, "empty list of birds", [], []);
  testResults(uniqueBirds, "bird names with spaces", [" sparrow", "sparrow", "sparrow "],
    [" sparrow", "sparrow", "sparrow "]);
}

const testAll = function () {
  testRibbons();
  testUniqueConstellations();
  testUniqueBirds();
  testAttenddanceAtLeastOnce();
  testCandiesCount();
}
testAll();