"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  ChevronLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetails() {
  const param = useParams();
  const router = useRouter();
  const [productsDetail, setProductsDetail] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/${param?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
          },
        }
      );
      setProductsDetail(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(productsDetail.rating || "4.5");
    // const hasHalfStar = productsDetail.rating % 1 >= 0.5;
    const hasHalfStar = 4.5 % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="fill-amber-400 text-amber-400 w-4 h-4"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star className="text-gray-200 w-4 h-4" />
          <Star
            className="absolute top-0 left-0 fill-amber-400 text-amber-400 w-4 h-4 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="text-gray-200 w-4 h-4" />
      );
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/product")}
        className="mb-6 hover:bg-transparent hover:text-gray-700 p-0 h-auto"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-50">
            <Image
              src={`http://localhost:5000/${productsDetail.ImageUrl}`}
              alt={"image"}
              className="object-cover"
              fill
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">
                  {productsDetail.company}
                </p>
                <h1 className="text-3xl font-bold mt-1">
                  {productsDetail.name}
                </h1>
              </div>
              <Badge
                variant="outline"
                className="text-lg font-semibold px-3 py-1 border-emerald-200 bg-emerald-50 text-emerald-700"
              >
                ${productsDetail.price}
              </Badge>
            </div>

            <div className="flex items-center mt-2 space-x-2">
              <div className="flex">{renderStars()}</div>
              <span className="text-sm text-gray-500">
                {productsDetail.rating || "4.5"} ({productsDetail.reviews || 10}{" "}
                reviews)
              </span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {
              "Luxury designer purse crafted with premium materials and exquisite attention to detail. This elegant accessory features the iconic Gucci pattern with gold-tone hardware and a versatile chain strap that can be worn on the shoulder or as a crossbody."
            }
          </p>

          <div className="space-y-4">
            {/* <div className="flex items-center">
              <div className="w-24 text-sm font-medium">Availability:</div>
              <div className="flex items-center">
                {product.inStock ? (
                  <>
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium">SKU:</div>
              <div>{product.sku}</div>
            </div> */}
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium">Category:</div>
              <div>{productsDetail.category}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium">Quantity:</div>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-9 w-9 rounded-none"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="w-12 text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-9 w-9 rounded-none"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="flex-1 sm:flex-none" size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Free shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-gray-600" />
              <span className="text-sm">30-day returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-gray-600" />
              <span className="text-sm">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="details"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 data-[state=active]:shadow-none py-3 px-6"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 data-[state=active]:shadow-none py-3 px-6"
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 data-[state=active]:shadow-none py-3 px-6"
          >
            Reviews ({productsDetail.reviews || 10})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">
                Luxury designer purse crafted with premium materials and
                exquisite attention to detail. This elegant accessory features
                the iconic Gucci pattern with gold-tone hardware and a versatile
                chain strap that can be worn on the shoulder or as a crossbody.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This premium designer purse is perfect for both casual outings
                and formal events. The spacious interior provides ample room for
                your essentials, while the secure closure keeps your belongings
                safe.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Specifications</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="text-gray-600">Material</span>
                  <span>Genuine Leather</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="text-gray-600">Dimensions</span>
                  <span>10" x 6" x 3"</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="text-gray-600">Weight</span>
                  <span>1.2 lbs</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="text-gray-600">Color</span>
                  <span>Beige/Brown</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="text-gray-600">Hardware</span>
                  <span>Gold-tone</span>
                </div>
                <div className="grid grid-cols-2 border-b pb-2">
                  <span className="text-gray-600">Closure</span>
                  <span>Magnetic Snap</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="features" className="pt-6">
          <h3 className="text-lg font-medium mb-4">Key Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* {productsDetail.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))} */}
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Dust bag included for storage</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Authenticity card and serial number</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Made in Italy</span>
            </li>
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Customer Reviews</h3>
            <Button>Write a Review</Button>
          </div>

          <div className="space-y-6">
            {/* Sample reviews */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= 5 ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      March 15, 2023
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Verified Purchase
                </Badge>
              </div>
              <p className="text-gray-700 mt-2">
                Absolutely love this purse! The quality is exceptional and it
                looks even better in person. The size is perfect for everyday
                use and the chain strap is comfortable to wear.
              </p>
            </div>

            <div className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                      <Star className="w-4 h-4 text-gray-200" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      February 28, 2023
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Verified Purchase
                </Badge>
              </div>
              <p className="text-gray-700 mt-2">
                Bought this as a gift for my wife and she absolutely loves it.
                The craftsmanship is excellent and the design is timeless. Only
                giving 4 stars because the delivery took longer than expected.
              </p>
            </div>

            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
