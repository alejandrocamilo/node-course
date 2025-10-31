
//Here I am learning how synchronous code really works under the hood

const fs = require('fs');

const inputIn = fs.readFileSync('./Files/input.txt', 'utf8');
console.log(inputIn);

const content = `I will become a successful backend developer\n\nFile text read from input.txt: ${inputIn}
                        \nDate created: ${new Date()}`;

fs.writeFileSync('./Files/output.txt', content);

const output = fs.readFileSync('./Files/output.txt', 'utf8');
console.log(output);