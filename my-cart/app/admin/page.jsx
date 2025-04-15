"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = {
        name,
        password,
        type,
        status,
        email,
        date: new Date(),
      };

      const response = await axios.post(
        "http://localhost:5000/add-admin",
        JSON.stringify(user),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = response.data;
      console.log(result);
      localStorage.setItem("type", JSON.stringify(result.type));
      localStorage.setItem("token", JSON.stringify(result.auth));
 toast.success("Admin added successfully");

      router.push("/admin/list");
    } catch (error) {
      console.error(error);
       toast.error("Failed to add admin. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4 md:p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Add Admin</CardTitle>
          <CardDescription>Create a new administrator account</CardDescription>
        </CardHeader>
        <form onSubmit={handleAddAdmin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="BLOCK">BLOCK</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Admin Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select admin type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="SUBADMIN">SUBADMIN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Admin"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
