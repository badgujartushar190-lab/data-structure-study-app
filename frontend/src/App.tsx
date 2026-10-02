import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { TopicPage } from './pages/Learn/TopicPage';
import { VisualLab } from './pages/VisualLab';
import { CPlayground } from './pages/CPlayground';
import { Quiz } from './pages/Quiz';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
          <Navbar />
          <div className="pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Navigate to="/learn/chap-1/top-101" replace />} />
              <Route path="/learn/:chapterId/:topicId" element={<TopicPage />} />
              <Route path="/visual-lab" element={<VisualLab />} />
              <Route path="/playground" element={<CPlayground />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
