import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface IProductContext {
  products: IProduct[];
  setProducts: (product: IProduct | null) => void;
}

export const ProductContext = createContext<IProductContext>({
  products: [],
  setProducts: () => null,
});

type ProductContextProviderProps = {
  children: JSX.Element | string;
};

export const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS);

  return (
    <ProductContext.Provider value={{ products, setProducts } as any}>
      {children}
    </ProductContext.Provider>
  );
};
