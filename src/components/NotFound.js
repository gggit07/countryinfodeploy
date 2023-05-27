import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeBtnClick = () => {
    navigate("/");
  };

  return (
    <div id="not_found">
      <h1>404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2>We can't find that page</h2>
        <p>
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it's behalf.
        </p>
        <button onClick={handleHomeBtnClick} className="btn btn-secondary me-2">
          Countries
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
