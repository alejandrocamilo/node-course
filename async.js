//Here I am learning how Asynchronous code really works under the hood
// Callback hell demonstration

const fs = require('fs');

fs.readFile('./Files/starter.txt', 'utf8', (error1, data1) => {
    console.log(data1);
    fs.readFile(`./Files/${data1}.txt`, 'utf8', (error2, data2) => {
        console.log(data2);
        fs.readFile(`./Files/append.txt`, "utf8", (error3, data3) => {
            console.log(data3);
            fs.writeFile(`./Files/output.txt`, `${data2}\n\n${data3}\n\nDate created: ${new Date()}`, (e) => {
                console.log("File written successfully");
            });
        });
    })
})

console.log("Reading File...");