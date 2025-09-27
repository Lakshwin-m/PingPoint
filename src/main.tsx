import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

// Get Clerk publishable key or use a default test key
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xpZW50LWJlYXZlci05Mi5jbGVyay5hY2NvdW50cy5kZXYk";

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={publishableKey}>
    <App />
  </ClerkProvider>
);
