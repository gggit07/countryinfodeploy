import React, { useState, useEffect, useRef, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Country from "./Country";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../actions";

const Countries = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);

  const [nameCounty, setNameCounty] = useState("");
  const [filterSelected, setFilterSelected] = useState("Filter By Region");
  const [foundCountries, setfoundCountries] = useState([]);
  const [strSearch, setStrSearch] = useState("");
  const [strFilter, setStrFilter] = useState("ALL");
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const listRef = useRef(null);
  const filterRef = useRef(null);

  const regions = useMemo(() => {
    return [...new Set(countries.map((country) => country.region))];
  }, [countries]);

  useEffect(() => {
    dispatch(fetchCountries());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function handleClickOutsideFilter(event) {
      if (listRef.current && !filterRef.current.contains(event.target)) {
        setIsOpenFilter(false);
      }
    }

    document.addEventListener("click", handleClickOutsideFilter);

    return () => {
      document.removeEventListener("click", handleClickOutsideFilter);
    };
  }, [listRef]);

  const handleChangeSearch = (e) => {
    setNameCounty(e.target.value);
    if (countries.length > 0) {
      setStrSearch(e.target.value);
      filterCountries(strFilter, e.target.value);
    }
  };

  const handleFilterClick = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleClickRegionItem = (e) => {
    setFilterSelected(e.target.innerText);

    setStrFilter(e.target.innerText);
    filterCountries(e.target.innerText, strSearch);
  };

  const handleSearchBlur = (e) => {
    if (!Boolean(e.target.value.trim())) {
      filterCountries(strFilter, "");
    }
  };

  const filterCountries = (filterStr, searchStr) => {
    setIsFirstTime(false);
    const filter = filterStr.toUpperCase();
    const serach = searchStr.trim().toUpperCase();

    if (filter === "ALL") {
      setfoundCountries(countries);
    }

    setfoundCountries(
      countries.filter(
        (c) =>
          (filter === "ALL" || c.region.toUpperCase().includes(filter)) &&
          (!(serach.length > 0) || c.name.common.toUpperCase().includes(serach))
      )
    );
  };

  return (
    <main className="countries main-bg">
      <Container>
        <Row className="between-center relative-z-1">
          <Col md={5}>
            <div className="search">
              <input
                onBlur={handleSearchBlur}
                type="text"
                name="nameCounty"
                className="search-input"
                id="nameCounty"
                value={nameCounty}
                onChange={(e) => handleChangeSearch(e)}
              />
              {!Boolean(nameCounty) && (
                <label htmlFor="nameCounty" className="input-placeholder">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  Search for a country...
                </label>
              )}
            </div>
          </Col>
          <Col md={2}>
            <div className="filter" onClick={handleFilterClick} ref={filterRef}>
              <p className="filter-selected">
                <span id="filterText">{filterSelected}</span>
                <i className="fa-solid fa-angle-down"></i>
              </p>
              {isOpenFilter && (
                <ul className="filter-list" ref={listRef}>
                  <li className="filter-item" onClick={handleClickRegionItem}>
                    Filter By Region
                  </li>
                  <li className="filter-item" onClick={handleClickRegionItem}>
                    All
                  </li>
                  {Boolean(regions.length > 0) &&
                    regions.map((r) => (
                      <li
                        key={r}
                        className="filter-item"
                        onClick={handleClickRegionItem}
                      >
                        {r}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <Row>
              {isFirstTime
                ? countries.map((c) => (
                    <Col key={c.cca2} md={3} className="mb-4">
                      <Country item={c} />
                    </Col>
                  ))
                : foundCountries.map((c) => (
                    <Col key={c.cca2} md={3} className="mb-4">
                      <Country item={c} />
                    </Col>
                  ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Countries;
