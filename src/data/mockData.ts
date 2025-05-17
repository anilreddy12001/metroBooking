import { Station, TicketType, Transaction, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  walletBalance: 120.50
};

export const mockStations: Station[] = [
  { id: '1', name: 'Central Station', lines: ['Red', 'Blue'] },
  { id: '2', name: 'Riverside', lines: ['Red', 'Green'] },
  { id: '3', name: 'Market Square', lines: ['Blue'] },
  { id: '4', name: 'Tech District', lines: ['Green', 'Yellow'] },
  { id: '5', name: 'Harbor View', lines: ['Yellow'] },
  { id: '6', name: 'Westside Mall', lines: ['Red', 'Yellow'] },
  { id: '7', name: 'University', lines: ['Green', 'Blue'] },
  { id: '8', name: 'Airport Terminal', lines: ['Express', 'Blue'] },
];

export const mockTicketTypes: TicketType[] = [
  {
    id: '1',
    name: 'Single Journey',
    description: 'Valid for one journey between two stations',
    price: 2.50,
    validity: '2 hours'
  },
  {
    id: '2',
    name: 'Day Pass',
    description: 'Unlimited travel for the entire day',
    price: 8.00,
    validity: '24 hours'
  },
  {
    id: '3',
    name: 'Weekly Pass',
    description: 'Unlimited travel for 7 days',
    price: 35.00,
    validity: '7 days'
  },
  {
    id: '4',
    name: 'Monthly Pass',
    description: 'Unlimited travel for 30 days',
    price: 120.00,
    validity: '30 days'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'RECHARGE',
    amount: 50.00,
    description: 'Wallet recharge',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    id: '2',
    type: 'PURCHASE',
    amount: -2.50,
    description: 'Single journey ticket: Central Station to Riverside',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    id: '3',
    type: 'PURCHASE',
    amount: -8.00,
    description: 'Day Pass',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    id: '4',
    type: 'REFUND',
    amount: 2.50,
    description: 'Refund: Cancelled ticket',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

export const calculateFare = (originId: string, destinationId: string): number => {
  // Simple fare calculation based on station IDs
  // In a real app, this would be more complex based on zones, distance, etc.
  const diff = Math.abs(parseInt(originId) - parseInt(destinationId));
  return Math.max(2.50, diff * 0.75);
};