DROP database IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE  bamazon_db;

create table products (
item_id INT NOT NULL auto_increment,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INT default 0,
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Soap', 'Household Items', 2.5, 10),
('Salt', 'Household Items', 2.5, 10),
('Sugar', 'Household Items', 2.5, 10),
('Paper towels', 'Household Items', 2.5, 10),
('Apples', 'Household Items', 2.5, 10),
('Knives', 'Household Items', 2.5, 10),
('Forks', 'Household Items', 2.5, 10),
('Spoons', 'Household Items', 2.5, 10),
('Plates', 'Household Items', 2.5, 10),
('Coffee beans', 'Household Items', 2.5, 10)
;
select * from products WHERE item_id = 1;