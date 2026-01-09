import React, { createContext, useContext, useState, useEffect } from 'react';

const TradelineContext = createContext();

// Initial sample tradelines data
const initialTradelines = [
  {
    id: 'TL-009',
    bank: 'PNC Core',
    lastFour: '7442',
    statementDate: 11,
    utilization: 2,
    age: 9,
    creditLimit: 25000,
    price: 515,
    rating: 4.8,
    available: true,
    featured: true,
    status: 'active'
  },
  {
    id: 'TL-005',
    bank: 'Wells Fargo Active Cash',
    lastFour: '5532',
    statementDate: 6,
    utilization: 3,
    age: 8,
    creditLimit: 22000,
    price: 480,
    rating: 4.7,
    available: true,
    featured: true,
    status: 'active'
  },
  {
    id: 'TL-003',
    bank: 'Discover It',
    lastFour: '2210',
    statementDate: 3,
    utilization: 4,
    age: 5,
    creditLimit: 18000,
    price: 410,
    rating: 4.6,
    available: true,
    featured: false,
    status: 'active'
  },
  {
    id: 'TL-008',
    bank: 'Amex Blue Cash',
    lastFour: '3054',
    statementDate: 25,
    utilization: 8,
    age: 5,
    creditLimit: 14000,
    price: 360,
    rating: 4.5,
    available: true,
    featured: false,
    status: 'active'
  },
  {
    id: 'TL-010',
    bank: 'Barclays Arrival',
    lastFour: '9820',
    statementDate: 28,
    utilization: 6,
    age: 4,
    creditLimit: 13000,
    price: 335,
    rating: 4.4,
    available: true,
    featured: false,
    status: 'active'
  },
  {
    id: 'TL-001',
    bank: 'Chase Sapphire',
    lastFour: '4821',
    statementDate: 12,
    utilization: 5,
    age: 6,
    creditLimit: 15000,
    price: 389,
    rating: 4.9,
    available: true,
    featured: true,
    status: 'active'
  },
  {
    id: 'TL-007',
    bank: 'Capital One Venture',
    lastFour: '6405',
    statementDate: 21,
    utilization: 5,
    age: 7,
    creditLimit: 16000,
    price: 430,
    rating: 4.7,
    available: true,
    featured: false,
    status: 'active'
  },
  {
    id: 'TL-002',
    bank: 'Bank of America Cash Rewards',
    lastFour: '9034',
    statementDate: 9,
    utilization: 7,
    age: 4,
    creditLimit: 12000,
    price: 345,
    rating: 4.3,
    available: true,
    featured: false,
    status: 'active'
  },
  {
    id: 'TL-006',
    bank: 'US Bank Altitude',
    lastFour: '1188',
    statementDate: 18,
    utilization: 9,
    age: 2,
    creditLimit: 9000,
    price: 275,
    rating: 4.2,
    available: false,
    featured: false,
    status: 'inactive'
  },
  {
    id: 'TL-004',
    bank: 'Citi Premier',
    lastFour: '7719',
    statementDate: 15,
    utilization: 6,
    age: 3,
    creditLimit: 10000,
    price: 320,
    rating: 4.4,
    available: true,
    featured: false,
    status: 'active'
  }
];

export const TradelineProvider = ({ children }) => {
  const [tradelines, setTradelines] = useState(initialTradelines);
  const [loading, setLoading] = useState(false);

  // Add new tradeline
  const addTradeline = (newTradeline) => {
    const tradelineWithId = {
      ...newTradeline,
      id: `TL-${String(tradelines.length + 1).padStart(3, '0')}`,
      status: 'active'
    };
    setTradelines(prev => [...prev, tradelineWithId]);
  };

  // Update tradeline
  const updateTradeline = (id, updatedData) => {
    setTradelines(prev => 
      prev.map(tradeline => 
        tradeline.id === id 
          ? { ...tradeline, ...updatedData }
          : tradeline
      )
    );
  };

  // Delete tradeline
  const deleteTradeline = (id) => {
    setTradelines(prev => prev.filter(tradeline => tradeline.id !== id));
  };

  // Toggle tradeline availability
  const toggleAvailability = (id) => {
    setTradelines(prev => 
      prev.map(tradeline => 
        tradeline.id === id 
          ? { ...tradeline, available: !tradeline.available, status: tradeline.available ? 'inactive' : 'active' }
          : tradeline
      )
    );
  };

  const value = {
    tradelines,
    loading,
    addTradeline,
    updateTradeline,
    deleteTradeline,
    toggleAvailability,
    setTradelines
  };

  return (
    <TradelineContext.Provider value={value}>
      {children}
    </TradelineContext.Provider>
  );
};

export const useTradelines = () => {
  const context = useContext(TradelineContext);
  if (!context) {
    throw new Error('useTradelines must be used within a TradelineProvider');
  }
  return context;
};
