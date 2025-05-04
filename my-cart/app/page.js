"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Products from "./_components/products";

export default function Page() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser._id) {
          setIsAuthenticated(true); // ✅ Valid user, render <Products />
        } else {
          router.push("/login"); // 🔁 Invalid user, redirect
        }
      } catch (error) {
        console.error("Invalid user in localStorage", error);
        router.push("/login");
      }
    } else {
      router.push("/login"); // 🔁 No user, redirect
    }
  }, [router]);

  if (isAuthenticated === null) return null; // ⏳ Optionally show loader

  return <Products role="user" />;
}
