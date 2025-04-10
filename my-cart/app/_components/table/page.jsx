"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/navigation";

export default function Table() {
  const [data, getData] = useState([]);
  const router = useRouter();

  const User1 = localStorage.getItem("user");
  if (!User1) {
    router.push("/login");
  }

  useEffect(() => {
    collectData();
  }, []);

  const collectData = async () => {
    // window.location.reload();

    let result = await fetch("http://localhost:5000/user", {
      method: "get",
    });
    result = await result.json();
    console.log(result);
    getData(result);
  };

  const deleteRecord = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/userdelete/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      alert("are you sure to delete");
      collectData();
    }
  };

  return (
    <div className="table">
      <table>
        <tr>
          <th>Name</th>
          <th>email</th>
          <th>password</th>
          <th></th>
        </tr>

        {data.map((item, i) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.password}</td>
            <button
              type="button"
              className="btn1"
              class="btn btn-primary"
              onClick={() => deleteRecord(item._id)}
            >
              DELETE
            </button>
            <button type="button" className="btn1">
              <Link to={"/registerNew/" + item._id}>UPDATE</Link>{" "}
            </button>
          </tr>
        ))}
      </table>
      {/* window.location.hash = "#!login"        */}
    </div>
  );
}
