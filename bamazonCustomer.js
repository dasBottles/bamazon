const MYSQL = require('mysql');
const INQUIRER = require('inquirer');

const CONNECTION = MYSQL.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});


CONNECTION.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('You are now connected!');
        displayAll();
    };
});


const displayAll = () => {
    let query = `SELECT * FROM products`;
    CONNECTION.query(query, (err,res) =>{
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}\nItem Name: ${res[i].product_name}\nPrice: $${res[i].price}\n`)            
        }
    })
};