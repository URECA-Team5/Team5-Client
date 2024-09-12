import React, { useState } from "react";
import "./MainContent.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const [medicineName, setMedicineName] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setMedicineName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (medicineName.trim() !== "") {
      navigate(`/searchMedicine/${medicineName}`);
    }
  };

  return (
    <div className="main-content">
      <div className="background-overlay" />
      <Container fluid>
        <Row className="search-container">
          <Col md={8} lg={6} className="form-container">
            <Form onSubmit={handleSearchSubmit}>
              <Form.Group controlId="formSearch">
                <Form.Control
                  type="text"
                  placeholder="약품이름을 입력하세요"
                  value={medicineName}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="content-container">
        <h1>내 손 안의 약사 서비스, HANDICINE</h1>
        <p>
          5000 종 이상의 의약품, <br />
          식품의약품안전처에서 제공한 정보로 안전하게!
        </p>
      </div>
    </div>
  );
};

export default MainContent;
