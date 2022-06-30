import React from 'react'

const Search = ({ allData, setData }) => {
  const searchHandler = (searchText) => {
    let filteredCustomers = allData.filter((customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredCustomers);
  };
  return (
    <div className="search">
      <input
        className="form-control"
        onChange={(e) => {
          searchHandler(e.target.value);
        }}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search
