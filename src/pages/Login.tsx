import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/shadcn/card";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/userLogin"; // Adjust the path as needed
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const { user, login, checkLogin } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const location = useLocation();

  useEffect(() => {
    checkLogin(); // Check login status when component mounts
  }, [checkLogin]);

  useEffect(() => {
    // If the user is already logged in, redirect them to the /mapwork route
    if (user) {
      navigate("/mapwork", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = () => {
    if (username !== "" && password !== "") {
      login(username, password);
    } else {
      console.log("Please enter both username and password.");
    }
  };

  return (

    <>
      <div className="container mx-50 mt-10">
        <div className="flex flex-wrap gap-8">
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your username and password to access the mapwork page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
  </div>
  </>
  );
};

export default LoginPage;
