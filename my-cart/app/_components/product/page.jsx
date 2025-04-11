import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await axios
      .get("http://localhost:5000/products", {
        headers: {
          "Content-Type": "application/json",
          // authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
      })
      .then(async (req) => {
        const result = await req.data;
        setProducts(result);
        console.log(result);
      });
  };

  const deleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:5000/product/${id}`, {
        // headers: {
        //   // "Content-Type": "application/json",
        //   authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        // }
      })
      .then((req) => {
        const result = req;
        if (result) {
          console.log("record deleted");
          getProducts();
        }
      });
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      await axios
        .get(`http://localhost:5000/search/${key}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        })
        .then(async (req) => {
          const result = await req.data;
          if (result) {
            setProducts(result);
          }
        });
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <div>
        <h3 className="heading">Product list</h3>
        <input
          className="search-product-box"
          type="text"
          onChange={searchHandle}
          placeholder="search"
        />
      </div>

      {products.length > 0 ? (
        products.map((item, index) => (
          <>
            <Card className="card">
              <CardMedia
                height="170"
                width="100%"
                component="img"
                image={`http://localhost:5000/${item.ImageUrl}`}
                // title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2">${item.price}</Typography>
                <Typography variant="body2">{item.company}</Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <button
                  className="btnpl"
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </button>
                <button className="btnpl">
                  <Link className="lnk" to={"/update/" + item._id}>
                    Update
                  </Link>
                </button>
                <button className="btnpl">
                  <Link className="lnk" to={"/product/" + item._id}>
                    Purchase
                  </Link>
                </button>
              </CardActions>
            </Card>
          </>
        ))
      ) : (
        <h2>No Result Found</h2>
      )}
    </div>
  );
};

export default Product;
