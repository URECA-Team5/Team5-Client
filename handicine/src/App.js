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
import Input from './components/Input';
import SearchMedicine from './components/SearchMedicine';
import QnAUpdate from './components/QnAUpdate';
import Mypage from './components/Mypage';
import { useState } from 'react';
import BoardUpdate from './components/BoardUpdate';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  
  return (
    <Router>
      <div className="App">
        <Navibar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/qna" element={<QnAPage />} /> {/* QnA 페이지 라우트 추가 */}
          <Route path="/qna/:qnaid" element={<QnADetail />} />
          <Route path="/board/:postid" element={<BoardDetail />} />
          <Route path="/board" element={<Board />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>} />
          <Route path="/Input" element={<Input />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/mypage/:id" element={<Mypage userId={userId}/>} />
          <Route path="/qna/update/" element={<QnAUpdate/>} />
          <Route path="/board/update/" element={<BoardUpdate/>} />
          <Route path="/searchMedicine/:medicineName" element={<SearchMedicine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;