import InputMask from "react-input-mask";
import { Form } from "react-router-dom";

function MaskedInput({ mask, ...props }) {
  return (
    <InputMask mask={mask}>
      {(inputProps: any) => <Form.Control {...inputProps} {...props} />}
    </InputMask>
  );
}
