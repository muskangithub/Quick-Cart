const express = require("express");
require("./db/config");
const pool = require("./db/db");
const jwt = require("jsonwebtoken");
const Jwtkey = "quickcart";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const cors = require("cors");

const app = express();

const port = 5000;

app.use(cors());
app.use("/uploads", express.static("uploads"));

const user = require("./db/user");
const AdminModel = require("./db/admin");
const Product = require("./db/product");

app.use(express.json());
app.set("view engine", "ejs");
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    credentials: true,
  })
);

// routes
app.get("/", (req, resp) => {
  resp.render("table");
});

app.post("/register", async (req, resp) => {
  let User = await user.findOne({ email: req.body.email });
  if (User) {
    resp.send({ result: " user email already exist" });
  } else {
    let User = new user(req.body);
    let result = await User.save();
    result = result.toObject();
    console.log(result, "result");
    resp.send(result);
  }
});

app.get("/user", async (req, resp) => {
  let User = await user.find();
  resp.send(User);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let User = await user.findOne(req.body).select("-password");
    if (User) {
      resp.send(User);
      resp.render("home2");
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "invalid inputs" });
  }
});

//delete from table
app.delete("/userdelete/:id", async (req, resp) => {
  let User = await user.deleteOne({ _id: req.params.id });
  resp.send(User);
});

//update user data
app.put("/user/edit/:id", async (req, resp) => {
  const User = await user.updateOne({ _id: req.params.id }, { $set: req.body });
  resp.send(User);
});

//GET for single user
app.get("/user/:id", async (req, resp) => {
  let User = await user.findOne({ _id: req.params.id });
  if (User) {
    resp.send(User);
  } else {
    resp.send({ user: "not found" });
  }
});

app.get("/employees", async (req, res) => {
  try {
    const employeesData = await pool.query(
      ` SELECT employee.id, employee.name, employee.age, 
             address.state, address.city, address.houseno
      FROM employee
      JOIN address ON employee.address_id = address.id`
    );
    res.json(employeesData?.rows);
  } catch (error) {
    console.log("error", error);
  }
});

//get product
app.get("/product", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "no products found" });
  }
});

//get single product
app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "no products found" });
  }
});

// or whatever the model path is

app.post("/add-admin", authPage(["ADMIN"]), async (req, resp) => {
  const { name, type, status, date, password, email } = req.body;
  let admin = new AdminModel({ name, password, type, status, email, date });
  let result = await admin.save();

  console.log(result);

  jwt.sign({ result }, Jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong" });
    }
    resp.send({ type: admin.type, auth: token });
  });
});

app.get("/admin", async (req, resp) => {
  let admin = await AdminModel.find();
  if (admin) {
    resp.send(admin);
  } else {
    resp.send({ result: "no admin found" });
  }
});

app.post(
  "/add-product",
  upload.single("image"), // Accept image file, optional if URL is provided
  async (req, resp) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);

      const {
        name,
        company,
        category,
        price,
        userId,
        description,
        features,
        type = "USER", // default value
        ImageUrl, // May be a base64 or URL
      } = req.body;

      // Determine final image source: either uploaded file or base64/url
      const imageUrl = req.file !== undefined ? req.file.path : ImageUrl;
      console.log();

      // Parse features if it's a JSON string
      const parsedFeatures =
        typeof features === "string" ? JSON.parse(features) : features;

      // Create the new product (✅ match schema key: ImageUrl with capital 'I')
      const product = new Product({
        name,
        price,
        company,
        category,
        ImageUrl: imageUrl, // <-- correct field name here
        userId,
        description,
        features: parsedFeatures || [],
        type,
      });

      const result = await product.save();

      console.log("Product saved:", result);
      resp.status(201).send(result);
    } catch (error) {
      console.error("Error saving product:", error);
      resp.status(500).send({ error: "Failed to add product" });
    }
  }
);

app.delete("/admin/:id", async (req, resp) => {
  let result = await AdminModel.deleteOne({ _id: req.params.id });
  console.log(result);
  resp.send(result);
});

function authPage(permissions) {
  return (req, resp, next) => {
    const userType = req.body.type;
    if (permissions.includes(userType)) {
      next();
    } else {
      resp.status(403).send({ result: "dont have permission" });
    }
  };
}

app.listen(port, () => {
  console.log("listning on port", port);
});
