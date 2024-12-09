import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [CartList, setCartList] = useState([]);

    return (
        <CartContext.Provider value={{ CartList, setCartList }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}