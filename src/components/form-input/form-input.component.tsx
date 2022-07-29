import { FormInputProps } from "./form-input.interface";

import "./form-input.styles.scss";

const FormInput: React.FunctionComponent<FormInputProps> = ({
  label,
  id,
  ...otherProps
}) => {
  return (
    <div className="group">
      <input id={id} {...otherProps} className="form-input" />
      {label && (
        <label
          htmlFor={id}
          className={`form-input-label ${
            (otherProps as any).value.length ? "shrink" : ""
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
