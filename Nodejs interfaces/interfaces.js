// This code creates an interface to let users drop inputs and then inputs are read and outputted

const readLine = require("readline");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("What is your name: ", (input) => {
    console.log("\n"+input);
    rl.close()
})

rl.on("close", ()=>{
     console.log("\nInterface closed!");
     process.exit(0);
})