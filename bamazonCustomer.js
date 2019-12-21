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
        // displayAll();
        customerStart();
    };
});


const displayAll = () => {
    let query = `SELECT * FROM products`;
    CONNECTION.query(query, (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}\nItem Name: ${res[i].product_name}\nPrice: $${res[i].price}\n`)
        }
    });

    customerStart();
};

const productSearch = () => {
    INQUIRER
        .prompt({
            name: 'requestID',
            type: 'input',
            message: 'Enter product ID of desired item',
            validate: (value) => {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
        // , {
        //     name: 'requestQuantity',
        //     type: 'input',
        //     message: 'How much would you like?',
        //     validate: (value) => {
        //         if (isNaN(value) === false) {
        //             return true;
        //         }
        //         return false;
        //     }
        // }
        )
        .then((answer) => {
            let query = `SELECT * FROM products WHERE ?`;
            CONNECTION.query(query, {item_id: answer.requestID}), (err, res) => {
                console.log(res);
            }
        })
}

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

