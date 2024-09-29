import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');  // 백엔드에서 전달한 JWT 토큰 추출

    if (token) {
      console.log("Received token:", token);  // 받은 토큰을 로그로 확인

      // JWT 페이로드에서 sub 값 추출 (username)
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;  // sub에 저장된 username 추출

        localStorage.setItem('token', token);  // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('userId', username);  // username을 userId로 저장
        localStorage.setItem('isLoggedIn', 'true');  // 로그인 상태 저장

        navigate('/');  // 홈으로 이동
      }
    }, [navigate]);

  return <div>Logging in...</div>;
}