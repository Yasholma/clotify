import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { IProduct } from "../../contexts/category.context";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.interface";
import "./product-card.styles.scss";

export type ProductCardProps = {
  product: IProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
