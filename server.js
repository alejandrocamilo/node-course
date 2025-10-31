const http = require('http');
const fs = require('fs');
const  url = require('url');

const html = fs.readFileSync("./Template/index.html", "utf8");
const products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf8')) ;
const productsListTemplate = fs.readFileSync('./Template/products-list.html', 'utf8');
const productsDetailsTemplate = fs.readFileSync('./Template/product-details.html', 'utf8');

const replaceHtml = (template, product) => {

    let output = template.replace('{{%IMAGE%}}', product.productImage);

    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modelName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESCRIPTION%}}', product.Description);

    return output;
}

const server = http.createServer((request, response) => {
    console.log("A new request has been started!");

    let {query, pathname: path} = url.parse(request.url, true);

    //console.log(path);
    // let path = request.url;

    if(path === '/' || path.toLocaleLowerCase() === '/home') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'custom-header': 'Hello, World!'
        });
        response.end(html.replace('{{CONTENT}}', 'You are in Home Page'));
    }
    else if(path.toLocaleLowerCase() === '/about') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'custom-header': 'Hello, World!'
        });

        response.end(html.replace('{{CONTENT}}', 'You are in About Page'));
    }
    else if(path.toLocaleLowerCase() === '/contact') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'custom-header': 'Hello, World!'
        });

        response.end(html.replace('{{CONTENT}}', 'You are in Contact Page'));
    }
    else if(path.toLocaleLowerCase() === '/products') {

        if(!query.id){

           const productsListArray = products.map(product => {
               return replaceHtml(productsListTemplate, product)
            })
            response.writeHead(200, {
                'Content-Type': 'text/html',
            });

            response.end(html.replace('{{%CONTENT%}}', productsListArray.join(",")));
        }
        else{
            const productDetails = products[query.id]

            const productDetailsResponse = replaceHtml(productsDetailsTemplate, productDetails)

            response.end(html.replace('{{%CONTENT%}}', productDetailsResponse));
        }



    }
    else {
        response.writeHead(404, {
            'Content-Type': 'text/html',
            'custom-header': 'Hello, World!'
        });
        response.end(html.replace('{{CONTENT}}', 'ERROR 404 page not found'));
    }

})


server.listen(8000, '127.0.0.1', ()=>{
    console.log("Server listening on port 8000!");
});































