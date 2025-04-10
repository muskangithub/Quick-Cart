import { useRouter,Link } from "next/navigation";
import React from "react";

export default function Home() {
  const User1 = localStorage.getItem("user");
const router=useRouter
  const logout = () => {
    localStorage.clear();
    router.push("/register");
  };
  return (
    <div>
      <nav className="main_nav">
        <div className="logo">
          <h2>SCRATCH</h2>
        </div>
        <div className="product">
          <Link to="/home2">
            <h2>PRODUCT</h2>
          </Link>
        </div>
        <div className="menu_link">
          <ul>
            <li>
              <Link className="a" to="/register">
                REgister
              </Link>
            </li>
            {User1 ? (
              <li>
                <Link className="a" onClick={logout} to="/register">
                  LOgout
                </Link>
              </li>
            ) : (
              <li>
                {" "}
                <Link className="a" to="/login">
                  LOgin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
