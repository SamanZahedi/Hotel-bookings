**Create Table Customers
Basically, this script will create Customers table on sql.
```sql
Create Table customers (
	id 	 	Serial 		Primary Key,
	name     	Varchar(30) 	Not Null,
  	email    	Varchar(120) 	Not Null,
  	address  	Varchar(120),
  	city     	Varchar(30),
  	postcode 	Varchar(12),
  	country  	Varchar(20)
);
```

