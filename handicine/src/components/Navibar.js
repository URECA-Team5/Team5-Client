import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navibar.css'; // CSS 파일

const Navibar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <div className="brand-container">
        <Navbar.Brand as={Link} to='/' className="custom-brand">HANDICINE</Navbar.Brand>
      </div>
      <div className="nav-container">
        <Nav className="menu">
          <Nav.Link as={Link} to="/qna">전문가 Q&A</Nav.Link>
          <Nav.Link as={Link} to="/board">자유 게시판</Nav.Link>
          <Nav.Link as={Link} to="/pharmacy">주변 약국 찾기</Nav.Link>
          <Nav.Link as={Link} to="/disease">전염병 유행정보</Nav.Link>
          <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
        </Nav>
      </div>
      <div className="auth-container">
        <Button variant="light" as={Link} to="/login">로그인</Button>
        <Button variant="light" as={Link} to="/signup">회원가입</Button>
      </div>
    </Navbar>
  );
};

export default Navibar;