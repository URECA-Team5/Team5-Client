import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import './SignUp.css';  // 스타일을 위한 CSS 파일
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from 'react-bootstrap';

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

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
      password: data.get('password'),
      email: data.get('email'),
    });
  };

  return (
    <div className="main-content">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="signup-container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // 중앙 정렬
            }}
          >
            {/* HANDICINE 글자 */}
            <Typography
              component="h1"
              variant="h4" // 'h4'로 유지
              className="brand-title"
              sx={{
                mb: 3,
                textAlign: 'center', // 중앙 정렬
                color: '#00A3E0',
                fontSize: '2.5rem', // 더 큰 크기
                fontWeight: 'bold', // 굵게
              }}
            >
              HANDICINE
            </Typography>

            {/* Sign up 글자 */}
            <Typography style={{textShadow:"none"}}
              component="h1"
              variant="h5"
              sx={{ marginBottom: 3, textAlign: 'center' }}
            >
              Sign up
            </Typography>

            {/* ID 레이블 */}
            <Typography
              style={{textShadow:"none"}}
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold' }}
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
              sx={{ 
                mb: 2,
                '& .MuiInputBase-root': { 
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  '&:focus': { 
                    borderColor: '#B3D9E2',
                  },
                },
              }}
            />

            {/* Password 레이블 */}
            <Typography
              style={{textShadow:"none"}}
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold' }}
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
              sx={{ 
                mb: 2,
                '& .MuiInputBase-root': { 
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                  '&:focus': { 
                    borderColor: '#B3D9E2',
                  },
                },
              }}
            />

            {/* E-mail 레이블 */}
            <Typography
              style={{textShadow:"none"}}
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1, fontWeight: 'bold' }}
            >
              E-mail
            </Typography>
            {/* E-mail 입력 필드 */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              type="email"
              id="email"
              autoComplete="email"
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
                    borderColor: '#B3D9E2',
                  },
                },
              }}
            />

            {/* 사용자 유형 체크박스 */}
            <FormGroup sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="일반인"
                value="member"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="전문가"
                value="expert"
              />
            </FormGroup>

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="signup-button"
              onClick={handleSubmit}
            >
              Sign up
            </Button>

            {/* Google 회원가입 버튼 */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img 
                src={require('../images/Google.jpg')}  // 이미지 파일 경로
                alt="Google" 
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}  // 이미지 크기 및 스타일
              />}
              sx={{ mt: 2, mb: 2 }}
            >
              Sign up with Google
            </Button>

            {/* Facebook 회원가입 버튼 */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img 
                src={require('../images/facebook.jpg')}  // 이미지 파일 경로
                alt="facebook" 
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}  // 이미지 크기 및 스타일
              />}
              sx={{ mt: 2, mb: 2 }}
            >
              Sign up with Facebook
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
