import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {
        // label only renders if it exits,
        label && (
          <label
            className={`${
              // will apply a style if the user has typed something
              otherProps.value.length > 0 ? "shrink" : ""
            } form-input-label`}
          >
            {label}
          </label>
        )
      }
    </div>
  );
};

export default FormInput;
