"use client";

import { useState } from "react";
import { ArrowLeft, MoreHorizontal, Plus, Search, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductsPanel() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

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
          <h1 className="text-xl font-semibold">Manage Products</h1>
          <p className="text-sm text-muted-foreground">
            Add, edit, or remove products from your store.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Create a new product to add to your store.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="product-name"
                    placeholder="Product name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="product-price"
                    type="number"
                    placeholder="0.00"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label
                    htmlFor="product-description"
                    className="text-right pt-2"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="product-description"
                    placeholder="Product description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-stock" className="text-right">
                    Stock
                  </Label>
                  <Input
                    id="product-stock"
                    type="number"
                    placeholder="0"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="product-image"
                    type="file"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddProductOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsAddProductOpen(false)}>
                  Add Product
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
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your store products and inventory.
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 relative rounded overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "In Stock"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {product.status}
                      </Badge>
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
                          <DropdownMenuItem>Edit product</DropdownMenuItem>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete product</span>
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
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life",
    category: 'Electronics",s',
    price: "129.99",
    stock: 45,
    status: "In Stock",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    description: "Advanced smartwatch with health monitoring and GPS",
    category: "Electronics",
    price: "299.99",
    stock: 28,
    status: "In Stock",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: 'Laptop Pro 16"',
    description:
      "Powerful laptop with high-performance processor and dedicated graphics",
    category: "Electronics",
    price: "1899.99",
    stock: 5,
    status: "Low Stock",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 360° sound",
    category: "Electronics",
    price: "79.99",
    stock: 62,
    status: "In Stock",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    description: "Adjustable office chair with lumbar support",
    category: "Home & Kitchen",
    price: "249.99",
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=48&width=48",
  },
];
