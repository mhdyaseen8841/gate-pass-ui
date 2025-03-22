import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { VisitorProvider } from './contexts/VisitorContext';
import './App.css';
import VisitorManagementSystem from './components/Dashboard';

function App() {
  return (
    <VisitorProvider>
      {/* <Router>
        <div className="App">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/check-in" element={<VisitorForm />} />
              <Route path="/visitors" element={<VisitorList />} />
            </Routes>
          </div>
        </div>
      </Router> */}

      <VisitorManagementSystem/>
    </VisitorProvider>
  );
}

export default App;