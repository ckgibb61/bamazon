const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
});

//function to display all of the products//
function display() {
        console.log("Availble items...\n");
        connection.query("SELECT * FROM products", function (err, result) {
            console.log("Our result", result);
            ask();
        } )
}
display();

//ask what the user is looking for
function ask() {
    inquirer.prompt([

        {
            type: "input",
            name: "item",
            message: "What do you want to buy? (Product ID)"
        },
        {
            type: "input",
            message: "How many would you like to order?",
            name: "quantity"
        },
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        },
    ]).then(function (inquirerResponse) {
      console.log(inquirerResponse);
        connection.query("SELECT * FROM products WHERE id=" + inquirerResponse.item, function (err, result) {
            console.log("Our single result", result);
            if (result[0].stock_quantity > inquirerResponse.quantity) {
                console.log("The item is in stock.  You owe: $" + result[0].price * inquirerResponse.quantity);
                    const newQuantity = result[0].stock_quantity - inquirerResponse.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {id: result[0].id}], function (err, result) {
                        console.log(result);
                        display();
                    });
            } else {
                console.log("Sorry, we only have" + result[0].stock_quantity);
                display();
            }
        })

    })
};

  