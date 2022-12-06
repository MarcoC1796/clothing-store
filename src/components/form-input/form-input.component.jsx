import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {
        // label only renders if it exits,
        label && (
          <FormInputLabel shrink={otherProps.value.length}>
            {label}
          </FormInputLabel>
        )
      }
    </Group>
  );
};

export default FormInput;
