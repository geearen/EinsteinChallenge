const fs = require("fs");

const data = fs.readFileSync(__dirname + "/config.txt").toString();
let output = {};

function parseTool(data) {
  const chunk = data
    .toString()
    .split("\n")
    .filter((string) => string[0] != "#");

  const trueValue = new Set(["yes", "on", "true"]);
  const falseValue = new Set(["no", "off", "false"]);
  const dict = {};
  for (let i = 0; i < chunk.length; i++) {
    let eachLine = chunk[i].split("=");
    let key = eachLine[0];
    let dataValue = eachLine[1];

    if (!isNaN(parseFloat(dataValue))) {
      dict[key] = parseFloat(dataValue);
    } else if (trueValue.has(dataValue.toLowerCase())) {
      dict[key] = true;
    } else if (falseValue.has(dataValue.toLowerCase())) {
      dict[key] = false;
    } else {
      dict[key] = dataValue;
    }
  }
  return dict;
}

output = parseTool(data);
console.log(output);
