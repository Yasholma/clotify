import { ICartItem } from "../../contexts/cart.context";

import { CartItemContainer, Image, ItemDetails } from "./cart-item.styles";

type CartItemProps = {
  cartItem: ICartItem;
};

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <ItemDetails className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
