import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../services/firebase/firebase.service";

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface ICategory {
  title: string;
  products: IProduct[];
}

export interface ICategoryMap {
  [title: string]: IProduct[];
}

export interface IProductContext {
  categoriesMap: ICategoryMap;
  setCategoriesMap: React.Dispatch<React.SetStateAction<ICategoryMap>>;
}

export const CategoryContext = createContext<IProductContext>({
  categoriesMap: {},
  setCategoriesMap: () => null,
});

type CategoryContextProviderProps = {
  children: JSX.Element | string;
};

export const CategoryContextProvider: React.FC<
  CategoryContextProviderProps
> = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState<ICategoryMap>({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoriesMap, setCategoriesMap }}>
      {children}
    </CategoryContext.Provider>
  );
};
