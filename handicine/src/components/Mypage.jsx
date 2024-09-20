import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignUp.css';  // 스타일을 위한 CSS 파일
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { Radio } from '@mui/material';

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

export default function Mypage() {
  const [selectedRole, setSelectedRole] = useState('normal');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Id = data.get('Id');
    const password = data.get('password');
    console.log({
      id: data.get('id'),
      password: data.get('password'),
    });
  };

  const handleDeleteAccount = () => {
    // 정보 삭제 기능 (실제 환경에서는 API 호출 필요)
    console.log("회원탈퇴 버튼 클릭됨");
    // 예를 들어, API 호출을 통해 사용자의 정보를 삭제하는 로직을 추가할 수 있습니다.
    alert('회원탈퇴 기능이 호출되었습니다. 실제로는 서버와 통신하여 사용자를 삭제해야 합니다.');
  };
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
                  flexGrow: 1, // 버튼과 글자 사이의 간격을 유지
                }}
              >
                HANDICINE
              </Typography>

              {/* 회원탈퇴 버튼 */}
              <Button
                variant="outlined"
                onClick={handleDeleteAccount}
                sx={{ ml: 2 }} // 왼쪽 여백 추가
              >
                회원탈퇴
              </Button>
            </div>

            {/* 정보 수정 글자 */}
            <Typography
              style={{textShadow:"none"}}
              component="h1"
              variant="h5"
              sx={{ marginBottom: 3, textAlign: 'left' }}
            >
              회원 정보 수정
            </Typography>

            {/* ID 레이블 */}
            <Typography
              style={{textShadow:"none"}}
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1 }}
            >
              ID
              <FormControlLabel
                style={{ marginLeft: "170px", textShadow:"none" }}
                control={<Radio checked={selectedRole === 'normal'} onChange={handleRoleChange} value="normal" />}
                label="일반인"
              />
              <FormControlLabel
              style={{textShadow:"none" }}
                control={<Radio checked={selectedRole === 'expert'} onChange={handleRoleChange} value="expert" />}
                label="전문가"
              />
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
              style={{textShadow:"none"}}
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

            <Typography
              style={{textShadow:"none"}}
              variant="body1"
              sx={{ alignSelf: 'flex-start', mb: 1 }}
            >
              E-mail
            </Typography>

            {/* E-mail 입력 필드 */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="Email"
              type="Email"
              id="Email"
              autoComplete="current-password"
              InputProps={{
                disableUnderline: true,
              }}
            />

            {/* 수정하기 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="update-button"
            >
              회원 정보 수정
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
