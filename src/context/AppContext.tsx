import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Station, TicketType, Transaction, User } from '../types';
import { mockUser, mockStations, mockTicketTypes, mockTransactions, calculateFare } from '../data/mockData';

interface AppContextType {
  user: User;
  stations: Station[];
  ticketTypes: TicketType[];
  transactions: Transaction[];
  selectedOrigin: Station | null;
  selectedDestination: Station | null;
  selectedTicketType: TicketType | null;
  setSelectedOrigin: (station: Station | null) => void;
  setSelectedDestination: (station: Station | null) => void;
  setSelectedTicketType: (ticketType: TicketType | null) => void;
  calculateTicketPrice: () => number;
  purchaseTicket: () => void;
  clearSelections: () => void;
  addFunds: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockUser);
  const [stations] = useState<Station[]>(mockStations);
  const [ticketTypes] = useState<TicketType[]>(mockTicketTypes);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [selectedOrigin, setSelectedOrigin] = useState<Station | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Station | null>(null);
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);

  const calculateTicketPrice = (): number => {
    if (!selectedOrigin || !selectedDestination || !selectedTicketType) {
      return 0;
    }

    if (selectedTicketType.id === '1') {  // Single journey
      return calculateFare(selectedOrigin.id, selectedDestination.id);
    }
    
    return selectedTicketType.price;
  };

  const purchaseTicket = () => {
    const price = calculateTicketPrice();
    
    if (price <= 0 || price > user.walletBalance) {
      return;
    }

    // Update wallet balance
    setUser({
      ...user,
      walletBalance: user.walletBalance - price
    });

    // Add transaction
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'PURCHASE',
      amount: -price,
      description: selectedTicketType?.id === '1' 
        ? `Single journey: ${selectedOrigin?.name} to ${selectedDestination?.name}`
        : `${selectedTicketType?.name}`,
      timestamp: new Date()
    };

    setTransactions([newTransaction, ...transactions]);
    clearSelections();
  };

  const clearSelections = () => {
    setSelectedOrigin(null);
    setSelectedDestination(null);
    setSelectedTicketType(null);
  };

  const addFunds = (amount: number) => {
    if (amount <= 0) return;

    // Update wallet balance
    setUser({
      ...user,
      walletBalance: user.walletBalance + amount
    });

    // Add transaction
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'RECHARGE',
      amount: amount,
      description: 'Wallet recharge',
      timestamp: new Date()
    };

    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        stations,
        ticketTypes,
        transactions,
        selectedOrigin,
        selectedDestination,
        selectedTicketType,
        setSelectedOrigin,
        setSelectedDestination,
        setSelectedTicketType,
        calculateTicketPrice,
        purchaseTicket,
        clearSelections,
        addFunds
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};