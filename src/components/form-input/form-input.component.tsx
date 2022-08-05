import { FormInputProps } from "./form-input.interface";

import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput: React.FC<FormInputProps> = ({ label, id, ...otherProps }) => {
  return (
    <Group>
      <Input id={id} {...otherProps} />
      {label && (
        <FormInputLabel htmlFor={id} shrink={(otherProps.value as any).length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
