import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './components/MainContent';
import Navibar from './components/Navibar';
import QnAPage from './components/QnAPage';
import QnADetailPage from './components/QnADetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navibar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/qna" element={<QnAPage />} /> {/* QnA 페이지 라우트 추가 */}
          <Route path="/qna/:id" element={<QnADetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;