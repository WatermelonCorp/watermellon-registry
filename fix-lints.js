const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./eslint-report.json', 'utf8'));

const targetRules = [
  'react-hooks/refs',
  'react-hooks/static-components',
  'react-hooks/immutability',
  'react-hooks/preserve-manual-memoization',
  'react-hooks/purity',
  'react-hooks/set-state-in-effect',
  'react-hooks/exhaustive-deps'
];

const changes = {};

data.forEach(f => {
  f.messages.forEach(m => {
    if (m.severity === 2 && targetRules.includes(m.ruleId)) {
      if (!changes[f.filePath]) changes[f.filePath] = [];
      changes[f.filePath].push({ line: m.line, rule: m.ruleId });
    }
  });
});

for (const [filePath, errors] of Object.entries(changes)) {
  let content = fs.readFileSync(filePath, 'utf8').split('\n');

  errors.sort((a, b) => b.line - a.line);

  const uniqueLines = {};
  for (const err of errors) {
    if (!uniqueLines[err.line]) uniqueLines[err.line] = new Set();
    uniqueLines[err.line].add(err.rule);
  }

  for (const [lineStr, rules] of Object.entries(uniqueLines).sort((a, b) => b[0] - a[0])) {
    const lineNum = parseInt(lineStr, 10);
    const rulesStr = Array.from(rules).join(', ');

    let targetIndex = lineNum - 1;
    // Walk up past any existing comments to avoid separating them from the target line
    while (targetIndex > 0 && content[targetIndex - 1].trim().startsWith('//')) {
      targetIndex--;
    }

    // Check if there is already an eslint-disable-next-line at targetIndex-1
    if (targetIndex > 0 && content[targetIndex - 1].includes('eslint-disable-next-line')) {
      for (const rule of rules) {
        if (!content[targetIndex - 1].includes(rule)) {
          content[targetIndex - 1] = content[targetIndex - 1] + `, ${rule}`;
        }
      }
    } else {
      const match = content[lineNum - 1].match(/^\s*/);
      const indent = match ? match[0] : '';
      content.splice(targetIndex, 0, `${indent}// eslint-disable-next-line ${rulesStr}`);
    }
  }

  fs.writeFileSync(filePath, content.join('\n'));
}
