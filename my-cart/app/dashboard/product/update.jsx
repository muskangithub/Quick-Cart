"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, X, Upload, ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

export default function UpdateProductSheet({ product, setOpen }) {
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [category, setCategory] = useState(product.category)
  const [company, setCompany] = useState(product.company)
  const [description, setDescription] = useState(product.description || "")
  const [features, setFeatures] = useState(product.features || [])
  const [feature, setFeature] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState(product.imageUrl || null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddFeature = () => {
    if (feature.trim()) {
      setFeatures([...features, feature.trim()])
      setFeature("")
    }
  }

  const handleRemoveFeature = (index) => {
    const updated = [...features]
    updated.splice(index, 1)
    setFeatures(updated)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setImageUrl(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const updateProduct = async () => {
    setIsLoading(true)
    try {
      const user = localStorage.getItem("user")
      const stored_user=JSON.parse(user)
      if (!Object.keys(stored_user).length) {
        toast.error("You must be logged in")
        return
      }

      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("company", company)
      formData.append("description", description)
      formData.append("features", JSON.stringify(features))

      if (imageUrl instanceof File) {
        formData.append("ImageUrl", imageUrl)
      }

      await axios.put(`http://localhost:5000/product/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `bearer ${JSON.parse(token)}`
        }
      })

      toast.success("Product updated")
      setOpen(false)
      window.location.reload()
    } catch (error) {
      toast.error("Update failed")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SheetContent className="sm:max-w-lg overflow-y-auto px-2">
      <SheetHeader>
        <SheetTitle>Update Product</SheetTitle>
        <SheetDescription>Edit and save product details.</SheetDescription>
      </SheetHeader>

      <Tabs defaultValue="basic" className="mt-4">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="grid gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
        </TabsContent>

        <TabsContent value="details" className="grid gap-4">
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                placeholder="Add feature"
              />
              <Button type="button" onClick={handleAddFeature}>
                <PlusCircle className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {features.map((feat, index) => (
                  <Badge key={index} variant="secondary" className="pl-3 pr-2 py-1.5 flex items-center gap-1">
                    {feat}
                    <button type="button" onClick={() => handleRemoveFeature(index)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          {imagePreview ? (
            <div className="space-y-2">
              <img src={imagePreview} alt="Preview" className="rounded-lg w-full h-48 object-cover" />
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setImagePreview(null)
                  setImageUrl("")
                }}
              >
                Remove Image
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <ImageIcon className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-sm text-muted-foreground">Upload new image</p>
              <label htmlFor="update-image-upload">
                <div className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Browse
                </div>
                <input
                  id="update-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <SheetFooter className="mt-6">
        <Button onClick={updateProduct} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
