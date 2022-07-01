import React, { useEffect, useState } from 'react'
// import AddCustomer from "./AddCustomer";
import Search from './Search'
import Sort from './Sort'
import axios from 'axios'
import ModalForm from './ModalForm'
import ModalApproved from './ModalApproved'

const path = 'https://hotels-bookings.herokuapp.com/customers'

const Customers = () => {
  const [allCustomers, setAllCustomers] = useState([])
  const [customers, setCustomers] = useState([])
  const [reload, setReload] = useState(false)

  const loadData = () => {
    axios
      .get(path)
      .then((res) => {
        setCustomers(res.data)
        setAllCustomers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setReload(false)
  }, [reload])

  const deleteHandler = (id, approval) => {
    console.log('delete', approval, id)
    if (approval)
      axios
        .delete(`https://hotels-bookings.herokuapp.com/customers/${id}`)
        .then(() => {
          loadData()
        })
  }

  return (
    <>
      <nav>
        {/* <AddCustomer customers={customers} loadData={loadData} /> */}
        <ModalForm formTitle="Add Customer" loadData={loadData} />
        <Search allData={allCustomers} setData={setCustomers} />
        <Sort setReload={setReload} setData={setCustomers} data={customers} />
      </nav>
      <div className="content">
        {customers.map((customer) => {
          const imgAlt = `Customer ${customer.id} Picture`
          return (
            <div className="card-row">
              <div className='d-flex-row-justify-start'>

              <img src="./assets/images/person.png" alt={imgAlt} />
              <div>
                <div> Name: {customer.name}</div>
                <div> Postcode: {customer.postcode}</div>
              </div>
              </div>
              <div className='d-flex-col-justify-start'>
                <ModalApproved deleteHandler={deleteHandler} id={customer.id} />
                <ModalForm formTitle="Edit" loadData={loadData} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Customers
