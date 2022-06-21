const express = require('express')
const app = express()
const { Pool } = require('pg')

app.use(express.json())

const pool = new Pool({
  user: 'cyf24',
  host: 'database-1.c7jkbbjyxtpj.us-east-1.rds.amazonaws.com',
  database: 'cyf24',
  password: 'uSLCnmUH',
  port: 5432,
})

const port = process.env.port || 5000
app.listen(port, () => console.log(`Server is starting on port ${port}`))

app.get('/customers/search', (req, res) => {
  const searchTerm = req.query.term
  const queryString = `select * from customers where name like '%${searchTerm}%' order by name`
  pool
    .query(queryString)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error)
      res.status(500).json(error)
    })
})

app.get('/customers', (req, res) => {
  const queryString = 'select * from customers order by name'
  pool
    .query(queryString)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error)
      res.status(500).json(error)
    })
})

app.get('/customers/:id', (req, res) => {
  const id = req.params.id
  const queryString = `select * from customers where id = ${id} order by name`
  pool
    .query(queryString)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error)
      res.status(500).json(error)
    })
})
