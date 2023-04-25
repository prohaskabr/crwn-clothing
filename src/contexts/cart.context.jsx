import { createContext, useContext, useEffect, useState } from "react";
import { UserProvider } from "./user.context";

const addCartItem = (cartItems, productToAdd): [] => {
    const productFound = cartItems.find((p) => p.id === productToAdd.id);
    if (productFound) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productId): [] => {
    const productFound = cartItems.find((p) => p.id === productId);
    if (productFound.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id != productId);
    }

    return cartItems.map((cartItem) => cartItem.id === productId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
};

const deleteCartItem = (cartItems, productId): [] => {
    const productFound = cartItems.find((p) => p.id === productId);
    if (productFound) {
        return cartItems.filter(cartItem => cartItem.id != productId);
    }

    return cartItems;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);



    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    };

    const removeItemFromCart = (productId) => {
        setCartItems(removeCartItem(cartItems, productId));
    };

    const deleteItemFromCart = (productId) => {
        setCartItems(deleteCartItem(cartItems, productId));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, deleteItemFromCart, cartItems, cartCount, cartTotal };
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
};