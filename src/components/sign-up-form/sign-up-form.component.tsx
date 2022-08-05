import { BaseSyntheticEvent, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../services/firebase/firebase.service";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.interface";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const userCredential = await createAuthUserWithEmailAndPassword({
        email,
        password,
      });

      await createUserDocumentFromAuth(userCredential!.user, {
        displayName,
      });

      setFormFields(defaultFormFields);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log(error);
      }
    }
  };

  const handlChange = ({ target }: BaseSyntheticEvent) => {
    const { value, name } = target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up with your email and password</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          name="displayName"
          required
          value={displayName}
          onChange={handlChange}
        />

        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handlChange}
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={handlChange}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={handlChange}
        />

        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
