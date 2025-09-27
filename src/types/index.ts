export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'billing' | 'technical' | 'product' | 'feedback';
  channel: 'email' | 'chat' | 'phone' | 'social' | 'form';
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  aiSuggestions?: string[];
  responseTime?: number;
  resolutionTime?: number;
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