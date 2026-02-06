import * as Yup from "yup";

const passwordMessage =
  "Password should contain minimum 8 characters, with a mix of uppercase letter, number, and symbol.";

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").nullable(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .nullable(),
  phoneNumber: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .required(passwordMessage)
    .min(8, passwordMessage)
    .matches(/[@$!%*?&]/, passwordMessage)
    .matches(/\d/, passwordMessage)
    .matches(/[A-Z]/, passwordMessage),
});
