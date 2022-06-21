const express = require("express");
const app = express();
const { Pool } = require("pg");

app.use(express.json());

const pool = new Pool({
  user: "cyf24",
  host: "database-1.c7jkbbjyxtpj.us-east-1.rds.amazonaws.com",
  database: "cyf24",
  password: "uSLCnmUH",
  port: 5432,
});

// hotels
app.get("/hotels", function (req, res) {
  pool
    .query("SELECT * FROM hotels")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/hotels", function (req, res) {
  const newHotelName = req.body.name;
  const newHotelRooms = req.body.rooms;
  const newHotelPostcode = req.body.postcode;

  if (!Number.isInteger(newHotelRooms) || newHotelRooms <= 0) {
    return res
      .status(400)
      .send("The number of rooms should be a positive integer.");
  }

  if (!newHotelName.length > 0) {
    return res.status(400).send("The name of hotel should be a string.");
  }

  const query =
    "INSERT INTO hotels (name, rooms, postcode) VALUES ($1, $2, $3)";

  pool
    .query(query, [newHotelName, newHotelRooms, newHotelPostcode])
    .then(() => res.send("Hotel created!"))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/hotels/:hotelId", function (req, res) {
  const hotelId = req.params.hotelId;

  pool
    .query("SELECT * FROM hotels WHERE id=$1", [hotelId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/search", function (req, res) {
  const hotelNameQuery = req.query.name;
  let query = `SELECT * FROM hotels ORDER BY name`;
  let params = [];
  if (hotelNameQuery) {
    query = `SELECT * FROM hotels WHERE name LIKE $1 ORDER BY name`;
    params.push(`%${hotelNameQuery}%`);
  }

  pool
    .query(query, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.put("/hotel/:hotelId", function (req, res) {
  const hotelId = req.params.hotelId;
  const newName = req.body.name;

  if (!newName.length > 0) {
    return res.status(400).send("The name of hotel should be a string.");
  }

  pool
    .query("UPDATE hotels SET name=$1 WHERE id=$2", [newName, hotelId])
    .then(() => res.send(`Hotel ${hotelId} updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.delete("/hotel/:hotelId", function (req, res) {
  const hotelId = req.params.hotelId;

  pool
    .query("DELETE FROM bookings WHERE hotel_id=$1", [hotelId])
    .then(() => pool.query("DELETE FROM hotels WHERE id=$1", [hotelId]))
    .then(() => res.send(`Hotel ${hotelId} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// customers

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers ORDER BY name")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/customers/:customerId", (req, res) => {
  const id = req.params.customerId;
  pool
    .query(`Select * from customers where id = $1`, [id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

app.get("/customers/:customerId/bookings", (req, res) => {
  const id = req.params.customerId;
  const queryString = ` Select * from customers 
                        inner join bookings on customer_id = customers.id
                        where customers.id = $1`;
  pool
    .query(queryString, [id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

app.post("/customers", (req, res) => {
  const {
    customerName,
    customerEmail,
    customerAddress,
    customerCity,
    customerPostcode,
    customerCountry,
  } = req.body;
  const queryString = `INSERT INTO customers 
                        (name, email, address, city, postcode, country) 
                        VALUES ($1, $2, $3, $4, $5, $6)`;
  const params = [
    customerName,
    customerEmail,
    customerAddress,
    customerCity,
    customerPostcode,
    customerCountry,
  ];

  Pool.query(queryString, params)
    .then(() => res.status(200).send("Customer created!"))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

app.get("/hotels", function (req, res) {
  pool
    .query("SELECT * FROM hotels")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/hotels/:hotelId", (req, res) => {
  const id = req.params.hotelId;
  pool
    .query(`select * from hotels where id = $1`, [id])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

app.post("/hotels", (req, res) => {
  const hotelName = req.body.name;
  const hotelRooms = req.body.rooms;
  const hotelPostcode = req.body.postcode;

  if (!Number.isInteger(hotelRoomshotelRooms) || hotelRooms <= 0) {
    return res
      .status(400)
      .send("The number of rooms should be a positive integer.");
  }
  pool
    .query(`Select * from hotels where name=$1`, [hotelName])
    .then((result) => {
      if (result.rows.length > 0)
        res.status(400).send("There is a hotel with this same name!");
      else {
        const queryString =
          "Insert Into hotels (name, rooms, postcode) values ($1, $2, $3)";
        pool
          .query(queryString, [hotelName, hotelRooms, hotelPostcode])
          .then(() => res.send("Hotel created!"))
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    });
});

app.put('/customers/:customerId', (req, res) => {
  const id = req.params.customerId;
  const {email} = req.body
  const queryString = `Update customers Set email=${email} where id = ${id}`

  pool
  .query(queryString)
  .then(() => res.status(200).send('Customer updated!'))
  .catch(error => {
    console.error(error);
    res.status(500).json(error);
  })
})

app.listen(3005, function () {
  console.log("Server is listening on port 3005. Ready to accept requests!");
});