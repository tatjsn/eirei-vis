import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('./src/data.json', 'utf8'));

const keys = ['rarity', 'classe', 'type', 'range', 'card', 'element', 'alignmentLC', 'alignmentGE', 'gender'];

const listOfObjects = keys.map(key => {
  const result = [];
  for (const item of data) {
    result.push(item[key]);
  }
  return { [key]: [...new Set(result)] };
});

process.stdout.write(JSON.stringify(Object.assign({}, ...listOfObjects)));
