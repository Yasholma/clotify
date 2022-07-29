export interface ButtonProps {
  children: JSX.Element | string;
  buttonType: BUTTON_TYPE_CLASSES;
  [otherProps: string | number | symbol]: unknown;
}

export enum BUTTON_TYPE_CLASSES {
  google = "google-sign-in",
  inverted = "inverted",
}
