const express = require('express')

const app = express()
app.use(express.json())

const pg = require('pg')
const { Pool } = require('pg')
const ClientClass = pg.Client
const pgUrl =
  'postgres://oqmvbphg:CjrsKtqK8OrwH-8kiJKGGWZtidjiEJq6@tyke.db.elephantsql.com/oqmvbphg'
const client = new ClientClass(pgUrl)

const pool = new Pool({
  user: 'oqmvbphg',
  host: 'tyke.db.elephantsql.com',
  database: 'oqmvbphg',
  password: 'CjrsKtqK8OrwH-8kiJKGGWZtidjiEJq6',
  port: 5432,
})

app.get('/products', async (req, res) => {
  const sqlQuery = 'Select * from products'
  const result = await connect(client, sqlQuery)
  res.json(result)
})

async function connect(client, sqlQuery) {
  try {
    await client.connect()
    const { rows } = await client.query(sqlQuery)
    return rows
  } catch (ex) {
    return ex
  } finally {
    await client.end()
  }
}

const port = process.env.port || 5000

app.listen(port, () => console.log(`Server is listening on port ${port}`))
