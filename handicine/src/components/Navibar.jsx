import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navibar.css';

const Navibar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage to see if the user is logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.setItem('isLoggedIn', false); // Update login status in localStorage
    setIsLoggedIn(false);
    navigate('/'); // Redirect to homepage after logout
  };

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
        {!isLoggedIn ? (
          <>
            <Button variant="light" className='btn' as={Link} to="/login">로그인</Button>
            <Button variant="light" className='btn' as={Link} to="/signup">회원가입</Button>
          </>
        ) : (
          <>
            <Button variant="light" className='btn' as={Link} to="/mypage">마이페이지</Button>
            <Button variant="light" className='btn' onClick={handleLogout}>로그아웃</Button>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default Navibar;
