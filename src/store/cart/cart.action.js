import { CART_ACTIONS_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";

export const setIsCartOpen = (isOpen) =>
    createAction(CART_ACTIONS_TYPES.SET_IS_OPEN, isOpen);


export const addItemToCart = (cartItems, product) => {
    const newCartItems = addCartItem(cartItems, product);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productId) => {
    const newCartItems = removeCartItem(cartItems, productId);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, productId) => {
    const newCartItems = deleteCartItem(cartItems, productId);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

const addCartItem = (cartItems, productToAdd) => {
    const productFound = cartItems.find((p) => p.id === productToAdd.id);
    if (productFound) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productId) => {
    const productFound = cartItems.find((p) => p.id === productId);
    if (productFound.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id != productId);
    }

    return cartItems.map((cartItem) => cartItem.id === productId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
};

const deleteCartItem = (cartItems, productId) => {
    const productFound = cartItems.find((p) => p.id === productId);
    if (productFound) {
        return cartItems.filter(cartItem => cartItem.id != productId);
    }

    return cartItems;
};
