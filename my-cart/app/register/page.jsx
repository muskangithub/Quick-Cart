"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserIcon, KeyIcon, MailIcon, GraduationCapIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [city, setCity] = useState("")
  const [mobile, setMobile] = useState("")
  const [citymobile, setCitymobile] = useState("India (+91)")
  const [edu, setEdu] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const collectData = async () => {
    if (!name || !email || !password || !city || !edu || !mobile) {
      alert("Please fill all required fields")
      return
    }

    setIsLoading(true)

    try {
      console.log(name, email, password)
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({
          name,
          email,
          password,
          city,
          edu,
          citymobile,
          mobile,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      result = await result.json()
      console.log(result)

      if (result.name) {
        const test = result.email
        if (!test.includes("@gmail.com")) {
          alert("Email must contain @gmail.com")
        } else {
          localStorage.setItem("user", JSON.stringify(result))
          router.push("/login")
        }
      } else {
        alert("That email already exists!")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">Enter your information to register</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <UserIcon className="h-5 w-5" />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MailIcon className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <KeyIcon className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education Level</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                  <GraduationCapIcon className="h-5 w-5" />
                </div>
                <Select value={edu} onValueChange={setEdu}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select Education Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select_edu">--Select Highest Education Level--</SelectItem>
                    <SelectItem value="6th to 9th class">6th to 9th class</SelectItem>
                    <SelectItem value="10th class">10th class</SelectItem>
                    <SelectItem value="11th">11th</SelectItem>
                    <SelectItem value="12th">12th</SelectItem>
                    <SelectItem value="Graduate Degree/diploma">Graduate Degree/diploma</SelectItem>
                    <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                    <SelectItem value="working professional">Working Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select_city">-- Select city --</SelectItem>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="athens">Athens</SelectItem>
                    <SelectItem value="madrid">Madrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 space-y-2">
                <Label htmlFor="countryCode">Country Code</Label>
                <Select value={citymobile} onValueChange={setCitymobile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India (+91)">India (+91)</SelectItem>
                    <SelectItem value="Paris(+231)">Paris (+231)</SelectItem>
                    <SelectItem value="London(+654)">London (+654)</SelectItem>
                    <SelectItem value="Athens(+758)">Athens (+758)</SelectItem>
                    <SelectItem value="Madrid(+954)">Madrid (+954)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="button" className="w-full mt-6" onClick={collectData} disabled={isLoading}>
              {isLoading ? "Creating Account..." : "CREATE NEW ACCOUNT"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
