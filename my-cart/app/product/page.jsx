"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { Search, ShoppingCart, Heart, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product", {
        headers: {
          "Content-Type": "application/json",
          // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error,"error")
      toast.error("Failed to fetch products");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      toast.success("Product deleted");
      getProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      try {
        const response = await axios.get(
          `http://localhost:5000/search/${key}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        toast.error("Search failed");
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Product Collection</h1>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search products..."
            className="pl-10 w-full"
            onChange={searchHandle}
            type="text"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
              <Image
                src={`http://localhost:5000/${product.ImageUrl}`}
                alt={product.name}
                className="object-cover transition-transform duration-300 hover:scale-105"
                fill
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
              >
                <Heart className="h-5 w-5 text-gray-600 hover:text-rose-500" />
              </Button>
            </div>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {product.brand}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="font-semibold text-emerald-600 border-emerald-200 bg-emerald-50"
                >
                  ${product.price}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              <Link href={`/product/${product._id}`}>
                <Button variant="default" className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Purchase
                </Button>
              </Link>

              <Link href={`/update/${product._id}`}>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => deleteProduct(product._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
