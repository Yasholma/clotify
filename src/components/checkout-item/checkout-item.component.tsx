import { useContext } from "react";
import { CartContext, ICartItem } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Price,
  RemoveButton,
} from "./checkout-item.styles";

type CheckoutItemProps = {
  cartItem: ICartItem;
};

const CheckoutItem: React.FC<CheckoutItemProps> = ({ cartItem }) => {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemFromCartHandler = () => clearItemFromCart(cartItem);
  const addItemToCartHandler = () => addItemToCart(cartItem);
  const removeItemFromCartHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemFromCartHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
