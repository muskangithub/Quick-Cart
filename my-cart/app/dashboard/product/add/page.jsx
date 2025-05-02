"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, X, Upload, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function AddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [company, setCompany] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [feature, setFeature] = useState("")
  const [features, setFeatures] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const router = useRouter()

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Toys & Games",
    "Beauty & Personal Care",
    "Sports & Outdoors",
  ]

  const handleAddFeature = () => {
    if (feature.trim()) {
      setFeatures([...features, feature.trim()])
      setFeature("")
    }
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features]
    updatedFeatures.splice(index, 1)
    setFeatures(updatedFeatures)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server and get a URL back
      // For now, we'll just create a local preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        // In a real implementation, you would set imageUrl to the URL returned from your server
        setImageUrl(file) // Placeholder
      }
      reader.readAsDataURL(file)
    }
  }

const handleAddProduct = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("category", category)
    formData.append("company", company)
    formData.append("description", description)
    formData.append("type", "USER")
    formData.append("userId", "current-user-id")
    formData.append("features", JSON.stringify(features))

    if (imageUrl instanceof File) {
      formData.append("ImageUrl", imageUrl) // Match the backend field name
    } else if (typeof imageUrl === "string") {
      formData.append("ImageUrl", imageUrl) // In case you're providing a direct URL
    }

    const response = await axios.post("http://localhost:5000/add-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    toast.success("Product added successfully")
    // router.push("/admin/products")
  } catch (error) {
    toast.error("Failed to add product. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}



  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 border-b">
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
          <CardDescription>Fill in the details to add a new product to your inventory</CardDescription>
        </CardHeader>
        <form onSubmit={handleAddProduct}>
          <Tabs defaultValue="basic" className="w-full">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Details & Features</TabsTrigger>
                <TabsTrigger value="image">Product Image</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="basic" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="font-medium">
                    Price
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      required
                      className="pl-8 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-medium">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category" className="h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="font-medium">
                    Company/Brand
                  </Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter company or brand name"
                    required
                    className="h-11"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium">
                    Product Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter detailed product description..."
                    className="min-h-32 resize-y"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label className="font-medium">Product Features</Label>
                  <div className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => setFeature(e.target.value)}
                      placeholder="Add a product feature"
                      className="flex-1 h-11"
                    />
                    <Button type="button" onClick={handleAddFeature} className="flex-shrink-0">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {features.length > 0 && (
                    <div className="bg-slate-50 p-4 rounded-md border">
                      <h4 className="text-sm font-medium mb-2 text-slate-500">Added Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {features.map((feat, index) => (
                          <Badge key={index} variant="secondary" className="pl-3 pr-2 py-1.5 flex items-center gap-1">
                            {feat}
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="ml-1 text-slate-500 hover:text-slate-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="image" className="p-6">
              <div className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-slate-50">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-lg">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Product preview"
                          className="h-64 w-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImagePreview(null)
                          setImageUrl('')
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-slate-700 font-medium">Upload Product Image</h3>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto">
                          Drag and drop your image here, or click to browse
                        </p>
                      </div>
                      <div>
                        <label htmlFor="image-upload">
                          <div className="inline-flex items-center justify-center px-4 py-2 bg-slate-100 text-slate-700 rounded-md cursor-pointer hover:bg-slate-200 transition-colors">
                            <Upload className="h-4 w-4 mr-2" />
                            Browse Files
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-2" />

          <CardFooter className="flex justify-end gap-2 p-6 bg-slate-50">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
