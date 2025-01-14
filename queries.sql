-- Database Queries

-- Find all customers with postal code 1010
    SELECT * FROM Customers where PostalCode = 1010;

-- Find the phone number for the supplier with the id 11
    SELECT Phone FROM Suppliers where SupplierID = 11;

-- List first 10 orders placed, sorted descending by the order date
    SELECT * from Orders ORDER BY OrderDate DESC LIMIT 10 ;

-- Find all customers that live in London, Madrid, or Brazil
    SELECT CustomerName, City FROM Customers WHERE City IN ('London' ,'Madrid', 'Brazil');

-- Add a customer record for "The Shire", 
-- the contact name is "Bilbo Baggins" 
-- the address is -"1 Hobbit-Hole" in "Bag End", 
-- postal code "111" 
-- and the country is "Middle Earth"
    INSERT INTO Customers ( ContactName, Address , PostalCode, Country  ) 
        VALUES ( 'Bilbo Baggins', '1 Hobbit-Hole" in "Bag End' , '111', 'Middle Earth' );

    --SELECT * from Customers WHERE ContactName='Bilbo Baggins';
    --SELECT * from Customers;

-- Update Bilbo Baggins record so that the postal code changes to "11122"
    UPDATE Customers 
        SET PostalCode = '11122' WHERE ContactName='Bilbo Baggins';

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
    SELECT DISTINCT City from Customers where City <> 'NULL' ORDER BY City ASC ;

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
    SELECT Suppliers.SupplierName  FROM Suppliers WHERE length(SupplierName) <= 20;

    SELECT * FROM accounts WHERE name='account-02';

    SELECT * FROM accounts;
