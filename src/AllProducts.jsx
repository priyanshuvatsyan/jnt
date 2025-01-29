import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Adjust the path as per your file structure
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AdminNav from "./AdminNav";
import "./styles/AllProducts.css";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted successfully!");
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>

        <h1 className="title" >JN Traders</h1>
      <div className="addProducts-container">
         <div className="AdminNav">
          <AdminNav />
        </div>
        <div className="all-products">
          
          <div className="all-products-list">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-card-image"
                  />
                  <h3 className="product-card-name">{product.name}</h3>
                  <p className="product-card-category">
                    Category: {product.category}
                  </p>
                  <p className="product-card-price">Price: ₹{product.price}</p>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="product-card-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="all-products-empty">No products available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
