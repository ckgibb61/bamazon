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
        if (result.stock_quantity < 170) {
            console.log("This inventory is low", result);
            // const newQuantity = result[0].stock_quantity - inquirerResponse.quantity;
            // connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { id: result[0].id }], function (err, result) {
            //     console.log(result);
            //     display();
            // });
            const lowInventory = result;
        } else {
            console.log("Inventory looks good", result);
        }
    })
}
display();


// connection.query("SELECT * FROM products WHERE ? < ?", ['stock_QUANITY', '170'], function (err, result) {
//     console.log("Our result", result);
//     if (result.stock_quantity < 170) {
//         console.log("This inventory is low", result);
//         // const newQuantity = result[0].stock_quantity - inquirerResponse.quantity;
//         // connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { id: result[0].id }], function (err, result) {
//         //     console.log(result);
//         //     display();
//         // });
//         const lowInventory = result;
//     } else {
//         console.log("Inventory looks good", result);
//     }
// })
// }


// function low() {
//     if (result[0].stock_quantity < 170) {
//             console.log("This inventory is low", result[0]);
//             // const newQuantity = result[0].stock_quantity - inquirerResponse.quantity;
//             // connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { id: result[0].id }], function (err, result) {
//             //     console.log(result);
//             //     display();
//             // });
//             const lowInventory = result[0].
//         } else {
//             console.log("Inventory looks good", result[0]);
//         }
// }
//add to stock//
// function add() {
//     inquirer.prompt([

//         {
//             type: "input",
//             name: "item",
//             message: "Name the item"
//         },
//         {
//             type: "input",
//             message: "How many would you like to order?",
//             name: "quantity"
//         },
//         {
//             type: "confirm",
//             message: "Are you sure:",
//             name: "confirm",
//             default: true
//         },
//     ]).then(function (inquirerResponse) {}
//         // console.log("Inserting a new item...\n");
//         // var query = connection.query(
//         //     "INSERT INTO products SET ?", {
//         //         item: "Hail Mary",
//         //         condition: "2Pac",
//         //         highestBid: 3
//         //     },
//         //     function (err, res) {
//         //         if (err) throw err;
//         //         console.log(res.affectedRows + " name inserted!\n");
//         //     });
// } 