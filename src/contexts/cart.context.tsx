import { createContext, FC, useEffect, useState } from "react";
import { IProduct } from "./category.context";

export type ICartItem = IProduct & { quantity: number };

export type ICartItems = ICartItem[];

export interface ICartContext {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ICartItems;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItems>>;
  addItemToCart: (productToAdd: IProduct) => void;
  removeItemFromCart: (cartItemToRemove: ICartItem) => void;
  cartCount: number;
  clearItemFromCart: (cartItemToClear: ICartItem) => void;
  cartTotal: number;
}

export const CartContext = createContext<ICartContext>({
  isCartOpen: false,
  setIsCartOpen: () => false,
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const addCartItem = (
  cartItems: ICartItems,
  productToAdd: IProduct
): ICartItems => {
  const productExist = cartItems.find(
    (product) => product.id === productToAdd.id
  );

  if (productExist) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productExist.id
        ? { ...productExist, quantity: productExist.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: ICartItems,
  cartItemToRemove: ICartItem
): ICartItems => {
  const cartItemExist = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (cartItemExist?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const clearCartItem = (cartItems: ICartItems, cartItemToClear: ICartItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

type CartContextProviderProps = {
  children: JSX.Element | string;
};

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ICartItems>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd: IProduct) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove: ICartItem) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear: ICartItem) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        cartCount,
        clearItemFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
