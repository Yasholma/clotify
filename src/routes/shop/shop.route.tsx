import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.route";
import Category from "../category/category.route";

import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
