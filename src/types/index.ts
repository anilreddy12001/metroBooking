export interface User {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
}

export interface Station {
  id: string;
  name: string;
  lines: string[];
}

export interface Route {
  id: string;
  origin: Station;
  destination: Station;
  distance: number;
  estimatedTime: number;
  fare: number;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  validity: string;
}

export interface Ticket {
  id: string;
  route: Route;
  type: TicketType;
  purchaseDate: Date;
  validUntil: Date;
  price: number;
}

export interface Transaction {
  id: string;
  type: 'PURCHASE' | 'RECHARGE' | 'REFUND';
  amount: number;
  description: string;
  timestamp: Date;
  ticket?: Ticket;
}