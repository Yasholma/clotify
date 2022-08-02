import { createContext, FC, useState } from "react";

export interface ICartContext {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
}

export const CartContext = createContext<ICartContext>({
  isCartOpen: false,
  setIsCartOpen: () => null,
});

type CartContextProviderProps = {
  children: JSX.Element | string;
};

export const CartContextProvider: FC<CartContextProviderProps> = ({
  children,
}) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
