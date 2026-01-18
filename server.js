require('dotenv').config(); // this loads the .env variables
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.use(cors());
app.use(express.json());


// 🔹 Products 
const products = [
   { id: 1, name: "Jacket", price: 600, material: "Cotton", sizes: ["S","M","L","XL","XXL"], image: "https://images.unsplash.com/photo-1520975916090-3105956dac38" },
 { id: 2, name: "Shirt", price: 650, material: "Cotton", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e" }, 
 { id: 3, name: "Boys Jeans", price: 700, material: "Denim", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1542272604-787c3835535d" },
  { id: 4, name: "T-Shirt", price: 800, material: "Silk", sizes: ["M","L","XL","XXL"], image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23" },
   { id: 5, name: "Shirts", price: 750, material: "Cotton", sizes: ["S","M","L"], image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" },
    { id: 6, name: "Frock", price: 1500, material: "Silk", sizes: ["M","L","XL"], image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a" }, 
    { id: 7, name: "Saree", price: 1200, material: "Silk", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c" },
     { id: 8, name: "Headset", price: 300, material: "Cotton", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1583394838336-acd977736f90" }, 
{ id: 9, name: "Girls Jacket", price: 450, material: "Cotton", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070" },
 { id: 10, name: "Girls Dress", price: 900, material: "Polyester", sizes: ["S","M","L"], image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg" },
  { id: 11, name: "Shirt", price: 650, material: "Cotton", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e" }, 
  { id: 12, name: "Women Jeans", price: 850, material: "Denim", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
   { id: 13, name: "Shirt", price: 780, material: "Cotton", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1614251055880-ee96e4803393" },
    { id: 14, name: "Party Dress", price: 1100, material: "Polyester", sizes: ["S","M","L"], image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae" }, 
    { id: 15, name: "Shoes", price: 500, material: "Cotton", sizes: ["XS","S","M"], image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" },
     { id: 16, name: "Lehanga", price: 1800, material: "Silk", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a" },
      { id: 17, name: "Watch", price: 350, material: "Cotton", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1590736969955-71cc94801759" }, 
      { id: 18, name: "Women Pant", price: 550, material: "Cotton", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1" }, 
      { id: 19, name: "Shirts", price: 1300, material: "Cotton", sizes: ["M","L","XL"], image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" }, 
      { id: 20, name: "T-Shirt", price: 2500, material: "Silk", sizes: ["M","L","XL"], image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23" } ];
app.get("/products",(req,res)=>res.json(products));
app.get("/products/:id", (req, res) => {
  
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});
// 👉 Default page = login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "login.html"));
});
app.use(express.static("Frontend"));


// 👉 Frontend serve
app.use(express.static(path.join(__dirname, "Frontend")));


app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password:hashedPassword });
    res.json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "You are not registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.listen(3000,()=>console.log("http://localhost:3000"));