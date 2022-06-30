import React, { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import Search from "./Search";
import Sort from "./Sort";
import axios from "axios";
const path = "https://hotels-bookings.herokuapp.com/customers";

const Customers = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(false);

  const loadData = () => {
    axios
      .get(path)
      .then((res) => {
        setCustomers(res.data);
        setAllCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setReload(false);
  }, [reload]);

  return (
    <>
     <nav>
        <AddCustomer customers={customers} loadData={loadData} />
        <Search allData={allCustomers} setData={setCustomers} />
        <Sort setReload={setReload} setData={setCustomers} data={customers} />
      </nav>
      <div className="content">
        {customers.map((customer) => {
          const imgAlt = `Customer ${customer.id} Picture`;
          return (
            <div className="card-row">
              <img src="./person.png" alt={imgAlt} />
              <div>
                <div> Name: {customer.name}</div>
                <div> Postcode: {customer.postcode}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};


export default Customers;
