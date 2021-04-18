const fs = require("fs");

function update(string) {
    let array;
    if (string[4] !== "9") {
        array = Array.from(string)
        array[4] = parseInt(array[4])+1
        return array.join("")
    }
    if (string[2] !== "9") {
        array = Array.from(string)
        array[2] = parseInt(array[2])+1
        array[4] = 0
        return array.join("")
    }
    if (string[0] !== "9") {
        array = Array.from(string)
        array[0] = parseInt(array[0])+1
        array[2] = 0
        array[4] = 0
        return array.join("")
    }
}

const sw = fs.readFileSync("./sw.js").toString()

let lines = sw.split("\n")
let line = lines[0].split("\"")
line[1] = update(line[1])
lines[0] = line.join("\"")
fs.writeFileSync("./sw.js", lines.join("\n"))