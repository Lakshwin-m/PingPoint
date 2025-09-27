import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Star,
  MessageSquare,
  Mail,
  Phone,
  Twitter,
  User,
} from 'lucide-react';
import { mockAnalytics } from '@/data/mockData';

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];

const Analytics = () => {
  const analytics = mockAnalytics;

  const categoryData = Object.entries(analytics.ticketsByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const channelData = Object.entries(analytics.ticketsByChannel).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const channelIcons = {
    Email: Mail,
    Chat: MessageSquare,
    Phone: Phone,
    Social: Twitter,
    Form: User,
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Performance metrics and insights for customer support</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.avgResponseTime}h</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                12% improvement from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.avgResolutionTime}h</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                8% improvement from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.satisfactionScore}/5.0</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                0.3 increase from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((analytics.resolvedTickets / analytics.totalTickets) * 100)}%
              </div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                5% increase from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Response Time Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Trend</CardTitle>
                  <CardDescription>Average response time over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.responseTimeChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value) => [`${value}h`, 'Response Time']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="time" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Ticket Volume */}
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Volume</CardTitle>
                  <CardDescription>Number of tickets received daily</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.volumeChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value) => [`${value}`, 'Tickets']}
                      />
                      <Bar 
                        dataKey="tickets" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tickets by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Tickets by Category</CardTitle>
                  <CardDescription>Distribution of tickets across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}`, 'Tickets']} />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {categoryData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm">{entry.name}</span>
                          <span className="text-sm font-medium ml-auto">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Priority Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Priority Distribution</CardTitle>
                  <CardDescription>Current open tickets by priority level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="text-sm">Urgent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">3</span>
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: '15%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500" />
                          <span className="text-sm">High</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">8</span>
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '40%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <span className="text-sm">Medium</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">9</span>
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '45%' }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="text-sm">Low</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">3</span>
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '15%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Channel Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Volume</CardTitle>
                  <CardDescription>Tickets received by channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channelData.map((channel, index) => {
                      const Icon = channelIcons[channel.name as keyof typeof channelIcons];
                      const percentage = Math.round((channel.value / analytics.totalTickets) * 100);
                      
                      return (
                        <div key={channel.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{channel.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{channel.value}</span>
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Channel Efficiency */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Efficiency</CardTitle>
                  <CardDescription>Average resolution time by channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Chat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">12.4h</span>
                        <Badge variant="secondary" className="bg-green-500 text-white">Fastest</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Phone</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">15.8h</span>
                        <Badge variant="outline">Good</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">18.6h</span>
                        <Badge variant="outline">Average</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Twitter className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Social</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">22.1h</span>
                        <Badge variant="secondary" className="bg-yellow-500 text-white">Slow</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Form</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">24.3h</span>
                        <Badge variant="secondary" className="bg-yellow-500 text-white">Slow</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;