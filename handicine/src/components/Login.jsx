import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
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
          },
        },
      },
    },
  },
});

export default function Login() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Id = data.get('Id')
    const password = data.get('password')
    console.log({
      id: data.get('id'),
      password: data.get('password'),
    });
    navigate('/')
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
              alignItems: 'flex-start', // 왼쪽 정렬
            }}
          >
            {/* HANDICINE 글자 */}
            <Typography
              component="h1"
              variant="h4" // 'h4'로 유지
              className="brand-title"
              sx={{
                mb: 3,
                mt: -3,
                textAlign: 'left',
                color: '#B3D9E2',
                fontSize: '2rem', // 원하는 크기로 조정
              }}
            >
              HANDICINE
            </Typography>

            {/* Sign in 글자 */}
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginBottom: 3, textAlign: 'left' }}
            >
              Sign in
            </Typography>

            {/* ID 레이블 */}
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1 }}
            >
              ID
            </Typography>
            {/* ID 입력 필드 */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              name="id"
              autoComplete="id"
              autoFocus
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ mb: 2 }}
            />

            {/* Password 레이블 */}
            <Typography
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1 }}
            >
              Password
            </Typography>
            {/* Password 입력 필드 */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                disableUnderline: true,
              }}
            />
            
            {/* 로그인 버튼 */}
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
              startIcon={<GoogleIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in with Google
            </Button>

            {/* Facebook 로그인 버튼 */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ mt: 1, mb: 2 }}
            >
              Sign in with Facebook
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
