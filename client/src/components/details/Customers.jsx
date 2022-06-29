import React, { useEffect, useState } from 'react'
import AddCustomer from './AddCustomer'
import Search from './Search'
import Sort from './Sort'
import axios from "axios";

const path = 'https://hotels-bookings.herokuapp.com/customers'

const Customers = () => {
  const [customers, setCustomers] = useState([''])
  // const [loading, setLoading] = useState(true)
  // const [reload, setReload] = useState(false)

  const searchHandler = (searchText) => {
    let filteredCustomers = customers.filter((customer) =>
      customer.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    setCustomers(filteredCustomers)
  }

  const compare = (a, b, param, asc) => {
    if (a[param] < b[param]) return asc ? -1 : 1
    if (a[param] > b[param]) return asc ? 1 : -1
    return 0
  }

  const sortHandler = (value, asc) => {
    // setReload(true)
    const sortedCustomers = customers.sort((a, b) => compare(a, b, value, asc))
    setCustomers(sortedCustomers)
  }
  // const deleteHandler = (id) => {
  //   axios.delete(path + id).then((res) => {
  //     loadData()
  //   })
  // }

  const loadData = () => {
    axios
      .get(path)
      .then((res) => {
        setCustomers(res.data)
      })
      .catch((err) => {
        console.log(err)
        // setLoading(true);
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <nav>
        <AddCustomer customers={customers} loadData={loadData} />
        <Search searchHandler={searchHandler} />
        <Sort sortHandler={sortHandler} />
      </nav>
      <div className='content'>
        {customers.map((customer) => {
          const imgAlt = `Customer ${customer.id} Picture`  
          return <div className='card-row'>
            <img src='./person.png' alt={imgAlt}/>
            {customer.name}</div>
        })}
      </div>
    </>
  )
}

export default Customers
