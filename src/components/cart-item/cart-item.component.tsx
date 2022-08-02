import { ICartItem } from "../../contexts/cart.context";
import "./cart-item.styles.scss";

type CartItemProps = {
  cartItem: ICartItem;
};

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
