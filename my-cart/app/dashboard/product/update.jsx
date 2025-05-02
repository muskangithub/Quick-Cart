"use client"
import React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from 'sonner';
import { Loader2 } from "lucide-react"

export default function UpdateProductSheet({ productId, triggerButton }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [company, setCompany] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (open && productId) {
      getProductDetails()
    }
  }, [open, productId])

  const getProductDetails = async () => {
    try {
      setIsFetching(true)
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to view product details",
          variant: "destructive",
        })
        return
      }

      const response = await axios.get(`http://localhost:5000/product/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(token)}`,
        },
      })

      const result = response.data
      setName(result.name)
      setPrice(result.price)
      setCategory(result.category)
      setCompany(result.company)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product details",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }

  const updateProduct = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to update products",
          variant: "destructive",
        })
        return
      }

      const productData = {
        name,
        price,
        category,
        company,
      }

      await axios.put(`http://localhost:5000/product/${productId}`, JSON.stringify(productData), {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(token)}`,
        },
      })

      toast.success("Product updated successfully")
      setOpen(false)
    window.location.reload()
    } catch (error) {
      toast.error("Failed to update product")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{triggerButton || <Button variant="outline">Edit Product</Button>}</SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Update Product</SheetTitle>
          <SheetDescription>Make changes to your product here. Click save when you're done.</SheetDescription>
        </SheetHeader>

        {isFetching ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                type="text"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter product category"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter product company"
              />
            </div>
          </div>
        )}

        <SheetFooter>
          <Button onClick={updateProduct} disabled={isLoading || isFetching} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
