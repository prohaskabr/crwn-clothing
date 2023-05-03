import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTIONS_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTIONS_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { currentUser: null });
    const { currentUser } = state;

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTIONS_TYPES.SET_CURRENT_USER, payload: user })
    };

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {

            if (user) {
                await createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};