import fs from "fs"


const buffer = fs.readFileSync("./a.docx")

const base = buffer.toString("base64")

console.log(base)