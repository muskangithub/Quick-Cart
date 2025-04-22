"use client";

import {
  ArrowLeft,
  CreditCard,
  Download,
  MoreHorizontal,
  Search,
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
import { Badge } from "@/components/ui/badge";

export function PaymentsPanel() {
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
          <h1 className="text-xl font-semibold">Payments</h1>
          <p className="text-sm text-muted-foreground">
            View and manage payment transactions.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="p-4 md:p-6 flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View all transactions and payment details.
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Completed"
                            ? "default"
                            : payment.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{payment.method}</span>
                      </div>
                    </TableCell>
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
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Send receipt</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Refund payment</DropdownMenuItem>
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
const payments = [
  {
    id: "TRX-38291",
    date: "Apr 22, 2023",
    customer: "John Smith",
    amount: "129.99",
    status: "Completed",
    method: "Visa ending in 4242",
  },
  {
    id: "TRX-38292",
    date: "Apr 21, 2023",
    customer: "Sarah Johnson",
    amount: "79.99",
    status: "Completed",
    method: "Mastercard ending in 5555",
  },
  {
    id: "TRX-38293",
    date: "Apr 20, 2023",
    customer: "Michael Brown",
    amount: "249.99",
    status: "Pending",
    method: "PayPal",
  },
  {
    id: "TRX-38294",
    date: "Apr 19, 2023",
    customer: "Emily Davis",
    amount: "349.99",
    status: "Completed",
    method: "Visa ending in 1234",
  },
  {
    id: "TRX-38295",
    date: "Apr 18, 2023",
    customer: "Robert Wilson",
    amount: "199.99",
    status: "Failed",
    method: "Mastercard ending in 9876",
  },
  {
    id: "TRX-38296",
    date: "Apr 17, 2023",
    customer: "Jennifer Taylor",
    amount: "59.99",
    status: "Completed",
    method: "American Express ending in 3782",
  },
];
