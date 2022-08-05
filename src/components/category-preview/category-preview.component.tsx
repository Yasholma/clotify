import { IProduct } from "../../contexts/category.context";
import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  LinkTitle,
  Preview,
} from "./category-preview.styles";

type CategoryPreviewProps = {
  title: string;
  products: IProduct[];
};

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
  title,
  products,
}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <LinkTitle to={title}>{title.toUpperCase()}</LinkTitle>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
