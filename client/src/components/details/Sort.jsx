import React, { useState, useEffect } from "react";
import "../../css/sort.css";

const Sort = ({ setReload, setData, data }) => {
  const [asc, setAsc] = useState(false);
  const [selected, setSelected] = useState(
    data.length > 0 ? Object.keys(data[0])[0] : "id"
  );
  const toggle = () => {
    setAsc(!asc);
  };

  const compare = (a, b, param, asc) => {
    if (a[param] < b[param]) return asc ? -1 : 1;
    if (a[param] > b[param]) return asc ? 1 : -1;
    return 0;
  };

  useEffect(() => {
    const sortedCustomers = data.sort((a, b) => compare(a, b, selected, asc));
    setData(sortedCustomers);
    setReload(true);
  }, [asc, data, selected, setData, setReload]);

  return (
    <div className="sort">
      <select
        name="sort"
        id="sort"
        onChange={(e) => setSelected(e.target.value)}
      >
        {data.length>0&&Object.keys(data[0]).map((el) => (
          <option value={el}>By {el[0].toUpperCase().concat(el.slice(1))}</option>
        ))}
      </select>

      <div className="asc">
        <div className="asc-caption">{asc ? "Ascending" : "Descending"}</div>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" onClick={toggle}></span>
        </label>
      </div>
    </div>
  );
  
};

export default Sort;
