import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util";
export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        const getCategoriesMap = async () => {
            const catMap = await getCategoriesAndDocuments();
            setCategoriesMap(catMap);
        }
        getCategoriesMap();

    }, []);

    return (<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>)
};
