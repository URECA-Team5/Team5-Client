import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './components/MainContent';
import Navibar from './components/Navibar';
import QnAPage from './components/QnAPage';
import QnADetail from './components/QnADetail';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Board from './components/Board';
import BoardDetail from './components/BoardDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navibar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/qna" element={<QnAPage />} /> {/* QnA 페이지 라우트 추가 */}
          <Route path="/qna/:id" element={<QnADetail />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;