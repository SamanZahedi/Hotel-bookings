

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

// app.put('/customers/:customerId', (req, res) => {
//   const customerId = req.params.customerId
//   const customerEmail = req.body.email
//   const customerName = req.body.name
//   const customerCity = req.body.city
//   const customerPostcode = req.body.postcode
//   const customerAddress = req.body.address
//   const customerCountry = req.body.country

//   const params = []

//   [req.body].map(p => {if(p) console.log(p[0])})
//   // console.log(req.body.name)
//   const selectQuery = `select * from customers where id = $1`
//   // const updateQuery = `Update customers set
//                         // ${customerEmail&&` email = $1`}
//                         // ${customerName&&`name = $2`}
//                         // ${customerAddress&&` a = $3`}
//                         // ${customerEmail&&`email = $4`}
//                         // where id = $2`
//   const updateQuery = `Update customers set email = $1 where id = $2`

//   pool.query(selectQuery, [customerId]).then((result) => {
//     if (result.rows == 0) res.status(400).send("Customer doesn't exist!")
//     else {
//       if (!customerEmail.includes('@') || !customerEmail.includes('.'))
//         res.status(400).send('The email address is not valid!')
//       else
//         pool
//           .query(updateQuery, [customerEmail, customerId])
//           .then(() =>
//             res.status(200).send(`Customer ${customerId} has been updated!`),
//           )
//           .catch((error) => {
//             console.log(error)
//             res.status(500).json(error)
//           })
//     }
//   })
// })

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

app.listen(3005, function () {
  console.log("Server is listening on port 3005. Ready to accept requests!");
});