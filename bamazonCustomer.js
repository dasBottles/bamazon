const MYSQL = require('mysql');
const INQUIRER = require('inquirer');
const TABLE = require('cli-table');

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
        customerStart();
    };
});


const displayAll = () => {
    let query = `SELECT * FROM products`;
    CONNECTION.query(query, (err, res) => {
        if (err) throw err;
        let displayTable = new TABLE({
            head: ['Item ID', 'Product Name', 'Catergory', 'Price', 'Stock'],
            colWidth: [10, 25, 25, 10, 14]
        });
        for (let i = 0; i < res.length; i++) {
            displayTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(`\n${displayTable.toString()}\n\r\n\r\n`);
    });

    customerStart();
};

const productSearch = () => {
    INQUIRER
        .prompt([{
                name: 'requestID',
                type: 'input',
                message: 'Enter product ID of desired item',
                validate: validateInput
            },
            {
                name: 'requestQuantity',
                type: 'input',
                message: 'How much would you like?',
                validate: validateInput
            },
        ])
        .then((answer) => {
            let id = answer.requestID;
            let quantity = answer.requestQuantity;
            purchaseItem(id, quantity);
        })
};

const purchaseItem = (id, quantity) => {
    let query = `SELECT * FROM products WHERE ?`;
    CONNECTION.query(query, {item_id: id}, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log(JSON.stringify(res,null ,2));
    });
}
const validateInput = (value) => {
    let integer = Number.isInteger(parseFloat(value));
    let sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
};

const customerStart = () => {
    INQUIRER
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Search for a specific item',
                'Display all items',
                'Exit'
            ]
        }).then((answer) => {
            switch (answer.action) {
                case 'Search for a specific item':
                    productSearch();
                    break;
                case 'Display all items':
                    displayAll();
                    break;
                case 'Exit':
                    CONNECTION.end();
                    break;
            };
        });
};

const PurchaseMore = () => {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (answer) {
        if (answer.reply) {
            customerStart();
        } else {
            console.log("Have a nice day.");
            CONNECTION.end();
        }
    });
}