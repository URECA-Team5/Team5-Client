import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';  // 스타일을 위한 CSS 파일

// Material UI 테마
const theme = createTheme({
  typography: {
    allVariants: {
      color: '#000', // 모든 텍스트 색상을 검은색으로 설정
      fontWeight: 'normal', // 모든 텍스트 굵기 제거
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#000', // 버튼 배경색을 검은색으로 설정
          color: '#fff', // 버튼 글씨 색상을 흰색으로 설정
          '&:hover': {
            backgroundColor: '#333', // 버튼 hover 시 어두운 색상으로 변경
          },
        },
        outlined: {
          color: '#000', // outlined 버튼 글씨 색상을 검은색으로 설정
          borderColor: '#000', // outlined 버튼 테두리 색상을 검은색으로 설정
          '&:hover': {
            borderColor: '#333', // outlined 버튼 hover 시 테두리 색상 변경
            backgroundColor: '#f5f5f5', // hover 시 배경색 변경
          },
        },
      },
    },
  },
});

export default function Login({setIsLoggedIn, setUserId}) {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로컬 로그인 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      username: id,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.text();
        console.log('Login successful:', result);
        localStorage.setItem('token', result);  // 로그인 토큰 저장
        localStorage.setItem('isLoggedIn', true);  // 로그인 상태 저장
        localStorage.setItem('userId', id);
        setIsLoggedIn(true);  // 상태 업데이트
        navigate('/');

        // 예시로 로그인 후 다른 API 요청
        const token = localStorage.getItem('token');
        const apiResponse = await fetch('http://localhost:8080/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Authorization 헤더에 토큰 추가
            'Content-Type': 'application/json'
          }
        });
        const data = await apiResponse.json();
        console.log('Protected data:', data);
      } else {
        console.error('Login failed');
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 구글 로그인 처리
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  // 카카오 로그인 처리
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  return (
    <div className="main-content">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="login-container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // 가운데 정렬
            }}
          >
            {/* HANDICINE 로고 */}
            <Typography
              component="h1"
              variant="h4"
              className="brand-title"
              sx={{
                mb: 3,
                textAlign: 'center',
                color: '#00A3E0',
                fontSize: '2.5rem',
                fontWeight: 'bold',
              }}
            >
              HANDICINE
            </Typography>

            {/* Sign in 제목 */}
            <Typography style={{ textShadow: "none" }}
              component="h1"
              variant="h5"
              sx={{ marginBottom: 3, textAlign: 'center' }}
            >
              Sign in
            </Typography>

            {/* ID 입력 필드 */}
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', textShadow: 'none' }}
            >
              ID
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  '&:focus': {
                    borderColor: '#83C9E7',
                  },
                },
              }}
            />

            {/* Password 입력 필드 */}
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold', textShadow: 'none' }}
            >
              Password
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  '&:focus': {
                    borderColor: '#83C9E7',
                  },
                },
              }}
            />
            
            {/* 로컬 로그인 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="login-button"
              onClick={handleSubmit}
            >
              Sign in
            </Button>

            {/* Google 로그인 버튼 */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img
                src={require('../images/Google.jpg')}
                alt="Google"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>

            {/* Kakao 로그인 버튼 */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img
                src={require('../images/kakao.jpg')}
                alt="kakao"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
              />}
              sx={{ mt: 2, mb: 2 }}
              onClick={handleKakaoLogin}
            >
              Sign in with KakaoTalk
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}