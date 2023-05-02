import { useState, useContext } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.util'
import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASS } from "../button/button.component";

const SignInForm = () => {
    const defaultFormFields = {
        email: '',
        password: '',
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const user = await signInAuthUserWithEmailAndPassword(email, password);
            setFormFields(defaultFormFields);
        } catch (e) {
            if (e.code == 'auth/wrong-password' || e.code == 'auth/user-not-found') {
                alert('Invalid user name or password!');
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email} />
                <FormInput label="password" type="password" required name="password" onChange={handleChange} value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASS.google} onClick={signInWithGoogle} >Sign in with Google</Button>
                </div>
            </form>
        </div>)
}

export default SignInForm;