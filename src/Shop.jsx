import React, { useEffect, useState } from 'react';
import './styles/Shop.css';
import Navbar from './Navbar';
import Footer from './componants/Footer';
import { db } from './firebase'; // Adjust the path as per your folder structure
import { collection, getDocs } from 'firebase/firestore';
import Cart from './componants/Cart';

export default function Shop() {
    const [suggestions, setsuggestions] = useState([]);
    const [categories, setCategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setsearchQuery] = useState("");
    const [cart, setcart] = useState([]);
    const [isCartVisible, setisCartVisible] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Group products by category
                const groupedByCategory = productArray.reduce((acc, product) => {
                    const { category = 'Uncategorized' } = product; // Fallback to 'Uncategorized'
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});
                setsuggestions(Object.keys(groupedByCategory));
                setCategories(groupedByCategory);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleCategoryClick = (category) => {
        if (category === "All") {
            setSelectedCategory(null); // Show all products when "All" is clicked
        } else {
            setSelectedCategory(category); // Set the selected category
        }
    };

    const handleSearchChange = (e)=>{
        setsearchQuery(e.target.value.toLowerCase());
    }
    const filteredProducts = (products)=>{
        return products.filter((product)=>
            product.name.toLowerCase().includes(searchQuery) 
            )
    }
    const addToCart = (product)=>{
        setcart((prevCartItems)=>[...prevCartItems,product]);
    }
    const toggleCartVisibility = ()=>{
        setisCartVisible(!isCartVisible);
    }

    return (
        <div className="shop-container">
            <div className="nav">
                <Navbar />
            </div>
            <div className="search">
                <input type="text" 
                placeholder="Search for products" 
                 value={searchQuery}
                 onChange={handleSearchChange}
                />
            </div>
            <div className="suggestions">
                <h2>Suggestions</h2>
                <div className="grid">
                    <button
                        onClick={() => handleCategoryClick("All")}
                        className={selectedCategory === null ? "selected" : ""}
                    >
                        All
                    </button>
                    {isLoading ? (
                        <p>Loading suggestions...</p>
                    ) : (
                        suggestions.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(category)}
                                className={selectedCategory === category ? "selected" : ""}
                            >
                                {category}
                            </button>
                        ))
                    )}
                </div>
            </div>
            <div className="our-products">
                <h1>Our Products</h1>
                {isLoading ? (
                    <div className="loading-circle-container">
                        <div className="loading-circle"></div>
                    </div>
                ) : selectedCategory ? (
                    <div className="category-section">
                        <h3 className="category-title">{selectedCategory}</h3>
                        <div className="products-grid">
                            {filteredProducts(categories[selectedCategory] || []) ?.map((product) => (
                                <div key={product.id} className="product-container">
                                    <div className="product-card">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                    </div>
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    Object.keys(categories).map((category) => (
                        <div key={category} className="category-section">
                            <h3 className="category-title">{category}</h3>
                            <div className="products-grid">
                            {filteredProducts(categories[category] || []).map((product) => (
                                    <div key={product.id} className="product-container">
                                        <div className="product-card">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                        </div>
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-price">${product.price.toFixed(2)}</p>
                                        <button 
                                        className='add-to-cart'
                                        onClick={ ()=> addToCart(product)} >
                                            Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="footer">
               <Footer/>
            </div>

                <div className="cart-icon" onClick={toggleCartVisibility} >
                <i className="fas fa-shopping-cart"></i>
                    <span className='cart-count'  > {cart.length}</span>
                </div>
                {isCartVisible && <Cart cartItems={cart} />}
        </div>
    );
}
