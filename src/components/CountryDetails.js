import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../actions";

const CountryDetails = () => {
  const [country, setCountry] = useState({});
  const [nativeName, setNativeName] = useState("");
  const [borderCountries, setBorderCountries] = useState([]);

  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);

  const navigate = useNavigate();
  const { cca2 } = useParams();

  useEffect(() => {
    dispatch(fetchCountries());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getCountry = async () => {
      const { data } = await API.get(`/alpha/${cca2}`);

      setCountry(data[0]);
      const nn = Object.values(data[0].name.nativeName)[0];
      setNativeName(nn.common);
      const arr = Object.keys(data[0]);

      if (arr.includes("borders")) {
        const bcList = Object.values(data[0]?.borders);
        const bc = countries.filter((c) => bcList.includes(c.cca3));
        setBorderCountries(bc);
      }
    };

    getCountry();
  }, [cca2, countries]);

  return (
    <main className="country-main main-bg">
      <Container>
        <Row className="between-center relative-z-1">
          <Col md={5}>
            <button className="to-back-btn" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-arrow-left-long"></i>
              <span className="to-back-btn-text">Back</span>
            </button>
          </Col>
        </Row>
        {Object.keys(country).length > 0 && (
          <Row className="mt-5">
            <Col md={5}>
              <div
                className="country-img-box"
                style={{ backgroundImage: `url(${country.flags.svg})` }}
              ></div>
            </Col>
            <Col md={7}>
              <div className="country-text-wrapper">
                <h2 className="country-name">{country.name.common}</h2>
                <div className="country-info-wrapper">
                  <Row>
                    <Col>
                      <p>
                        <span className="prop">Native Name:</span>
                        {nativeName}
                      </p>
                      <p>
                        <span className="prop">Papulation:</span>
                        {country.population}
                      </p>
                      <p>
                        <span className="prop">Region:</span>
                        {country.region}
                      </p>
                      <p>
                        <span className="prop">Sub Region:</span>
                        {country.subregion}
                      </p>
                      <p>
                        <span className="prop">Capital:</span>
                        {country.capital}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        <span className="prop">Top Level Domain:</span>
                        {country.tld}
                      </p>
                      <p>
                        <span className="prop">Currencies:</span>
                        {Object.values(country.currencies).map((c, i, arr) => (
                          <span key={c.name}>
                            {c.name}
                            {i + 1 === arr.length ? "" : ", "}
                          </span>
                        ))}
                      </p>
                      <p>
                        <span className="prop">Languages:</span>
                        {Object.values(country.languages).map((l, i, arr) => (
                          <span key={l}>
                            {l}
                            {i + 1 === arr.length ? "" : ", "}
                          </span>
                        ))}
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="border-countries">
                  <span className="prop">Border Countries:</span>
                  <ul className="border-list">
                    {Boolean(borderCountries.length) &&
                      borderCountries.map((bc) => (
                        <li key={bc.cioc}>{bc.name.common}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default CountryDetails;
