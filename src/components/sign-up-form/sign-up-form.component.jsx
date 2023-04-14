import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.util'
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = ()=> {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    const handleChange = (event) =>{
       const {name,value} = event.target;
        setFormFields({ ...formFields,[name]:value});
    };

    const handleSubmit = async (event)=> {
        event.preventDefault();
        if(formFields.password != formFields.confirmPassword){
            alert("password do not match");
            return;
        }

        try {
            const {user} = await  createAuthUserWithEmailAndPassword(formFields.email,formFields.password);            
            await createUserDocumentFromAuth(user, { displayName });
        
            setFormFields(defaultFormFields);
        } catch (e) {
            if(e.code == 'auth/email-already-in-use'){
                alert('Email already in use!');
            }           
        }
    };

    return(
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required name="displayName" onChange={handleChange} value={displayName} />
                <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email} />
                <FormInput label="password" type="password" required name="password" onChange={handleChange} value={password} />
                <FormInput label="Confirm Passord" type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword}/>
                <Button buttonTypetype="submit">Sign Up</Button>
            </form>
        </div>

    )
}


export default SignUpForm;