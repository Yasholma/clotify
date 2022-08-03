import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContext, IProduct } from "../../contexts/category.context";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const { categoriesMap } = useContext(CategoryContext);

  const [products, setProducts] = useState<IProduct[]>(
    categoriesMap[category as string]
  );

  useEffect(() => {
    setProducts(categoriesMap[category as string]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
