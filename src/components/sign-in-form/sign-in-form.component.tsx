import { BaseSyntheticEvent, useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../services/firebase/firebase.service";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../button/button.interface";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword({ email, password });
      setFormFields(defaultFormFields);
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handlChange = ({ target }: BaseSyntheticEvent) => {
    const { value, name } = target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          id="signin-email"
          name="email"
          required
          value={email}
          onChange={handlChange}
        />

        <FormInput
          label="Password"
          type="password"
          id="signin-password"
          name="password"
          required
          value={password}
          onChange={handlChange}
        />

        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
            Sign In
          </Button>

          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
