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
  console.log(products, "prprprp");

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Product List</h3>
        <input
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={searchHandle}
          placeholder="Search"
        />
      </div>

      {products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <Image
                src={`http://localhost:5000/${item.ImageUrl}`}
                alt={item.name}
                className="w-full h-48 object-cover"
                width={100}
                height={100}
              />
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-600">
                  ${item.price}
                </p>
              </CardContent>
              <CardFooter className="flex justify-around gap-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </button>
                <Link href={`/update/${item._id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Update
                  </button>
                </Link>
                <Link href={`/product/${item._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Purchase
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-gray-500 text-xl">No Results Found</h2>
      )}
    </div>
  );
}
