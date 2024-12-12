"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ImprovedRegistrationForm() {
  const [role, setRole] = useState("teacher");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ password: "", confirmPassword: "" });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError({ ...error, password: "Must be atleast 8 charachers" });
      return;
    }

    if (password !== confirmPassword) {
      setError({ ...error, confirmPassword: "Passowords do not match" });
      return;
    }

    setError({ password: "", confirmPassword: "" });

    // Add logic to send data to the endpoint

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loginId: username,
        password: password,
        role: role,
      }),
    });

    const resData = await response.json();
    if (resData.flag === false) {
      alert("User Already Exists, Try loggin in");
      router.push("/login");
    } else if (resData.flag === true) {
      alert("User created succesfully , try loggin In");
      router.push("/login");
    } else {
      alert("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              Register
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10"
                    placeholder="Enter your username"
                  />
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error.password && (
                  <p className="text-sm text-destructive">{error.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10"
                    placeholder="Confirm your password"
                  />
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                </div>
                {error.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {error.confirmPassword}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" onClick={handleRegister}>
              Register
              <CheckCircle className="ml-2" size={18} />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
