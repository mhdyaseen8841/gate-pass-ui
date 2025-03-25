import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { VisitorProvider } from './contexts/VisitorContext';
import './App.css';
import VisitorManagementSystem from './components/Dashboard';
import Login from './components/login';

function App() {
  return (
    <VisitorProvider>
      <Router>
        <div className="App">
            <Routes>
              <Route path="/" element={  <VisitorManagementSystem/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </div>
      </Router>
    </VisitorProvider>
  );
}

export default App;