import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Bot,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Twitter,
  User,
  CheckCircle,
  AlertCircle,
  Send,
  Lightbulb,
  Copy,
} from 'lucide-react';
import { mockTickets } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const priorityColors = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  urgent: 'bg-red-500'
};

const statusColors = {
  open: 'bg-blue-500',
  'in-progress': 'bg-yellow-500',
  resolved: 'bg-green-500',
  closed: 'bg-gray-500'
};

const channelIcons = {
  email: Mail,
  chat: MessageSquare,
  phone: Phone,
  social: Twitter,
  form: User
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const ticket = mockTickets.find(t => t.id === id);
  const [status, setStatus] = useState(ticket?.status || 'open');
  const [priority, setPriority] = useState(ticket?.priority || 'medium');
  const [response, setResponse] = useState('');

  if (!ticket) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Ticket not found</h2>
            <p className="text-muted-foreground mt-2">The ticket you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const ChannelIcon = channelIcons[ticket.channel];

  const handleSendResponse = () => {
    if (!response.trim()) return;
    
    toast({
      title: "Response sent",
      description: "Your response has been sent to the customer.",
    });
    setResponse('');
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as any);
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${newStatus.replace('-', ' ')}.`,
    });
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority as any);
    toast({
      title: "Priority updated",
      description: `Ticket priority changed to ${newPriority}.`,
    });
  };

  const handleUseSuggestion = (suggestion: string) => {
    setResponse(suggestion);
    toast({
      title: "AI suggestion applied",
      description: "The AI suggestion has been added to your response.",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Ticket #{ticket.id}</h1>
            <p className="text-muted-foreground">{ticket.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ChannelIcon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Ticket Details</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${priorityColors[priority as keyof typeof priorityColors]}`} />
                    <Badge variant="secondary" className={`${statusColors[status as keyof typeof statusColors]} text-white`}>
                      {status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{ticket.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Created:</span>
                      <p className="text-muted-foreground">{formatDateTime(ticket.createdAt)}</p>
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>
                      <p className="text-muted-foreground">{formatDateTime(ticket.updatedAt)}</p>
                    </div>
                    <div>
                      <span className="font-medium">Category:</span>
                      <p className="text-muted-foreground capitalize">{ticket.category}</p>
                    </div>
                    <div>
                      <span className="font-medium">Channel:</span>
                      <p className="text-muted-foreground capitalize">{ticket.channel}</p>
                    </div>
                  </div>
                  
                  {ticket.tags.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <span className="font-medium text-sm">Tags:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {ticket.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            {ticket.aiSuggestions && ticket.aiSuggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {ticket.aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm">{suggestion}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUseSuggestion(suggestion)}
                          className="text-xs"
                        >
                          Use
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Response Section */}
            <Card>
              <CardHeader>
                <CardTitle>Send Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your response to the customer..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="min-h-32"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Response will be sent to {ticket.customer.email}
                    </div>
                    <Button onClick={handleSendResponse} disabled={!response.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Response
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ticket.customer.avatar} />
                    <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{ticket.customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{ticket.customer.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assignee */}
            {ticket.assignee && (
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={ticket.assignee.avatar} />
                      <AvatarFallback>{ticket.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{ticket.assignee.name}</h3>
                      <p className="text-sm text-muted-foreground">Support Agent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ticket Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            {(ticket.responseTime || ticket.resolutionTime) && (
              <Card>
                <CardHeader>
                  <CardTitle>Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {ticket.responseTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="text-sm font-medium">{ticket.responseTime}h</span>
                    </div>
                  )}
                  {ticket.resolutionTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Resolution Time</span>
                      <span className="text-sm font-medium">{ticket.resolutionTime}h</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketDetail;