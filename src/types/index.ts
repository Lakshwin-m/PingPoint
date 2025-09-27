export interface Ticket {
  ID: string;
  PRIORITY: 'low' | 'medium' | 'high' | 'urgent';
  CREATEDAT: string;
  SUMMARY: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'manager';
  avatar?: string;
  department: string;
  status: 'online' | 'offline' | 'busy';
  workload: number;
  expertise: string[];
}

export interface Analytics {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResponseTime: number;
  avgResolutionTime: number;
  satisfactionScore: number;
  ticketsByCategory: Record<string, number>;
  ticketsByChannel: Record<string, number>;
  responseTimeChart: Array<{ date: string; time: number }>;
  volumeChart: Array<{ date: string; tickets: number }>;
}

export interface Integration {
  id: string;
  name: string;
  type: 'email' | 'chat' | 'social' | 'ticketing';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  settings: Record<string, any>;
}