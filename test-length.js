const fs = require('fs');
const content = fs.readFileSync('.github/workflows/welcome.yml', 'utf8');
const lines = content.split('\n');
const line = lines[30]; // line 31 in 1-based index
console.log("Line content:", line);
console.log("Length:", line.length);
console.log("Char at 110-130:", line.substring(110, 130));
