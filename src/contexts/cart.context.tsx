import { createContext, FC, useEffect, useState } from "react";
import { IProduct } from "./product.context";

export type ICartItem = IProduct & { quantity: number };

export type ICartItems = ICartItem[];

export interface ICartContext {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
  cartItems: ICartItems;
  setCartItems: () => void;
  addItemToCart: (productToAdd: IProduct) => void;
  removeItemFromCart: () => void;
  cartCount: number;
  setCartCount: () => void;
}

export const CartContext = createContext<ICartContext>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
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

type CartContextProviderProps = {
  children: JSX.Element | string;
};

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ICartItems>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd: IProduct) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = () => {};

  return (
    <CartContext.Provider
      value={
        {
          isCartOpen,
          setIsCartOpen,
          cartItems,
          setCartItems,
          addItemToCart,
          removeItemFromCart,
          cartCount,
        } as any
      }
    >
      {children}
    </CartContext.Provider>
  );
};
