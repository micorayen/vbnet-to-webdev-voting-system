const positions = [
  "President",
  "VP-Internal",
  "VP-External",
  "Auditor",
  "Treasurer",
  "Secretary",
  "PRO",
  "1st year representative",
  "2nd year representative",
  "3rd year representative",
  "4th year representative",
];

for (const position of positions) {
  console.log("+ ", position);
}
for (let i = 0; i < positions.length; i++) {
  console.log(`Position ${i + 1}: ${positions[i]}`);
}
