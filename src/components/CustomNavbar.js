import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CustomNavbar = ({ mode }) => {
  const [isSun, setIsSun] = useState(true);

  const handleModeChange = () => {
    setIsSun(!isSun);
    mode();
  };

  return (
    <header>
      <Container>
        <Row className="between-center">
          <Col md={5}>
            <h2 className="title">Where in the world?</h2>
          </Col>
          <Col md={2}>
            <div className="mode" onClick={handleModeChange}>
              {isSun ? (
                <>
                  <span className="icon-box">
                    <i className="fa-solid fa-sun"></i>
                  </span>
                  <p>Light Mode</p>
                </>
              ) : (
                <>
                  <span className="icon-box">
                    <i className="fa-solid fa-moon"></i>
                  </span>
                  <p>Dark Mode</p>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default CustomNavbar;
