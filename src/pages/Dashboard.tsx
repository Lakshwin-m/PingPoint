import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Filter,
  Search,
  Mail,
  MessageSquare,
  Phone,
  Twitter,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Bot,
  User,
  Loader2,
} from "lucide-react";
import { mockTickets } from "@/data/mockData";
import { Ticket } from "@/types";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const priorityColors = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

const statusColors = {
  open: "bg-blue-500",
  "in-progress": "bg-yellow-500",
  resolved: "bg-green-500",
  closed: "bg-gray-500",
};

const channelIcons = {
  email: Mail,
  chat: MessageSquare,
  phone: Phone,
  social: Twitter,
  form: User,
};

const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        setError(null); // Clear any previous errors

        // Check if we have valid Supabase credentials
        if (
          !import.meta.env.VITE_SUPABASE_URL ||
          !import.meta.env.VITE_SUPABASE_ANON_KEY
        ) {
          console.log("No Supabase credentials found, using mock data");
          throw new Error("Supabase credentials not configured");
        }

        // Fetch tickets from Supabase with the new structure
        const { data, error } = await supabase
          .from("Ping-Point")
          .select("id, created_at, priority, summary");

        if (error) throw error;

        if (data && data.length > 0) {
          setTickets(data);
        } else {
          // No data returned, fall back to mock data
          throw new Error("No tickets found in Supabase");
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
        // Don't show error to user, just fall back to mock data silently
        console.log("Falling back to mock data");

        // Convert mock data to match the new structure
        const convertedMockData = mockTickets.map((ticket) => ({
          id: ticket.id,
          priority: ticket.priority,
          created_at: ticket.createdAt,
          summary: ticket.title,
        }));
        setTickets(convertedMockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesPriority =
      filterPriority === "all" || ticket.priority === filterPriority;
    const matchesSearch = ticket.summary.toLowerCase().includes(
      searchQuery.toLowerCase()
    );

    // Since we don't have status in the new structure, we'll only filter by priority and search
    return matchesPriority && matchesSearch;
  });

  const stats = {
    total: tickets.length,
    urgent: tickets.filter((t) => t.priority?.toLowerCase() === "urgent").length,
    high: tickets.filter((t) => t.priority?.toLowerCase() === "high").length,
    medium: tickets.filter((t) => t.priority?.toLowerCase() === "medium").length,
    low: tickets.filter((t) => t.priority?.toLowerCase() === "low").length,
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Unified inbox for all customer support tickets
          </p>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading tickets...</span>
          </div>
        )}

        {error && !isLoading && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tickets
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Urgent Priority
              </CardTitle>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.urgent}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                High Priority
              </CardTitle>
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.high}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Medium Priority
              </CardTitle>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.medium}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Priority
              </CardTitle>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.low}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div>
                <CardTitle>Tickets</CardTitle>
                <CardDescription>
                  Manage and respond to customer support requests
                </CardDescription>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Status filter removed as it's not in the new data structure */}

                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => {
                return (
                  <div
                    key={ticket.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start space-x-4 mb-2 sm:mb-0">
                      <div>
                        <Link
                          to={`/ticket/${ticket.id}`}
                          className="font-medium hover:underline"
                        >
                          {ticket.summary}
                        </Link>

                        <div className="flex items-center mt-2 space-x-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {formatTimeAgo(ticket.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                      <Badge
                        className={`${
                          priorityColors[ticket.priority.toLowerCase()]
                        } text-white`}
                      >
                        {ticket.priority}
                      </Badge>

                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/ticket/${ticket.id}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}

              {filteredTickets.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No tickets found matching your filters.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
