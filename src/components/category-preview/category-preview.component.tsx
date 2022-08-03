import { Link } from "react-router-dom";
import { IProduct } from "../../contexts/category.context";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

type CategoryPreviewProps = {
  title: string;
  products: IProduct[];
};

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
  title,
  products,
}) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
