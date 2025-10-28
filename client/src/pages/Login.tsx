import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCog, Wrench } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<"Supervisor" | "Operator" | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: remove mock functionality - implement real authentication
    console.log("Login attempted", { username, password, role: selectedRole });
    localStorage.setItem("userRole", selectedRole || "");
    localStorage.setItem("userName", username || "User");
    setLocation("/dashboard");
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Digital Shift Handover</CardTitle>
            <CardDescription>Select your role to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-2"
              onClick={() => setSelectedRole("Supervisor")}
              data-testid="button-role-supervisor"
            >
              <UserCog className="h-8 w-8 text-primary" />
              <span className="text-lg font-medium">Supervisor</span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-2"
              onClick={() => setSelectedRole("Operator")}
              data-testid="button-role-operator"
            >
              <Wrench className="h-8 w-8 text-primary" />
              <span className="text-lg font-medium">Operator</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Logging in as {selectedRole}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-testid="input-username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedRole(null)}
                data-testid="button-back"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                data-testid="button-login"
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
