import { Ticket, User, Analytics, Integration } from '@/types';

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Unable to process payment',
    description: 'Customer is getting an error when trying to complete checkout. Error message: "Payment method declined"',
    status: 'open',
    priority: 'high',
    category: 'billing',
    channel: 'email',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2df3648?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    tags: ['payment', 'checkout', 'urgent'],
    aiSuggestions: [
      'Check if payment method is still valid',
      'Verify billing address matches card details',
      'Suggest alternative payment method'
    ]
  },
  {
    id: '2',
    title: 'Feature request: Dark mode',
    description: 'Would love to have a dark mode option in the dashboard for better user experience during night time work.',
    status: 'in-progress',
    priority: 'medium',
    category: 'product',
    channel: 'chat',
    customer: {
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    assignee: {
      id: 'agent1',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    tags: ['enhancement', 'ui'],
    aiSuggestions: [
      'Add to product roadmap',
      'Estimate development effort',
      'Check user demand for this feature'
    ]
  },
  {
    id: '3',
    title: 'Login issues with SSO',
    description: 'Multiple users reporting they cannot login using single sign-on. Getting timeout errors.',
    status: 'open',
    priority: 'urgent',
    category: 'technical',
    channel: 'phone',
    customer: {
      name: 'David Park',
      email: 'david.park@enterprise.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    assignee: {
      id: 'agent2',
      name: 'James Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-15T08:45:00Z',
    updatedAt: '2024-01-15T11:20:00Z',
    tags: ['sso', 'authentication', 'outage'],
    aiSuggestions: [
      'Check SSO provider status',
      'Verify SSL certificates',
      'Test connection timeout settings'
    ]
  },
  {
    id: '4',
    title: 'Great product, minor suggestion',
    description: 'Love the new update! Just wondering if you could add export functionality to reports.',
    status: 'resolved',
    priority: 'low',
    category: 'feedback',
    channel: 'social',
    customer: {
      name: 'Lisa Thompson',
      email: 'lisa.thompson@startup.io',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face'
    },
    assignee: {
      id: 'agent1',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    createdAt: '2024-01-13T16:30:00Z',
    updatedAt: '2024-01-14T10:45:00Z',
    tags: ['feedback', 'export', 'reports'],
    responseTime: 2.5,
    resolutionTime: 18.25
  }
];

export const mockUsers: User[] = [
  {
    id: 'agent1',
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    department: 'Customer Success',
    status: 'online',
    workload: 8,
    expertise: ['billing', 'product']
  },
  {
    id: 'agent2',
    name: 'James Rodriguez',
    email: 'james.rodriguez@company.com',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    department: 'Technical Support',
    status: 'online',
    workload: 12,
    expertise: ['technical', 'sso', 'integrations']
  },
  {
    id: 'manager1',
    name: 'Alex Kim',
    email: 'alex.kim@company.com',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    department: 'Customer Success',
    status: 'busy',
    workload: 5,
    expertise: ['management', 'escalations']
  },
  {
    id: 'admin1',
    name: 'Sophie Chen',
    email: 'sophie.chen@company.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2df3648?w=32&h=32&fit=crop&crop=face',
    department: 'Operations',
    status: 'online',
    workload: 3,
    expertise: ['admin', 'integrations', 'analytics']
  }
];

export const mockAnalytics: Analytics = {
  totalTickets: 1247,
  openTickets: 23,
  resolvedTickets: 1198,
  avgResponseTime: 2.4,
  avgResolutionTime: 18.6,
  satisfactionScore: 4.7,
  ticketsByCategory: {
    billing: 287,
    technical: 423,
    product: 356,
    feedback: 181
  },
  ticketsByChannel: {
    email: 542,
    chat: 298,
    phone: 187,
    social: 134,
    form: 86
  },
  responseTimeChart: [
    { date: '2024-01-08', time: 3.2 },
    { date: '2024-01-09', time: 2.8 },
    { date: '2024-01-10', time: 2.1 },
    { date: '2024-01-11', time: 2.6 },
    { date: '2024-01-12', time: 2.3 },
    { date: '2024-01-13', time: 2.0 },
    { date: '2024-01-14', time: 2.4 },
    { date: '2024-01-15', time: 2.4 }
  ],
  volumeChart: [
    { date: '2024-01-08', tickets: 45 },
    { date: '2024-01-09', tickets: 52 },
    { date: '2024-01-10', tickets: 38 },
    { date: '2024-01-11', tickets: 61 },
    { date: '2024-01-12', tickets: 48 },
    { date: '2024-01-13', tickets: 33 },
    { date: '2024-01-14', tickets: 44 },
    { date: '2024-01-15', tickets: 28 }
  ]
};

export const mockIntegrations: Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    type: 'email',
    status: 'connected',
    lastSync: '2024-01-15T11:30:00Z',
    settings: { inbox: 'support@company.com' }
  },
  {
    id: 'slack',
    name: 'Slack',
    type: 'chat',
    status: 'connected',
    lastSync: '2024-01-15T11:25:00Z',
    settings: { channel: '#customer-support' }
  },
  {
    id: 'twitter',
    name: 'Twitter',
    type: 'social',
    status: 'connected',
    lastSync: '2024-01-15T11:20:00Z',
    settings: { handle: '@company' }
  },
  {
    id: 'jira',
    name: 'Jira',
    type: 'ticketing',
    status: 'connected',
    lastSync: '2024-01-15T11:15:00Z',
    settings: { project: 'SUPPORT' }
  },
  {
    id: 'outlook',
    name: 'Outlook',
    type: 'email',
    status: 'disconnected',
    settings: {}
  }
];