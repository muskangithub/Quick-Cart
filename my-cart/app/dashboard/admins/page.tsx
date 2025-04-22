"use client";

import { useState } from "react";
import {
  ArrowLeft,
  MoreHorizontal,
  Search,
  Trash,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminsPanel() {
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);

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
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
                <DialogDescription>
                  Create a new admin user with specific permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddAdminOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddAdminOpen(false)}>
                  Create Admin
                </Button>
              </DialogFooter>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={admin.avatar || "/placeholder.svg"}
                            alt={admin.name}
                          />
                          <AvatarFallback>
                            {admin.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{admin.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          admin.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{admin.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit details</DropdownMenuItem>
                          <DropdownMenuItem>
                            Change permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>Reset password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete admin</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Sample Data
const adminUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "Just now",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "Yesterday",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Lisa Wong",
    email: "lisa.wong@example.com",
    role: "Admin",
    status: "Inactive",
    lastActive: "2 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Alex Brown",
    email: "alex.brown@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "3 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
