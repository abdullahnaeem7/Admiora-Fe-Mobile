import React, { useEffect, useState } from "react";
import appContext from "./appContext";

type Props = { children: React.ReactNode };
interface UpdateItemQuantityProps {
  id: number;
  quantity: number;
}

const AppStateContext: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  useEffect(() => {
    if (cartItems?.length) {
      const subtotal = cartItems.reduce(
        (total: number, item: any) => total + item.price * (item.quantity || 1),
        0
      );

      setTotalPrice(subtotal);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  const addItemToCart = (item: any) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (itemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateItemQuantity = ({ id, quantity }: UpdateItemQuantityProps) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((cartItem) => cartItem._id === id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity = quantity;
        console.log("updatedItems", updatedItems);

        return updatedItems;
      }
      return prevItems;
    });
  };
  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  const resetContextState = () => {
    setUser(undefined);
    setCartItems([]);
    setTotalPrice(0);
    setSelectedAddress(null);
  };

  return (
    <appContext.Provider
      value={{
        user,
        setUser,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        resetContextState,
        isLogged,
        setIsLogged,
        loading,
        setLoading,
        totalPrice,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { appContext, AppStateContext };
