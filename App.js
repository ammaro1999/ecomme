import React, { useState, useEffect } from 'react';
import { auth, db } from "./firebase";  // ✅ Import Firebase properly
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
// UI Components (Now inside `src/components/`)
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import OrderForm from "./components/OrderForm";
import AuthModal from "./components/AuthModal";
import Cart from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import ProductFilters from "./components/ProductFilters";
import ProductList from "./components/ProductList";  // ✅ Added
import ProductVariants from "./components/ProductVariants";  // ✅ Added
import ProductReviews from "./components/ProductReviews";  // ✅ Added

// Pages (About Us, Contact, Policies, etc.)
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import ReturnPolicy from "./components/pages/ReturnPolicy";
import FAQ from "./components/pages/FAQ";
import TermsOfService from "./components/pages/TermsOfService";



function App() {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState("home");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        // Monitor authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Load products from Firestore
        loadProducts();

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    // Load products from Firestore
    const loadProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    const handleSignOut = () => signOut(auth);

    const handleAddToCart = product => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === product.id);
            return exists
                ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...prev, { ...product, quantity: 1 }];
        });
    };

    const handleCheckout = () => {
        setCheckoutItems(cartItems);
        setIsCartOpen(false);
        setCurrentPage("checkout");
    };

    const handlePlaceOrder = async orderData => {
        try {
            await addDoc(collection(db, "orders"), orderData);
            setCartItems([]);
            setCheckoutItems([]);
            setCurrentPage("home");
            alert("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order: ", error);
            alert("Failed to place order.");
        }
    };

    return (
        <div className="app-container">
            <Header cartItemCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} onAuthClick={() => setIsAuthModalOpen(true)} user={user} onSignOut={handleSignOut} />
            {currentPage === "home" && <ProductList products={products} onProductClick={setSelectedProduct} />}
            {currentPage === "detail" && selectedProduct && <ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} />}
            {currentPage === "checkout" && <CheckoutPage cartItems={checkoutItems} onSubmit={handlePlaceOrder} />}
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onCheckout={handleCheckout} />
            <Footer />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}

export default App;
