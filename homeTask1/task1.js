const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  console.log(`You entered: ${input}`);

  console.log(`Reverse version: ${input.split("").reverse().join("")}`);
});
