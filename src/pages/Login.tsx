import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Bot } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  // Use Clerk's openSignIn instead of custom login form
  const handleLogin = () => {
    openSignIn();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Bot className="h-12 w-12 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Ping Point</h1>
            <p className="text-white/80">Smart Customer Support Automation</p>
          </div>
        </div>

        {/* Clerk SignIn Component */}
        <Card className="backdrop-blur-sm bg-white/95 border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Sign in
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleLogin} className="w-full">
              Sign in
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
