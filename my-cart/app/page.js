"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [employes, setEmploye] = useState();

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/employees");
        const data = await res.json(); // Parse the response body as JSON
        console.log(data, "data");
        setEmploye(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);
  // let employes = [
  //   {
  //     name: "Ram",
  //     age: 12,
  //     adress: {
  //       state: "haryana",
  //       hno: "55B",
  //       city: "Ambala",
  //     },
  //   },
  //   {
  //     name: "sham",
  //     age: 14,
  //     adress: {
  //       state: "haryana",
  //       hno: "56B",
  //       city: "Jind",
  //     },
  //   },
  //   {
  //     name: "Tanu",
  //     age: 13,
  //     adress: {
  //       state: "haryana",
  //       hno: "57B",
  //       city: "Kaithal",
  //     },
  //   },
  // ];
  return (
    <div style={{ display: "grid", gap: "4px", width: "100%" }}>
      {employes?.map((item, index) => (
        <div
          key={index}
          className="employee"
          style={{ padding: "4px", width: "200px" }}
        >
          <h1>{item?.name}</h1>
          <p>{item?.age}</p>
          <span>{`${item?.adress?.hno},${item?.adress?.city},${item?.adress?.state}`}</span>
        </div>
      ))}
    </div>
  );
}
