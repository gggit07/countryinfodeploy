import React from "react";
import { Link } from "react-router-dom";

const Country = ({ item }) => {
  return (
    <div className="card_county">
      <Link to={`/countries/${item.cca2}`} className="card_country-link">
        <div className="card_county-wrapper">
          <div
            className="card_county-img-box"
            style={{ backgroundImage: `url(${item.flags.svg})` }}
          ></div>
          <div className="card_county-body">
            <h4 className="card_county-title">{item.name.common}</h4>
            <div className="card_county-info">
              <p className="population">
                <span>Population:</span>
                {item.population}
              </p>
              <p className="region">
                <span>Region:</span>
                {item.region}
              </p>
              <p className="capital">
                <span>Capital:</span>
                {item.capital}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Country;
