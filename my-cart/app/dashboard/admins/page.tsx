"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { ArrowLeft, Search, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminTable from "./admin-table";

export default function AdminsPanel() {
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
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
      localStorage.setItem("type", JSON.stringify(result.type));
      localStorage.setItem("token", JSON.stringify(result.auth));
      toast.success("Admin added successfully");

      getAdmins();
    } catch (error) {
      toast.error("Failed to add admin. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin", {
        headers: {
          "Content-Type": "application/json",
          // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
      });
      setAdmins(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };
  const deleteAdmin = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${id}`);
      toast.success("Admin deleted");
      getAdmins();
    } catch (error) {
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center p-4 border-b md:p-6">
        <Link href="/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Manage Admins</h1>
          <p className="text-sm text-muted-foreground">
            Add, edit, or remove admin users from your system.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle></DialogTitle>
              <div className="flex justify-center items-center p-4 md:p-6">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="text-2xl">Add Admin</CardTitle>
                    <CardDescription>
                      Create a new administrator account
                    </CardDescription>
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
                        <Select
                          value={status}
                          onValueChange={setStatus}
                          required
                        >
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
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Adding..." : "Add Admin"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="p-4 md:p-6 flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>
                Manage your admin team members and their permissions.
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search admins..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AdminTable admins={admins} deleteAdmin={deleteAdmin} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
