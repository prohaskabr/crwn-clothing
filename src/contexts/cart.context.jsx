import { createContext, useContext, useEffect, useState } from "react";
import { UserProvider } from "./user.context";

const addCartItem = (cartItems, productToAdd): [] => {
    const productFound = cartItems.find((p) => p.id === productToAdd.id);
    if (productFound) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItem: () => { },
    cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);


    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
};