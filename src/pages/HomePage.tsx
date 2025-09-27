
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, MessageSquare, Zap, Shield, BarChart3, Users, Clock, CheckCircle } from "lucide-react"
import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Homepage() {
  const navigate = useNavigate();

  // Handler for sign in
  const handleSignIn = async () => {
    // You can use your preferred auth method here
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) {
        if (error.message?.includes("provider is not enabled")) {
          alert("Google sign-in is not enabled. Please enable the provider in your Supabase project or use another sign-in method.");
        } else {
          alert("Sign in failed: " + error.message);
        }
        return;
      }
      // The redirect will happen automatically if using OAuth
    } catch (err) {
      alert("Sign in failed");
    }
  };

  // Check if authenticated and redirect to dashboard
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, []);

  const handleGetStarted = async () => {
    // Check if user is authenticated
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">SupportAI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                Solutions
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={handleGetStarted}>
                Sign In
              </Button>
             
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-foreground leading-tight text-balance">
                Intelligent customer support
                <span className="block text-muted-foreground">meets human empathy</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
                Transform your customer service with AI-powered automation that understands context, learns from
                interactions, and delivers personalized support at scale.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3" onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-light text-foreground">85%</div>
              <div className="text-muted-foreground">Faster response times</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-foreground">24/7</div>
              <div className="text-muted-foreground">Automated support</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-light text-foreground">95%</div>
              <div className="text-muted-foreground">Customer satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground text-balance">
              Redefine customer experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our AI understands context, learns from every interaction, and provides solutions that feel genuinely
              human.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-border bg-card hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-card-foreground">Instant Resolution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered responses that understand context and provide accurate solutions in seconds, not hours.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-border bg-card hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-card-foreground">Smart Escalation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seamlessly hand off complex issues to human agents with full context and conversation history.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-border bg-card hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-card-foreground">Analytics & Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deep insights into customer behavior, satisfaction metrics, and performance optimization
                  opportunities.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-border bg-card hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-card-foreground">Multi-Channel Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Consistent experience across email, chat, social media, and phone with unified customer profiles.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-border bg-card hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-card-foreground">24/7 Availability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Never miss a customer inquiry with round-the-clock automated support that learns and improves
                  continuously.
                </p>
              </div>
            </Card>

            <Card className="p-8 border-border bg-card hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-card-foreground">Easy Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Plug into your existing tools and workflows with minimal setup. Works with popular CRM and helpdesk
                  platforms.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-light text-balance">Ready to transform your customer support?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto text-pretty">
              Join thousands of companies already using SupportAI to deliver exceptional customer experiences at scale.
            </p>
            <div className="flex justify-center items-center">
              <Button size="lg" variant="secondary" className="px-8 py-3" onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">SupportAI</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Intelligent customer support automation that combines AI efficiency with human empathy.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Integrations
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  API
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Status
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© 2025 SupportAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
