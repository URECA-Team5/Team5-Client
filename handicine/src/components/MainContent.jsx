import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MainContent.css';

const MainContent = () => {
  const [medicineName, setMedicineName] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setMedicineName(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Navigating to: /searchMedicine/${medicineName}`);
    if (medicineName.trim() !== "") {
      navigate(`/searchMedicine/${medicineName}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(e);
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
                  onKeyDown={handleKeyDown}
                />
              </Form.Group>
              <Button style={{ marginTop: "20px", width: "30%", backgroundColor: "#83C9E7" }} variant="info" type="submit">검색</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="content-container">
        <h1 style={{ color: "#333", fontWeight: "bold", fontSize: "2rem" }}>내 손 안의 약사 서비스, HANDICINE</h1>
        <p style={{ color: "#333", fontWeight: "bold", fontSize: "2rem" }}>
          5000 종 이상의 의약품, <br />
          식품의약품안전처에서 제공한 정보로 안전하게!
        </p>
      </div>
    </div>
  );
};

export default MainContent;
