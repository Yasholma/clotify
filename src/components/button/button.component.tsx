import { ButtonProps, BUTTON_TYPE_CLASSES } from "./button.interface";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

const Button: React.FC<ButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}) => {
  const getButtonStyles = (buttonType: BUTTON_TYPE_CLASSES) =>
    ({
      [BUTTON_TYPE_CLASSES.base]: BaseButton,
      [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
      [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

  const CustomButton = getButtonStyles(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
