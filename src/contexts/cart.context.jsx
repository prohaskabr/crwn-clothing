import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.util';

export const CART_ACTIONS_TYPES = {
    SET_IS_OPEN: 'SET_IS_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

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

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS_TYPES.SET_IS_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        case CART_ACTIONS_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

export const CartContext = createContext({
    isCartOpen: true,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, cartCount, cartTotal, isCartOpen } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        dispatch(createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }));
    };


    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productId) => {
        const newCartItems = removeCartItem(cartItems, productId);
        updateCartItemsReducer(newCartItems);
    };

    const deleteItemFromCart = (productId) => {
        const newCartItems = deleteCartItem(cartItems, productId);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (isOpen) => {
        dispatch(createAction(CART_ACTIONS_TYPES.SET_IS_OPEN, isOpen));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
};