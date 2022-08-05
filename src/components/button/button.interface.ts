export interface ButtonProps {
  children: JSX.Element | string;
  buttonType: BUTTON_TYPE_CLASSES;
  onClick?: () => any;
  [otherProps: string | number | symbol]: unknown;
}

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
}
