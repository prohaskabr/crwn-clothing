import { CART_ACTIONS_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
};


export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
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
                cartItems: payload,
            }
        default:
            return state;
    }
}