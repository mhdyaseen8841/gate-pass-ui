import React, { createContext, useState, useEffect } from 'react';

export const VisitorContext = createContext();

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState(() => {
    const savedVisitors = localStorage.getItem('visitors');
    return savedVisitors ? JSON.parse(savedVisitors) : [];
  });
  
  const [activeVisitors, setActiveVisitors] = useState([]);
  const [checkedOutVisitors, setCheckedOutVisitors] = useState([]);
  
  useEffect(() => {
    localStorage.setItem('visitors', JSON.stringify(visitors));
    
    // Filter active and checked out visitors
    setActiveVisitors(visitors.filter(visitor => !visitor.checkoutTime));
    setCheckedOutVisitors(visitors.filter(visitor => visitor.checkoutTime));
  }, [visitors]);
  
  const addVisitor = (visitor) => {
    const newVisitor = {
      ...visitor,
      id: Date.now().toString(),
      checkinTime: new Date().toISOString(),
      checkoutTime: null
    };
    setVisitors([...visitors, newVisitor]);
    return newVisitor;
  };
  
  const checkoutVisitor = (id) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === id ? { ...visitor, checkoutTime: new Date().toISOString() } : visitor
    ));
  };
  
  const deleteVisitor = (id) => {
    setVisitors(visitors.filter(visitor => visitor.id !== id));
  };
  
  return (
    <VisitorContext.Provider value={{
      visitors,
      activeVisitors,
      checkedOutVisitors,
      addVisitor,
      checkoutVisitor,
      deleteVisitor
    }}>
      {children}
    </VisitorContext.Provider>
  );
};